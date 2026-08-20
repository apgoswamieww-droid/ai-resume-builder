import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Code2, Terminal, Cpu } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function TechTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-mono min-h-[1050px] flex flex-col">
      {/* Tech Header */}
      <div className="p-8" style={{ backgroundColor: "#0f172a" }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: themeColor }}>
            <Code2 className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {personalInfo?.fullName || "Your Full Name"}
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-sm mt-1" style={{ color: themeColor }}>
                {">"} {personalInfo.jobTitle}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
          {personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1">
              <LinkIcon className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" style={{ color: themeColor }} /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6 flex-1">
        {resume.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <Terminal className="h-3.5 w-3.5" /> Professional Summary
            </h2>
            <div className="mt-2 border-l-2 pl-3" style={{ borderColor: themeColor }}>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {resume.summary}
              </p>
            </div>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <Cpu className="h-3.5 w-3.5" /> Experience
            </h2>
            <div className="mt-3 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[10px] text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: themeColor }}>{exp.company}</p>
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
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <Terminal className="h-3.5 w-3.5" /> Education
            </h2>
            <div className="mt-3 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="border-l-2 pl-3" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">
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
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <Code2 className="h-3.5 w-3.5" /> Projects
            </h2>
            <div className="mt-3 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 pl-3" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    {proj.link && (
                      <span className="text-[10px] text-blue-600 underline">{proj.link}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-[10px] text-slate-400 font-medium">Tech: {proj.technologies}</p>
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
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <Terminal className="h-3.5 w-3.5" /> Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded px-2 py-0.5 text-[11px] font-medium"
                  style={{
                    backgroundColor: "#0f172a",
                    color: themeColor,
                    border: `1px solid ${themeColor}40`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: themeColor }}>
              <Cpu className="h-3.5 w-3.5" /> Certifications
            </h2>
            <div className="mt-3 space-y-1.5">
              {certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">{cert.name}</span> — {cert.issuer}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}