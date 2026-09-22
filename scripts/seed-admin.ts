import { config } from "dotenv"
config({ path: ".env" })

import { db } from "@/src/db";
import { TbAccount, TbUser } from "@/src/db/schema";
import { auth } from "@/src/lib/auth/auth";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

const getAdminData = () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin User";

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env first");
  }
  return { name, email, password, role: "admin" as const };
}

async function createInitialAdmin() {
  const adminData = getAdminData();
  const existingAdmin = await db
    .select()
    .from(TbUser)
    .where(eq(TbUser.email, adminData.email))
    .limit(1);
  
  if (existingAdmin.length > 0) {
    console.log("✅ Admin user already exists!");
    console.log(`Email: ${existingAdmin[0].email}`);
    return;
  }
  console.log("🔐 Creating initial admin user...");

  const hashedPassword = await auth.$context.then((ctx) => ctx.password.hash(adminData.password));
  const userId = randomUUID();

  const newAdmin = await db
    .insert(TbUser)
    .values({
      id: userId,
      name: adminData.name,
      email: adminData.email,
      emailVerified: true,
      role: adminData.role
    })
    .returning();
  
  await db.insert(TbAccount).values({
    id: randomUUID(),
    userId: userId,
    accountId: userId,
    providerId: "credential",
    password: hashedPassword,
  });

  console.log("✅ Initial admin user created successfully!");
  console.log(`Email: ${newAdmin[0].email}`);
  console.log("⚠️  Password was read from ADMIN_PASSWORD env var — not logged here.")
}

createInitialAdmin()
  .then(() => {
    console.log("Setup completed!");
    process.exit(0)
  })
  .catch((err) => {
    console.error("Setup failed:", err);
    process.exit(1);
})