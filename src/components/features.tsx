import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Share2, Zap, Eye, Key } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Advanced Security",
      icon: Lock,
      description:
        "Protected by advanced security measures, providing peace of mind with every share and upload.",
      details: [
        "Full data encryption on all data",
        "Robust security protocols to prevent breaches",
        "End-to-end encryption for all shared links",
      ],
      bubbleColor: "#1e3942",
    },
    {
      title: "Lightning-Fast Uploads",
      icon: Zap,
      description:
        "Upload images at remarkable speed with our optimized infrastructure, ensuring your content is available when you need it.",
      details: [
        "Intuitive drag-and-drop interface",
        "Support for bulk uploads",
        "Automatic file optimization for speed",
      ],
      bubbleColor: "#1e293d",
    },
    {
      title: "Effortless Sharing",
      icon: Share2,
      description:
        "Share your images and videos with just a few clicks using intuitive, user-friendly features that make sharing seamless and quick.",
      details: [
        "Generate shareable links in seconds",
        "Easily customize permissions for each link",
        "Global CDN for faster delivery",
      ],
      bubbleColor: "#241b38",
    },
    {
      title: "Customizable Privacy Control",
      icon: Eye,
      description:
        "Maintain complete control over your images with advanced privacy settings that ensure your content is shared only with those you trust.",
      details: [
        "Fine-tuned permission settings",
        "Time-limited access for sensitive content",
        "Instant revocation of access at your discretion",
      ],
      bubbleColor: "#431e43",
    },
    {
      title: "Enhanced Account Security",
      icon: Key,
      description:
        "Safeguard your account with two-factor authentication, ensuring that your images remain protected even if your password is compromised.",
      details: [
        "SMS verification for added protection",
        "Support for authenticator apps",
        "Backup recovery codes for peace of mind",
      ],
      bubbleColor: "#1e433a",
    },
  ];

  return (
    <section className="flex-grow flex items-center justify-center mt-12 sm:mt-20 lg:mb-20">
      <div className="mx-auto grid w-[70%] items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 max-w-[120rem]">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden bg-[#131327]/20 backdrop-blur-md border border-white/5 text-white h-[20rem] ${
              index === features.length - 1
                ? "lg:col-span-2 xl:mx-40 2xl:mx-60 "
                : ""
            }`}
          >
            <CardHeader className="pb-0 text-lg">
              <feature.icon className="h-12 w-12 text-blue-200/80 mb-3" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="sm:text-md text-gray-500 dark:text-gray-400 mt-2 text-sm">
                {feature.description}
              </p>
              <ul className="sm:mt-2 mt-4 text-xs sm:text-sm text-gray-300 font-semibold">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="mt-1">
                    • {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
            <div
              className="absolute top-0 right-0 h-40 w-40 blur-[5rem] rounded-bl-full"
              style={{ backgroundColor: feature.bubbleColor }}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
