"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Features from "@/components/features";
import Plans from "@/components/plans";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const frames = [
  { width: 50, height: 50 },
  { width: 40, height: 40 },
  { width: 30, height: 30 },
  { width: 40, height: 40 },
  { width: 50, height: 50 },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const randomLeftPositions = useRef(frames.map(() => Math.random() * 80 + 10));

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-overlay flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 mt-10 lg:mt-20 xl:mt-28 2xl:mt-40">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-white/90">
            Your images, anywhere
          </h1>
          <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur possimus ex blanditiis dolore error similique veniam.
          </p>
          <div className="mt-6 sm:mt-8 md:mt-10">
            <Button className="bg-gray-300 h-10 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg text-black hover:text-white hover:bg-gray-400 transition-colors duration-300">
              Get Started
            </Button>
          </div>
        </div>
      </main>

      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto mt-10 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-0">
        <Card className="mx-auto max-w-[120rem] h-80 lg:h-96 xl:h-[30rem] bg-[#131327]/20 backdrop-blur-md border border-white/10 shadow-lg relative overflow-hidden">
          {frames.map((frame, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: `${frame.width}px`,
                height: `${frame.height}px`,
                left: `${randomLeftPositions.current[index]}%`,
                bottom: "-10px",
              }}
              animate={{
                y: [0, "-80vh"],
                opacity: [0, 1, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: index * 0.9,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full border-2 border-teal-100 rounded-lg shadow-[0_0_15px_rgba(94,234,212,0.5)] bg-purple-800 bg-opacity-30 opacity-70" />
            </motion.div>
          ))}
        </Card>
      </div>

      <Features />
      <Plans />
    </div>
  );
}
