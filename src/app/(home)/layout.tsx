import Sidebar from "@/src/features/sidebar/components/sidebar-section";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#0d0d0d] flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </main>
  )
}