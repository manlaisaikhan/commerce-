import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STORE | Онлайн Дэлгүүр",
  description: "Чанартай бүтээгдэхүүн, хурдан хүргэлт, найдвартай үйлчилгээ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="mn" className="dark" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
