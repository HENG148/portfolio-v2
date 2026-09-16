import { getAbout } from "@/src/features/about/action";
import AboutForm from "@/src/features/about/components/profile-form";

export default async function DashboardAboutPag() {
  const about = await getAbout();
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">About</h1>
      <AboutForm initial={about} />
    </div>
  )
}