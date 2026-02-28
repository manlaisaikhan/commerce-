"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SplineScene = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#030312]" />,
});

const clerkAppearance = {
  variables: {
    colorBackground: "transparent",
    colorText: "#ffffff",
    colorTextSecondary: "rgba(255,255,255,0.45)",
    colorInputBackground: "rgba(255,255,255,0.07)",
    colorInputText: "#ffffff",
    colorPrimary: "#ffffff",
    colorTextOnPrimaryBackground: "#000000",
    borderRadius: "0.75rem",
    colorDanger: "#ff6b6b",
    fontFamily: "inherit",
  },
  elements: {
    card: {
      background: "transparent",
      border: "none",
      boxShadow: "none",
      padding: "0",
    },
    headerTitle: { color: "#ffffff", fontSize: "1.6rem", fontWeight: "700" },
    headerSubtitle: { color: "rgba(255,255,255,0.4)" },
    formFieldLabel: { color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" },
    formFieldInput: {
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    formButtonPrimary: {
      background: "#ffffff",
      color: "#000000",
      fontWeight: "700",
    },
    socialButtonsBlockButton: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    socialButtonsBlockButtonText: { color: "#ffffff" },
    socialButtonsBlockButtonArrow: { color: "rgba(255,255,255,0.35)" },
    alternativeMethodsBlockButton: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    dividerLine: { background: "rgba(255,255,255,0.08)" },
    dividerText: { color: "rgba(255,255,255,0.3)" },
    footerAction: { color: "rgba(255,255,255,0.35)" },
    footerActionLink: { color: "#ffffff" },
    identityPreviewText: { color: "#ffffff" },
    identityPreviewEditButton: { color: "rgba(255,255,255,0.5)" },
    formResendCodeLink: { color: "#ffffff" },
    otpCodeFieldInput: {
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
    },
  },
};

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Full-screen Spline background */}
      <div className="absolute inset-0">
        <SplineScene />
      </div>

      {/* Dark overlay so form is readable */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex">
        {/* Glass panel — left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full lg:w-115 xl:w-125 h-full flex flex-col backdrop-blur-2xl bg-black/60 border-r border-white/8"
        >
          {/* Back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-8 px-10 shrink-0"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/35 hover:text-white/80 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Буцах
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 px-10 shrink-0"
          >
            <span className="text-white font-black text-2xl tracking-tight">
              STORE<span className="text-white/20">.</span>
            </span>
          </motion.div>

          {/* Form area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex-1 flex flex-col justify-center px-10 overflow-y-auto py-8"
          >
            <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] mb-8 font-semibold">
              Нэвтрэх
            </p>
            <SignIn appearance={clerkAppearance} />
          </motion.div>

          <div className="h-10 shrink-0" />
        </motion.div>

        {/* Right: Spline visible, optional floating text */}
        <div className="hidden lg:flex flex-1 items-end justify-end p-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-right"
          >
            <p className="text-white/15 text-[10px] uppercase tracking-[0.4em]">
              SS — 2026
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
