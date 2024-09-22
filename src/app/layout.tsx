import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Host",
  description: "All your images in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#000110]">{children}</body>
    </html>
  );
}
