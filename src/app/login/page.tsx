import Signin from "@/src/features/auth/components/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false }
}

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Signin />
    </div>
  );
}