import { FullResume } from "@/types/resume";

interface TemplateProps {
  resume: FullResume;
}

export function ExecutiveTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex">
      {/* Left Sidebar */}
      <div className="w-[220px] shrink-0 p-5 text-white flex flex-col gap-4" style={{ backgroundColor: themeColor }}>
        <div>
          <h1 className="text-lg font-bold leading-tight">
            {personalInfo?.fullName || "Your Full Name"}
          </h1>
          {personalInfo?.jobTitle && (
            <p className="text-[11px] font-medium mt-1 opacity-80">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        <div className="border-t border-white/20 pt-3 space-y-1.5">
          <h3 className="text-[9px] font-semibold uppercase tracking-wider opacity-60">Contact</h3>
          {personalInfo?.email && <p className="text-[10px] opacity-85 break-all">{personalInfo.email}</p>}
          {personalInfo?.phone && <p className="text-[10px] opacity-85">{personalInfo.phone}</p>}
          {personalInfo?.location && <p className="text-[10px] opacity-85">{personalInfo.location}</p>}
          {personalInfo?.linkedin && <p className="text-[10px] opacity-85">{personalInfo.linkedin}</p>}
          {personalInfo?.github && <p className="text-[10px] opacity-85">{personalInfo.github}</p>}
        </div>

        {skills && skills.length > 0 && (
          <div className="border-t border-white/20 pt-3">
            <h3 className="text-[9px] font-semibold uppercase tracking-wider opacity-60 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[9px] px-1.5 py-0.5 rounded-sm bg-white/15"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div className="border-t border-white/20 pt-3">
            <h3 className="text-[9px] font-semibold uppercase tracking-wider opacity-60 mb-2">Certifications</h3>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-[10px] font-medium leading-tight">{cert.name}</p>
                  <p className="text-[9px] opacity-70">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 space-y-5">
        {resume.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <p className="mt-1.5 text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <div className="mt-2 space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[9px] text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: themeColor }}>{exp.company}</p>
                  {exp.description && (
                    <p className="mt-0.5 text-[10px] text-slate-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {educations && educations.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Education</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <div className="mt-2 space-y-2">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-[9px] text-slate-400">{edu.endDate}</span>
                  </div>
                  <p className="text-[10px] text-slate-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Projects</h2>
            <div className="mt-1 h-px w-full bg-slate-200" />
            <div className="mt-2 space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-[11px] font-bold text-slate-900">{proj.title}</h3>
                  {proj.technologies && (
                    <p className="text-[9px] text-slate-400">{proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="mt-0.5 text-[10px] text-slate-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
