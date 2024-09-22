import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#09090b] ">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
