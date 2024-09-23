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
      <body className="bg-[url('./bg1.png')] bg-cover bg-center h-screen bg-no-repeat bg-[#0b0c0f] overflow-x-hidden">
        {children}
      </body>{" "}
    </html>
  );
}
