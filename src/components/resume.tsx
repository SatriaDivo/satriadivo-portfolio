import { education, experience, organization, certificates } from "@/data/resume";
import { SectionTitle } from "./node-marker";
import { MotionWrapper } from "./motion-wrapper";

export function Resume() {
  return (
    <section id="resume" className="py-20 sm:py-28 scroll-mt-20">
      <MotionWrapper>
        <SectionTitle>Pengalaman Kerja</SectionTitle>
        <div className="space-y-12 mb-20">
          {experience.map((exp, i) => (
            <div key={i}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <h3 className="heading-display text-base text-[var(--color-text)]">{exp.company}</h3>
                <span className="text-[11px] text-[var(--color-accent)]">{exp.period}</span>
              </div>
              <p className="text-[13px] font-medium text-[var(--color-accent-2)] mb-3">{exp.role}</p>
              <ul className="space-y-2 text-[13px] text-[var(--color-text)]/80 leading-relaxed">
                {exp.responsibilities.map((r, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-[var(--color-accent)] select-none shrink-0">▸</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.08}>
        <SectionTitle>Pengalaman Organisasi</SectionTitle>
        <div className="space-y-12 mb-20">
          {organization.map((org, i) => (
            <div key={i}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <h3 className="heading-display text-base text-[var(--color-text)]">{org.organization}</h3>
                <span className="text-[11px] text-[var(--color-accent)]">{org.period}</span>
              </div>
              <p className="text-[13px] text-[var(--color-accent-2)] mb-3">
                {org.role} — {org.department}
              </p>
              <ul className="space-y-2 text-[13px] text-[var(--color-text)]/80 leading-relaxed">
                {org.responsibilities.map((r, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-[var(--color-accent)] select-none shrink-0">▸</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.16}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
          <div>
            <SectionTitle>Pendidikan</SectionTitle>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <div key={i}>
                  <h4 className="text-[13px] font-semibold text-[var(--color-text)]">{edu.institution}</h4>
                  <p className="text-[12px] text-[var(--color-text-muted)]">{edu.degree}</p>
                  <span className="text-[10px] text-[var(--color-accent)]">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Sertifikat</SectionTitle>
            <ul className="space-y-2.5 text-[12px] text-[var(--color-text)]/70 leading-relaxed">
              {certificates.map((cert, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[var(--color-accent-2)] shrink-0">◇</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}
