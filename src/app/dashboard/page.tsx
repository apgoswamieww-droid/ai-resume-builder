import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserResumes } from "@/actions/resume";
import { Navbar } from "@/components/Navbar";
import { DashboardContent } from "@/components/DashboardContent";

export const metadata = {
  title: "Dashboard | AI Resume Builder",
  description: "Manage your professional ATS-friendly resumes and AI career tools.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const resumes = await getUserResumes();

  const totalResumes = resumes.length;
  const totalSections = resumes.reduce((acc, r) => {
    return acc + (r.experiences?.length || 0) + (r.educations?.length || 0) + (r.skills?.length || 0) + (r.projects?.length || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardContent
          resumes={resumes}
          totalResumes={totalResumes}
          totalSections={totalSections}
          userName={session.user.name || "Career Creator"}
        />
      </main>
    </div>
  );
}
