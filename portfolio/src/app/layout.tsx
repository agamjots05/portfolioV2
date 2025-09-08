import type { Metadata } from "next";
import { LightRaysBackground } from "@/components/ui/shadcn-io/light-rays-background"
import { Geist, Geist_Mono, Orbitron, Syne_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const syneMono = Syne_Mono({
  variable: "--font-syne-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "AgamjotDev",
  description: "My personal portfolio :0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${syneMono.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden relative`}>
        <LightRaysBackground 
          isBackground={true}
          fixedLightSource={true}
          raysOrigin="top-center"
          raysColor="#FFFFFF"
          raysSpeed={0.4}
          lightSpread={0.8}
          rayLength={0.7}
          fadeDistance={10}
          followMouse={false}
        />
        <LightRaysBackground 
          isBackground={true}
          fixedLightSource={true}
          raysOrigin="bottom-center"
          raysColor="#FFFFFF"
          raysSpeed={0.4}
          lightSpread={0.8}
          rayLength={0.5}
          fadeDistance={10}
          followMouse={false}
        />
        
        {/* Content layer */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
