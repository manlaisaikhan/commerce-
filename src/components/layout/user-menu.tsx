"use client";

import { useRef, useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Settings, ShoppingBag, ChevronDown } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const initials = (
    user.firstName?.[0] ?? user.emailAddresses[0]?.emailAddress[0] ?? "U"
  ).toUpperCase();

  const name = user.fullName || user.firstName || "Хэрэглэгч";
  const email = user.emailAddresses[0]?.emailAddress ?? "";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 pl-0.5 pr-2 py-0.5 rounded-full hover:bg-white/8 transition-all group"
      >
        <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/15 group-hover:ring-violet-500/50 transition-all shrink-0">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-[10px] font-bold">
              {initials}
            </div>
          )}
        </div>
        <ChevronDown
          size={12}
          className={`text-white/40 transition-transform duration-200 hidden sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-0 top-full mt-2.5 w-60 rounded-2xl border border-white/10 bg-[#0e0e0e] shadow-2xl shadow-black/70 overflow-hidden z-50"
          >
            <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-white/6">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 shrink-0">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold">
                    {initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{name}</p>
                <p className="text-[11px] text-white/35 truncate mt-0.5">{email}</p>
              </div>
            </div>

            <div className="p-1.5 border-b border-white/6">
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/6 transition-colors"
              >
                <ShoppingBag size={14} className="shrink-0 text-white/40" />
                Миний захиалгууд
              </Link>
              <button
                onClick={() => { openUserProfile(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/6 transition-colors text-left"
              >
                <Settings size={14} className="shrink-0 text-white/40" />
                Профайл удирдах
              </button>
            </div>

            <div className="p-1.5">
              <button
                onClick={() => signOut({ redirectUrl: "/" })}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/6 transition-colors text-left"
              >
                <LogOut size={14} className="shrink-0" />
                Гарах
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
