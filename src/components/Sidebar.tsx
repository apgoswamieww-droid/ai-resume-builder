"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  BarChart3,
  ScrollText,
  Briefcase,
  Settings,
  HelpCircle,
  Plus,
} from "lucide-react";
import { CreateResumeModal } from "./CreateResumeModal";

interface SidebarProps {
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
  resumeCount?: number;
}

export function Sidebar({ userName, userEmail, userImage, resumeCount = 0 }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-400" },
    { href: "/dashboard", label: "My Resumes", icon: FileText, color: "text-indigo-400", badge: resumeCount },
    { href: "/ai-tools", label: "AI Tools", icon: Sparkles, color: "text-purple-400" },
    { href: "/ai-tools", label: "ATS Analysis", icon: BarChart3, color: "text-emerald-400" },
    { href: "/ai-tools", label: "Cover Letters", icon: ScrollText, color: "text-amber-400" },
    { href: "/ai-tools", label: "Job Match", icon: Briefcase, color: "text-cyan-400" },
  ];

  const bottomItems = [
    { href: "/settings", label: "Settings", icon: Settings, color: "text-slate-400" },
    { href: "/help", label: "Help & Support", icon: HelpCircle, color: "text-slate-400" },
  ];

  const initials = (userName || userEmail || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-950/60">
      {/* User Profile Card */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          {userImage ? (
            <img
              src={userImage}
              alt={userName || "User Avatar"}
              className="h-10 w-10 rounded-full object-cover border border-slate-700"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 text-white font-semibold text-sm">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName || "User"}</p>
            <p className="text-[10px] text-slate-400 truncate">{userEmail || ""}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition ${
                isActive
                  ? "bg-blue-600/10 text-white border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent"
              }`}
            >
              <Icon className={`h-4 w-4 ${item.color}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="rounded-full bg-blue-600/20 text-blue-400 px-2 py-0.5 text-[10px] font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="my-3 border-t border-slate-800/80" />

        <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Quick Actions
        </p>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent transition"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Create New Resume</span>
        </button>
        <Link
          href="/ai-tools"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent transition"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span>AI Generate Summary</span>
        </Link>
      </nav>

      {/* Create Resume Modal */}
      <CreateResumeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Bottom Items */}
      <div className="p-3 border-t border-slate-800/80 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent transition"
            >
              <Icon className={`h-4 w-4 ${item.color}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}