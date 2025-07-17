"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Library, Upload, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface RecentImage {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
  fileSize: number;
  uploadDate: string;
  viewURL: string;
}

interface DashboardMetrics {
  totalImageCount: number;
  totalStorageUsed: number;
  recentImages: RecentImage[];
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalImageCount: 0,
    totalStorageUsed: 0,
    recentImages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get<DashboardMetrics>(
          "http://localhost:8080/api/dashboard/metrics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMetrics(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  // Convert bytes to KB/MB/GB
  const formatStorageSize = (bytes: number) => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Calculate storage percentage (assuming 10GB = 10,485,760 KB limit)
  const storageLimit = 0.01 * 1024 * 1024; // 10GB in KB
  const storagePercentage = Math.min((metrics.totalStorageUsed / storageLimit) * 100, 100);

  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card className="bg-[#18181b]/70 p-8 border-0">
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
          <Card className="bg-[#18181b]/70 border-0 p-1">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-white ">
                Recent Images
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {loading ? (
                  // Loading state
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-white/5 rounded-3xl animate-pulse"
                    ></div>
                  ))
                ) : (
                  // Display recent images or empty slots
                  Array.from({ length: 6 }).map((_, index) => {
                    const image = metrics.recentImages[index];
                    return (
                      <div
                        key={index}
                        className="aspect-square bg-white/5 rounded-3xl overflow-hidden"
                      >
                        {image ? (
                          <img
                            src={`http://localhost:8080/${image.viewURL}`}
                            alt={image.fileName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                      </div>
                    );
                  })
                )}
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
          <Card className="bg-[#18181b]/70 p-3 lg:p-8 border-0 flex flex-col justify-between">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Upload Stats
              </h3>
              <div className="flex flex-col xl:items-center">
                <p className="text-3xl xl:text-[4rem] font-bold text-white mt-0 xl:mt-10 2xl:mt-16">
                  {loading ? "..." : metrics.totalImageCount.toLocaleString()}
                </p>
                <p className="text-white/90 xl:mt-8">
                  Total images uploaded
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
          <Card className="bg-[#18181b]/70 p-3 lg:p-6 border-0 flex flex-col justify-between">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-5 text-white">
                Storage Usage
              </h3>
              <div className="h-6 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gray-400 transition-all duration-300"
                  style={{ width: `${storagePercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-white/60">
                {loading 
                  ? "Loading..." 
                  : `${storagePercentage.toFixed(1)}% of 10MB used (${formatStorageSize(metrics.totalStorageUsed)})`
                }
              </p>
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