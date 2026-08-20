import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PanelLayout } from "@/components/PanelLayout";
import {
  User as UserIcon,
  Mail,
  Shield,
  Bell,
  Palette,
  FileText,
  Sparkles,
  Check,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Settings | AI Resume Builder",
  description: "Manage your account settings and preferences.",
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user = session.user;

  const settingsSections = [
    {
      icon: UserIcon,
      title: "Profile",
      desc: "Manage your personal information and avatar",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      items: [
        { label: "Name", value: user.name || "Not set" },
        { label: "Email", value: user.email || "Not set" },
        { label: "Avatar", value: user.image ? "Connected" : "Not set" },
      ],
    },
    {
      icon: Shield,
      title: "Security",
      desc: "Manage your account security settings",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      items: [
        { label: "Authentication", value: "GitHub OAuth" },
        { label: "Account Status", value: "Active" },
        { label: "Session", value: "Logged In" },
      ],
    },
    {
      icon: Bell,
      title: "Notifications",
      desc: "Choose what notifications you receive",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      items: [
        { label: "Email Notifications", value: "Enabled" },
        { label: "AI Suggestions", value: "Enabled" },
        { label: "Product Updates", value: "Enabled" },
      ],
    },
    {
      icon: Palette,
      title: "Appearance",
      desc: "Customize how the app looks",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      items: [
        { label: "Theme", value: "Dark" },
        { label: "Default Template", value: "Classic" },
        { label: "Default Color", value: "Blue" },
      ],
    },
    {
      icon: FileText,
      title: "Resume Preferences",
      desc: "Set defaults for your resumes",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      items: [
        { label: "Default Font", value: "Inter" },
        { label: "Default Font Size", value: "Medium" },
        { label: "ATS Optimization", value: "Enabled" },
      ],
    },
    {
      icon: Sparkles,
      title: "AI Preferences",
      desc: "Configure your AI assistant settings",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
      items: [
        { label: "AI Writing", value: "Enabled" },
        { label: "AI Analysis", value: "Enabled" },
        { label: "Auto-suggestions", value: "Enabled" },
      ],
    },
  ];

  return (
    <PanelLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-8">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage your account, preferences, and application settings.
            </p>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User Avatar"}
                className="h-16 w-16 rounded-full object-cover border-2 border-slate-700"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 text-white font-bold text-xl">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-white">{user.name || "User"}</h2>
              <p className="text-sm text-slate-400">{user.email || ""}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold border border-emerald-500/20">
                  <Check className="h-3 w-3" />
                  Active Account
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 text-blue-400 px-2 py-0.5 text-[10px] font-semibold border border-blue-500/20">
                  <Shield className="h-3 w-3" />
                  GitHub OAuth
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${section.bg}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                    <p className="text-[10px] text-slate-400">{section.desc}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                      <span className="text-xs text-slate-400">{item.label}</span>
                      <span className="text-xs font-medium text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </PanelLayout>
  );
}