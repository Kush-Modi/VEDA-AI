import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-0 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full p-4 md:p-8 min-h-full">
            {children}
          </div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
