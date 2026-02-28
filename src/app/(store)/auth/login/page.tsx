import { SignIn } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SplineScene = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-linear-to-br from-zinc-900 via-zinc-800 to-black animate-pulse" />
  ),
});

const clerkAppearance = {
  variables: {
    colorBackground: "transparent",
    colorText: "#ffffff",
    colorTextSecondary: "rgba(255,255,255,0.5)",
    colorInputBackground: "rgba(255,255,255,0.06)",
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
    headerTitle: {
      color: "#ffffff",
      fontSize: "1.75rem",
      fontWeight: "700",
    },
    headerSubtitle: {
      color: "rgba(255,255,255,0.45)",
    },
    formFieldLabel: {
      color: "rgba(255,255,255,0.6)",
      fontSize: "0.8rem",
    },
    formFieldInput: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      outline: "none",
    },
    formButtonPrimary: {
      background: "#ffffff",
      color: "#000000",
      fontWeight: "600",
    },
    footerAction: {
      color: "rgba(255,255,255,0.4)",
    },
    footerActionLink: {
      color: "#ffffff",
    },
    dividerLine: {
      background: "rgba(255,255,255,0.1)",
    },
    dividerText: {
      color: "rgba(255,255,255,0.35)",
    },
    socialButtonsBlockButton: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
    },
    socialButtonsBlockButtonText: {
      color: "#ffffff",
    },
    socialButtonsBlockButtonArrow: {
      color: "rgba(255,255,255,0.4)",
    },
    alternativeMethodsBlockButton: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
    },
    identityPreviewText: {
      color: "#ffffff",
    },
    identityPreviewEditButton: {
      color: "rgba(255,255,255,0.5)",
    },
    formResendCodeLink: {
      color: "#ffffff",
    },
    otpCodeFieldInput: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
    },
  },
};

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-50 flex bg-black overflow-hidden">
      {/* Left — Form */}
      <div className="relative w-full lg:w-[42%] flex flex-col px-8 sm:px-12 lg:px-16 overflow-y-auto">
        {/* Back button */}
        <div className="pt-8 pb-2 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Буцах
          </Link>
        </div>

        {/* Logo */}
        <div className="mt-10 mb-12 shrink-0">
          <span className="text-white font-bold text-xl tracking-tight">
            commerce<span className="text-white/30">.</span>
          </span>
        </div>

        {/* Clerk */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-6 font-medium">
            Нэвтрэх
          </p>
          <SignIn
            appearance={clerkAppearance}
            routing="hash"
          />
        </div>

        {/* Bottom gradient fade */}
        <div className="h-8 shrink-0" />
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-white/6 shrink-0" />

      {/* Right — Spline */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        {/* Subtle vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-l from-transparent via-transparent to-black/40" />
        <SplineScene />
      </div>
    </div>
  );
}
