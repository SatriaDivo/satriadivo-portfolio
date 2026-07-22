import { education, experience, organization, certificates } from "@/data/resume";
import { MotionWrapper } from "./motion-wrapper";

export function Resume() {
  return (
    <div id="resume" className="mt-12 space-y-10 scroll-mt-24">
      {/* Pengalaman Kerja */}
      <MotionWrapper>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Pengalaman Kerja
          </h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--color-ink-circuit)]">{exp.company}</h3>
                    <p className="text-blue-600 font-medium">{exp.role}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full h-fit self-start">{exp.period}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-600">
                  {exp.responsibilities.map((resp, j) => (
                    <li key={j}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </MotionWrapper>

      {/* Pengalaman Organisasi */}
      <MotionWrapper delay={0.1}>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Pengalaman Organisasi
          </h2>
          <div className="space-y-6">
            {organization.map((org, i) => (
              <div key={i} className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--color-ink-circuit)]">{org.organization}</h3>
                    <p className="text-blue-600 font-medium">{org.role} — <span className="text-gray-600 font-normal">{org.department}</span></p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full h-fit self-start">{org.period}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-600">
                  {org.responsibilities.map((resp, j) => (
                    <li key={j}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pendidikan */}
        <MotionWrapper delay={0.2}>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              Pendidikan
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg p-5 shadow-sm">
                  <h3 className="font-bold text-[var(--color-ink-circuit)] mb-1">{edu.institution}</h3>
                  <p className="text-sm text-gray-600 mb-2">{edu.degree}</p>
                  <p className="text-xs text-gray-400 font-medium">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>
        </MotionWrapper>

        {/* Sertifikat */}
        <MotionWrapper delay={0.3}>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Sertifikat
            </h2>
            <div className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg p-5 shadow-sm">
              <ul className="space-y-3">
                {certificates.map((cert, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </MotionWrapper>
      </div>
    </div>
  );
}
