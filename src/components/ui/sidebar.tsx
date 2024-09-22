"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Image, Upload, Settings, LogOut, Menu } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="md:hidden absolute"
        onClick={toggleSidebar}
      >
        <Menu className="h-16 w-6 text-white" />
      </Button>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-none bg-white dark:bg-[#0d0d0c] transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-20`}
      >
        <div className="p-4">
          <Card className="flex items-center space-x-4 p-2 px-4 bg-[#252525] border-none mb-10 rounded-2xl">
            <img
              src=""
              alt="User Profile"
              className="w-16 h-16 rounded-full bg-gray-900 border-none"
            />
            <div>
              <h1 className="text-lg font-bold text-white">USERNAME</h1>
            </div>
          </Card>
          <nav className=" dark:text-white">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start mb-4">
                <Home className="mr-6 h-5 " />
                Home
              </Button>
            </Link>
            <Link href="/dashboard/library">
              <Button variant="ghost" className="w-full justify-start mb-4">
                <Image className="mr-6 h-5" />
                Library
              </Button>
            </Link>
            <Link href="/dashboard/upload">
              <Button variant="ghost" className="w-full justify-start mb-4">
                <Upload className="mr-6 h-5" />
                Upload
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start mb-4">
              <Settings className="mr-6 h-5" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start mb-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-6 h-5" />
              Logout
            </Button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
