import { FullResume } from "@/types/resume";

interface TemplateProps {
  resume: FullResume;
}

export function CreativeTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {(personalInfo?.fullName || "?").charAt(0)}
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-extrabold tracking-tight">
              {personalInfo?.fullName || "Your Full Name"}
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-sm font-medium mt-0.5 opacity-90">
                {personalInfo.jobTitle}
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-[10px] opacity-80">
              {personalInfo?.email && <span>{personalInfo.email}</span>}
              {personalInfo?.phone && <span>{personalInfo.phone}</span>}
              {personalInfo?.location && <span>{personalInfo.location}</span>}
              {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo?.github && <span>{personalInfo.github}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-5">
        {resume.summary && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: themeColor }}>About</h2>
            <div className="mt-1.5 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
            <p className="mt-2 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: themeColor }}>Experience</h2>
            <div className="mt-1.5 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[10px] font-medium text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold" style={{ color: themeColor }}>{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-[10px] text-slate-600 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: themeColor }}>Education</h2>
            <div className="mt-1.5 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
            <div className="mt-3 space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <p className="text-[10px] text-slate-500">{edu.institution}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: themeColor }}>Skills</h2>
              <div className="mt-1.5 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="mt-3 space-y-1.5">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-[10px]">
                      <span className="font-medium text-slate-800">{skill.name}</span>
                    </div>
                    <div className="mt-0.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, 60 + Math.random() * 40)}%`, backgroundColor: themeColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: themeColor }}>Projects</h2>
              <div className="mt-1.5 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="mt-3 space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    {proj.technologies && (
                      <p className="text-[9px] text-slate-400 mt-0.5">{proj.technologies}</p>
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

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: themeColor }}>Certifications</h2>
            <div className="mt-1.5 h-1 w-8 rounded-full" style={{ backgroundColor: themeColor }} />
            <div className="mt-2 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert.id} className="text-[10px] px-2 py-1 rounded-md font-medium" style={{ backgroundColor: `${themeColor}12`, color: themeColor, border: `1px solid ${themeColor}30` }}>
                  {cert.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
