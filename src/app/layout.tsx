import type { Metadata } from "next";
import { Inter, Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
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
    <ClerkProvider afterSignOutUrl="/" signInUrl="/auth/login" signUpUrl="/auth/register">
      <html lang="mn" className="dark" suppressHydrationWarning>
        <body className={`${inter.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} font-sans antialiased bg-black text-white`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
