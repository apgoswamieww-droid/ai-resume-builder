"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDown, FileText, Settings, LogOut, LayoutDashboard } from "lucide-react";

interface ProfileDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 hover:border-slate-700 hover:bg-slate-800 transition"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User Avatar"}
            className="h-8 w-8 rounded-full object-cover border border-slate-700"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 text-white font-semibold text-xs">
            {initials}
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-white leading-tight">
            {user.name || "User"}
          </p>
          <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
            {user.email || ""}
          </p>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-40 w-56 rounded-xl border border-slate-800 bg-slate-950 py-1.5 shadow-xl shadow-black/50">
            {/* User Info Header */}
            <div className="px-3 py-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    className="h-9 w-9 rounded-full object-cover border border-slate-700"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 text-white font-semibold text-sm">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.name || "User"}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email || ""}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-blue-400" />
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition"
              >
                <FileText className="h-3.5 w-3.5 text-indigo-400" />
                My Resumes
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition"
              >
                <Settings className="h-3.5 w-3.5 text-slate-400" />
                Settings
              </Link>
            </div>

            {/* Sign Out */}
            <div className="border-t border-slate-800/80 pt-1">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}