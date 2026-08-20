import { FullResume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";

interface TemplateProps {
  resume: FullResume;
}

export function ElegantTemplate({ resume }: TemplateProps) {
  const { personalInfo, experiences, educations, skills, projects, certifications } = resume;
  const themeColor = resume.themeColor || "#3b82f6";

  return (
    <div className="w-full bg-white text-slate-800 font-serif min-h-[1050px] flex flex-col">
      {/* Elegant Header */}
      <div className="p-10 text-center border-b-2" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-bold tracking-wide text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
          {personalInfo?.fullName || "Your Full Name"}
        </h1>
        {personalInfo?.jobTitle && (
          <p className="text-base italic mt-2 text-slate-500" style={{ fontFamily: "Georgia, serif" }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-500">
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

      <div className="p-10 space-y-7 flex-1">
        {resume.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "Georgia, serif" }}>
              Professional Summary
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line italic" style={{ fontFamily: "Georgia, serif" }}>
              {resume.summary}
            </p>
          </div>
        )}

        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "Georgia, serif" }}>
              Experience
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>{exp.position}</h3>
                    <span className="text-xs italic text-slate-400">
                      {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm italic" style={{ color: themeColor, fontFamily: "Georgia, serif" }}>{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed whitespace-pre-line" style={{ fontFamily: "Georgia, serif" }}>
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
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "Georgia, serif" }}>
              Education
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-xs italic text-slate-400">{edu.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-500 italic" style={{ fontFamily: "Georgia, serif" }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "Georgia, serif" }}>
              Projects
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-4 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>{proj.title}</h3>
                    {proj.link && (
                      <span className="text-xs text-blue-600 underline italic">{proj.link}</span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-xs text-slate-400 italic mt-0.5">Tech: {proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "Georgia, serif" }}>
              Skills
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-xs font-medium italic"
                  style={{
                    backgroundColor: `${themeColor}08`,
                    color: themeColor,
                    border: `1px solid ${themeColor}25`,
                    fontFamily: "Georgia, serif",
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
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: "Georgia, serif" }}>
              Certifications
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mt-3 space-y-1.5">
              {certifications.map((cert) => (
                <p key={cert.id} className="text-sm text-slate-600 italic" style={{ fontFamily: "Georgia, serif" }}>
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