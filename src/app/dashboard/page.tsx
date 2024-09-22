import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Library, Upload, LogOut } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card className="bg-[#18181b] p-8 border-0">
            <h1 className="text-2xl font-bold text-white max-sm:text-center">
              Hi, USER
            </h1>
            <p className="text-white/60 mb-4 max-sm:text-center">
              {" "}
              Welcome to your dashboard
            </p>
            <div className="flex flex-wrap gap-3 lg:grid lg:grid-cols-2 lg:p-4 lg:h-[80%] justify-center items-center">
              {[
                {
                  icon: <Settings className="w-8 h-8 text-white" />,
                  label: "Settings",
                },
                {
                  icon: <Library className="w-8 h-8 text-white" />,
                  label: "Library",
                },
                {
                  icon: <Upload className="w-8 h-8 text-white" />,
                  label: "Upload",
                },
                {
                  icon: <LogOut className="w-8 h-8 text-white" />,
                  label: "Logout",
                },
              ].map((item, index) => (
                <Button
                  key={index}
                  className="bg-white/5 rounded-2xl lg:rounded-3xl flex flex-col h-full"
                >
                  {item.icon}
                  <span className="text-sm text-white">{item.label}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Recent Images Card */}
          <Card className="bg-[#18181b] border-0 p-1">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-white ">
                Recent Images
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-white/5 rounded-3xl"
                  ></div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="mt-4 text-white hover:text-black"
              >
                View all images
              </Button>
            </div>
          </Card>

          {/* Upload Stats Card */}
          <Card className="bg-[#18181b] p-3 lg:p-8 border-0 flex flex-col justify-between">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Upload Stats
              </h3>
              <div className="flex flex-col xl:items-center">
                <p className="text-3xl xl:text-[4rem] font-bold text-white mt-0 xl:mt-10 2xl:mt-16">
                  1,234
                </p>
                <p className="text-white/90 xl:mt-8">
                  Images uploaded this month
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-white hover:text-black self-start"
            >
              View details
            </Button>
          </Card>

          {/* Storage Usage Card */}
          <Card className="bg-[#18181b] p-3 lg:p-6 border-0 flex flex-col justify-between">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-5 text-white">
                Storage Usage
              </h3>
              <div className="h-6 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 w-3/4"></div>
              </div>
              <p className="mt-2 text-sm text-white/60">75% of 10GB used</p>
            </div>
            <Button
              variant="ghost"
              className="mb-3 text-white hover:text-black self-start"
            >
              Upgrade storage
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
