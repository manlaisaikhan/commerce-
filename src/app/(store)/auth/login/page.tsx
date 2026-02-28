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
    colorInputBackground: "rgba(255,255,255,0.06)",
    colorInputText: "#ffffff",
    colorPrimary: "#7c3aed",
    colorTextOnPrimaryBackground: "#ffffff",
    borderRadius: "0.6rem",
    colorDanger: "#ff6b6b",
    fontFamily: "inherit",
  },
  elements: {
    // Hide default Clerk header — we use our own
    header: { display: "none" },
    card: {
      background: "transparent",
      border: "none",
      boxShadow: "none",
      padding: "0",
    },
    formFieldLabel: {
      color: "rgba(255,255,255,0.5)",
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
    formFieldInput: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      fontSize: "0.9rem",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    formButtonPrimary: {
      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      color: "#ffffff",
      fontWeight: "700",
      fontSize: "0.8rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
    },
    socialButtonsBlockButton: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    socialButtonsBlockButtonText: { color: "rgba(255,255,255,0.8)" },
    alternativeMethodsBlockButton: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
    },
    dividerLine: { background: "rgba(255,255,255,0.07)" },
    dividerText: { color: "rgba(255,255,255,0.25)", fontSize: "0.72rem" },
    footerAction: { color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
    footerActionLink: { color: "#a78bfa", fontWeight: "600" },
    identityPreviewText: { color: "#ffffff" },
    identityPreviewEditButton: { color: "rgba(255,255,255,0.5)" },
    formResendCodeLink: { color: "#a78bfa" },
    otpCodeFieldInput: {
      background: "rgba(255,255,255,0.06)",
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
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex">
        {/* Glass panel — left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full lg:w-115 xl:w-125 h-full flex flex-col backdrop-blur-2xl bg-black/65 border-r border-white/8"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between pt-7 px-10 shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 text-xs transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                Буцах
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-md bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/30">
                <span className="text-white font-black text-[9px]">S</span>
              </div>
              <span className="text-white/50 text-xs font-bold tracking-widest">STORE</span>
            </motion.div>
          </div>

          {/* Custom header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
            className="mt-14 px-10 shrink-0"
          >
            <p className="text-violet-400 text-[10px] uppercase tracking-[0.35em] font-semibold mb-4">
              — Тавтай морил
            </p>
            <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-3">
              НЭВТРЭХ
            </h1>
            <p className="text-white/35 text-sm leading-relaxed">
              Захиалга хийхийн тулд нэвтрэнэ үү
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-10 mt-8 mb-6 h-px bg-white/8 shrink-0 origin-left"
          />

          {/* Clerk form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.65 }}
            className="flex-1 px-10 overflow-y-auto pb-8"
          >
            <SignIn appearance={clerkAppearance} />
          </motion.div>
        </motion.div>

        {/* Right — Spline shows, floating label */}
        <div className="hidden lg:flex flex-1 flex-col justify-between p-12">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <span className="text-white/10 text-[10px] uppercase tracking-[0.5em]">
              SS — 2026
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="space-y-2"
          >
            <p className="text-white/8 text-[80px] font-black leading-none tracking-tighter select-none">
              STORE
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
