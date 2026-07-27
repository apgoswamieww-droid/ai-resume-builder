import { FullResume } from "@/types/resume";

interface TemplateProps {
  resume: FullResume;
}

export function MinimalTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col p-8">
      {/* Header */}
      <div className="text-left border-l-4 pl-4" style={{ borderColor: themeColor }}>
        <h1 className="text-2xl font-light tracking-wide text-slate-900">
          {personalInfo?.fullName || "Your Full Name"}
        </h1>
        {personalInfo?.jobTitle && (
          <p className="text-sm font-medium mt-0.5 text-slate-500">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-400">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="mt-6 space-y-6 flex-1">
        {resume.summary && (
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              About
            </h2>
            <div className="mt-2 border-t border-slate-200 pt-2">
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {resume.summary}
              </p>
            </div>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Experience
            </h2>
            <div className="mt-2 border-t border-slate-200 pt-3 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold text-slate-800">{exp.position}</h3>
                    <span className="text-[10px] text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Education
            </h2>
            <div className="mt-2 border-t border-slate-200 pt-3 space-y-2">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-semibold text-slate-800">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-[10px] text-slate-400">{edu.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Projects
            </h2>
            <div className="mt-2 border-t border-slate-200 pt-3 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-xs font-semibold text-slate-800">{proj.title}</h3>
                  {proj.technologies && (
                    <p className="text-[10px] text-slate-400">{proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Skills
            </h2>
            <div className="mt-2 border-t border-slate-200 pt-2">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs text-slate-600">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
