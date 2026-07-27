import { FullResume } from "@/types/resume";

interface TemplateProps {
  resume: FullResume;
}

export function CompactTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b-2" style={{ borderColor: themeColor }}>
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            {personalInfo?.fullName || "Your Full Name"}
          </h1>
          {personalInfo?.jobTitle && (
            <p className="text-[11px] font-medium text-slate-500">{personalInfo.jobTitle}</p>
          )}
        </div>
        <div className="text-right text-[10px] text-slate-500 leading-relaxed">
          {personalInfo?.email && <p>{personalInfo.email}</p>}
          {personalInfo?.phone && <p>{personalInfo.phone}</p>}
          {personalInfo?.location && <p>{personalInfo.location}</p>}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-[65%] p-4 space-y-4 border-r border-slate-100">
          {resume.summary && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Summary</h2>
              <p className="mt-1 text-[10px] text-slate-700 leading-relaxed whitespace-pre-line">
                {resume.summary}
              </p>
            </div>
          )}

          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Experience</h2>
              <div className="mt-2 space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-[11px] font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-[8px] text-slate-400">
                        {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[9px] font-medium" style={{ color: themeColor }}>{exp.company}</p>
                    {exp.description && (
                      <p className="mt-0.5 text-[9px] text-slate-600 leading-snug whitespace-pre-line">
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
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Education</h2>
              <div className="mt-2 space-y-1.5">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-[10px] font-bold text-slate-900">
                        {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                      </h3>
                      <span className="text-[8px] text-slate-400">{edu.endDate}</span>
                    </div>
                    <p className="text-[9px] text-slate-500">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Projects</h2>
              <div className="mt-2 space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-[10px] font-bold text-slate-900">{proj.title}</h3>
                    {proj.technologies && (
                      <p className="text-[8px] text-slate-400">{proj.technologies}</p>
                    )}
                    {proj.description && (
                      <p className="mt-0.5 text-[9px] text-slate-600 leading-snug">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[35%] p-4 space-y-4" style={{ backgroundColor: `${themeColor}06` }}>
          {personalInfo?.linkedin && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Web</h2>
              <div className="mt-1 space-y-0.5 text-[9px] text-slate-600">
                {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
                {personalInfo.github && <p>{personalInfo.github}</p>}
                {personalInfo.website && <p>{personalInfo.website}</p>}
              </div>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Skills</h2>
              <div className="mt-2 flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-[9px] px-1.5 py-0.5 rounded-sm font-medium" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">Certifications</h2>
              <div className="mt-2 space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[9px] font-semibold text-slate-800">{cert.name}</p>
                    <p className="text-[8px] text-slate-400">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
