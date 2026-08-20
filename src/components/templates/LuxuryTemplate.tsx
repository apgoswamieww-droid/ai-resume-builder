import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function LuxuryTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";
  const gold = "#d4af37";

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[1050px] flex flex-col">
      {/* Luxury Header */}
      <div className="p-10 text-center" style={{ backgroundColor: "#0f172a" }}>
        <div className="mx-auto mb-4 h-1 w-24" style={{ backgroundColor: gold }} />
        <h1 className="text-4xl font-bold tracking-[0.15em] text-white uppercase">
          {personalInfo?.fullName || "Your Full Name"}
        </h1>
        {personalInfo?.jobTitle && (
          <p className="text-sm mt-2 tracking-[0.3em] uppercase" style={{ color: gold }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="mx-auto mt-4 h-1 w-24" style={{ backgroundColor: gold }} />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-400">
          {personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" style={{ color: gold }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" style={{ color: gold }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" style={{ color: gold }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1">
              <LinkIcon className="h-3 w-3" style={{ color: gold }} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" style={{ color: gold }} /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      <div className="p-10 space-y-7 flex-1">
        {resume.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Professional Summary
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: gold }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Experience
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: gold }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: `${gold}60` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-xs text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: gold }}>{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Education
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: gold }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: `${gold}60` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-xs text-slate-400">{edu.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Projects
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: gold }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 pl-4" style={{ borderColor: `${gold}60` }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                    {proj.link && (
                      <span className="text-xs text-blue-600 underline">{proj.link}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-xs text-slate-400 mt-0.5">Tech: {proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Skills
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: gold }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${gold}10`,
                    color: "#8b6914",
                    border: `1px solid ${gold}40`,
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
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Certifications
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: gold }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-3 space-y-1.5">
              {certifications.map((cert) => (
                <p key={cert.id} className="text-sm text-slate-600">
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