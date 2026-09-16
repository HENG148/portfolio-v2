import Sidebar from "@/src/features/sidebar/components/sidebar-section";

export default async function MainLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-[#0d0d0d] flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </body>
  )
}