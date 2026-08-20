import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function SplitTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col">
      {/* Header */}
      <div className="p-8 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <h1 className="text-3xl font-bold tracking-tight">
          {personalInfo?.fullName || "Your Full Name"}
        </h1>
        {personalInfo?.jobTitle && (
          <p className="text-base font-medium mt-1 opacity-90">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-85">
          {personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1">
              <LinkIcon className="h-3 w-3" /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      {/* Two-Column Split */}
      <div className="flex flex-1">
        {/* Left Column - Main Content */}
        <div className="w-[60%] p-6 space-y-5">
          {resume.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Profile</h2>
              <div className="mt-1 h-px w-full bg-slate-200" />
              <p className="mt-1.5 text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">
                {resume.summary}
              </p>
            </div>
          )}

          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Experience</h2>
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
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Education</h2>
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
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-[40%] p-6 space-y-5" style={{ backgroundColor: `${themeColor}06` }}>
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Skills</h2>
              <div className="mt-1 h-px w-full bg-slate-200" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${themeColor}15`, color: themeColor, border: `1px solid ${themeColor}30` }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Projects</h2>
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

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>Certifications</h2>
              <div className="mt-1 h-px w-full bg-slate-200" />
              <div className="mt-2 space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[10px] font-semibold text-slate-800">{cert.name}</p>
                    <p className="text-[9px] text-slate-400">{cert.issuer}</p>
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