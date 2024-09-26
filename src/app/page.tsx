"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Share2, Zap } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
      <div className="flex-grow flex flex-col justify-center items-center md:mt-[9rem]">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-12 text-white/90">
            Your images, anywhere
          </h1>
          <p className="text-white/80 text-lg md:text-2xl max-w-md md:max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur possimus ex blanditiis dolore error similique veniam.
          </p>
          <div className="flex justify-center mt-8">
            <Button className="bg-gray-300 h-[3rem] w-[8rem] rounded-[0.9rem] text-md text-black hover:text-white hover:bg-gray-900">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[70%] mx-auto relative mt-20">
        <Card className="mx-auto max-w-[120rem] h-[22rem] sm:h-[30rem] lg:h-[40rem] bg-[#131327]/20 backdrop-blur-md border border-white/10 shadow-lg">
          {frames.map((frame, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: frame.width,
                height: frame.height,
                left: `${randomLeftPositions.current[index]}%`,
                bottom: "-10px",
              }}
              animate={{
                y: [0, isClient && window.innerWidth < 768 ? -300 : -500], // Adjust y based on screen width
                opacity: [0, 1, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: isClient && window.innerWidth < 768 ? 6 : 5, // Increased duration to slow down the animation
                repeat: Infinity,
                delay: index * 0.9, // Adjusted delay to match the new duration
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full border-2 border-teal-100 rounded-lg shadow-[0_0_15px_rgba(94,234,212,0.5)] bg-purple-800 bg-opacity-30 opacity-70" />
            </motion.div>
          ))}
        </Card>
      </div>
      <Features />
    </div>
  );
}
