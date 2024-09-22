"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Cloud, Image, Lock, Share2, Tag, Zap } from "lucide-react";

const frames = [
  { width: 50, height: 50 },
  { width: 40, height: 40 },
  { width: 30, height: 30 },
  { width: 40, height: 40 },
  { width: 50, height: 50 },
];

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="w-[30rem] h-[30rem] bg-[#078167]/80 rounded-full blur-[12rem] absolute left-[57%] top-[18%] -z-10"></div>
      <div className="w-[30rem] h-[30rem] bg-[#392277]/80 rounded-full blur-[12rem] absolute right-[56%] top-[12%] -z-10"></div>
      <div className="w-[40rem] h-[20rem] bg-[#ed95ff]/80 rounded-full blur-[15rem] absolute left-1/2 top-[-220px] transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      <div className="z-1 relative top-[10rem]">
        <h1 className="text-4xl md:text-7xl font-bold text-center mb-4 md:mb-12 text-white/90 my-[-40px]">
          Your images, anywhere
        </h1>
        <p className="text-white/80 text-center text-lg md:text-2xl max-w-md md:max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
          possimus ex blanditiis dolore error similique veniam.
        </p>
        <div className="flex justify-center mt-12">
          <Button className="bg-white/90 h-[3rem] w-[8rem] rounded-[0.9rem] text-md text-black hover:text-white hover:bg-gray-900">
            Get Started
          </Button>
        </div>
      </div>
      <div className="w-[70%] mx-auto relative top-[15rem]">
        <Card className="h-[40rem] bg-[#131327]/20 backdrop-blur-md border border-white/10 shadow-lg">
          {frames.map((frame, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: frame.width,
                height: frame.height,
                left: `${Math.random() * 100}%`,
                bottom: "0",
              }}
              animate={{
                y: [0, -500],
                opacity: [0, 1, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5, // Increased duration to slow down the animation
                repeat: Infinity,
                delay: index * 0.8, // Adjusted delay to match the new duration
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full border-2 border-teal-100 rounded-lg shadow-[0_0_15px_rgba(94,234,212,0.5)] bg-purple-800 bg-opacity-30 opacity-70" />
            </motion.div>
          ))}
        </Card>
      </div>
      {children}
      <section className="h-screen w-full flex items-center justify-center mt-80">
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card className="relative overflow-hidden bg-[#131327]/20 backdrop-blur-md border border-white/10 text-white">
            <CardHeader className="pb-0">
              <Zap className="h-12 w-12 text-blue-500 mb-4" />
              <CardTitle>Fast & Easy Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                One-click uploads and drag-and-drop functionality for seamless
                image management.
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 h-16 w-16 bg-blue-500/10 rounded-bl-full" />
          </Card>
          <Card className="relative overflow-hidden bg-[#131327]/20 backdrop-blur-md border border-white/10 text-white">
            <CardHeader className="pb-0">
              <Lock className="h-12 w-12 text-green-500 mb-4" />
              <CardTitle>Image Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                SSL encryption and user control over visibility to keep your
                images safe.
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 h-16 w-16 bg-green-500/10 rounded-bl-full" />
          </Card>
          <Card className="relative overflow-hidden bg-[#131327]/20 backdrop-blur-md border border-white/10 text-white">
            <CardHeader className="pb-0">
              <Share2 className="h-12 w-12 text-purple-500 mb-4" />
              <CardTitle>Sharing Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Direct links and social media sharing options for easy
                distribution.
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 h-16 w-16 bg-purple-500/10 rounded-bl-full" />
          </Card>
        </div>
      </section>
    </div>
  );
}
