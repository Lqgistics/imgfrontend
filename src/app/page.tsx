import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";

const frames = [
  { width: 50, height: 50 },
  { width: 40, height: 40 },
  { width: 30, height: 30 },
  { width: 40, height: 40 },
  { width: 50, height: 50 },
];

export default function Home({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        <Card className="h-[22rem] sm:h-[30rem] lg:h-[40rem] bg-[#131327]/20 backdrop-blur-md border border-white/10 shadow-lg">
          {frames.map((frame, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: frame.width,
                height: frame.height,
                left: `${Math.random() * 80 + 10}%`,
                bottom: "-10px",
              }}
              animate={{
                y: [0, isClient && window.innerWidth < 768 ? -300 : -500], // Adjust y based on screen width
                opacity: [0, 1, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5, // Increased duration to slow down the animation
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
      {children}
      <section className="h-screen w-full flex items-center justify-center mt-80">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            New Section Title
          </h2>
          <p className="text-white text-lg md:text-2xl max-w-2xl md:max-w-4xl mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            deserunt ab ducimus porro tempore aliquid necessitatibus facere
            nisi, eligendi eius reprehenderit laboriosam aliquam reiciendis
            adipisci sapiente, eos in, dolorum placeat!
          </p>
        </div>
      </section>
    </div>
  );
}
