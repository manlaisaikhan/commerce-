"use client";

import Link from "next/link";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AuronLogo } from "@/components/ui/auron-logo";

const SplineScene = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#030312]" />,
});

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();

  const [step, setStep] = useState<"form" | "verify">("form");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({ firstName, emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message: string }[] };
      setError(clerkError.errors?.[0]?.message || "Бүртгүүлэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const getRedirectUrl = () => {
    if (typeof window === "undefined") return "/";
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("redirect_url");
    if (fromQuery) return fromQuery;
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      const hashParams = new URLSearchParams(hash.slice(2));
      return hashParams.get("redirect_url") || hashParams.get("after_sign_up_url") || "/";
    }
    return "/";
  };

  const handleVerify = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(getRedirectUrl());
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message: string }[] };
      setError(clerkError.errors?.[0]?.message || "Баталгаажуулахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (!isLoaded) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: `${origin}/sso-callback`,
      redirectUrlComplete: getRedirectUrl(),
    });
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 lg:w-[480px] lg:flex-none flex items-center justify-center px-8 lg:px-14 bg-[#080808]">
        <div className="w-full max-w-sm py-12">

          <Link href="/" className="flex items-center mb-14">
            <AuronLogo className="h-9 w-auto" />
          </Link>

          {step === "form" ? (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Бүртгүүлэх</h1>
                <p className="text-sm text-white/40">
                  Бүртгэлтэй юу?{" "}
                  <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Нэвтрэх
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-2">
                    Нэр
                  </label>
                  <input
                    type="text"
                    placeholder="Таны нэр"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-2">
                    Имэйл
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-2">
                    Нууц үг
                  </label>
                  <input
                    type="password"
                    placeholder="Дор хаяж 8 тэмдэгт"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold uppercase tracking-widest hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 disabled:opacity-40 mt-2"
                >
                  {loading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
                </button>
              </form>

              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/6" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#080808] px-3 text-[10px] text-white/25 uppercase tracking-[0.2em]">Эсвэл</span>
                </div>
              </div>

              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/4 hover:bg-white/8 transition-colors text-sm font-medium text-white/70 hover:text-white"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google-ээр бүртгүүлэх
              </button>
            </>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Код оруулах</h1>
                <p className="text-sm text-white/40">
                  <span className="text-white/60">{email}</span>-руу 6 оронтой код илгээлээ
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-5">
                {error && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-semibold text-white/35 uppercase tracking-[0.2em] mb-2">
                    Баталгаажуулах код
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full px-4 py-4 rounded-xl border border-white/8 bg-white/5 text-white text-2xl font-bold text-center tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all placeholder:text-white/15 placeholder:text-base placeholder:tracking-normal placeholder:font-normal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold uppercase tracking-widest hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 disabled:opacity-40 mt-2"
                >
                  {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("form"); setError(""); }}
                  className="w-full text-sm text-white/25 hover:text-white/50 transition-colors pt-1"
                >
                  ← Буцах
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <SplineScene />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#080808] to-transparent" />
      </div>
    </div>
  );
}
