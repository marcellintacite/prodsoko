import { Navbar } from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { SidebarNav } from "@/components/dashboard/SideBarNav";
import ClientDashboardProvider from "@/components/dashboard/ClientDashboardProvider";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <ClientDashboardProvider>
        <div className="max-w-7xl container">
          <Navbar />
          <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <aside className="hidden md:block border-r min-h-screen pt-10 pr-6 w-[200px]">
              <SidebarNav />
            </aside>
            <main className="pt-6 md:pt-10 md:pl-10 w-full">{children}</main>
          </div>
          <Footer />
        </div>
      </ClientDashboardProvider>
    </>
  );
}
