import { siteMetadata } from "@/data/metadata";
import { skillGroups } from "@/data/skills";
import { MotionWrapper } from "./motion-wrapper";

export function SidebarCards() {
  return (
    <div className="space-y-6">
      {/* Action Button */}
      <MotionWrapper>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
          Hubungi Saya
        </button>
      </MotionWrapper>

      {/* Contact Info Card */}
      <MotionWrapper delay={0.1}>
        <div className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg shadow-sm">
          <h2 className="font-bold text-gray-700 px-5 py-4 border-b border-[var(--color-mist)] bg-gray-50 rounded-t-lg">
            Contact Information
          </h2>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </div>
              <a href={`mailto:${siteMetadata.email}`} className="text-sm text-blue-600 hover:underline">
                {siteMetadata.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>
              </div>
              <a href={siteMetadata.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                Website
              </a>
            </div>
          </div>
        </div>
      </MotionWrapper>

      {/* Social Media Card */}
      <MotionWrapper delay={0.2}>
        <div className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg shadow-sm">
          <h2 className="font-bold text-gray-700 px-5 py-4 border-b border-[var(--color-mist)] bg-gray-50 rounded-t-lg">
            Social Media
          </h2>
          <div className="p-5 grid grid-cols-2 gap-4">
            <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              GitHub
            </a>
            <a href={siteMetadata.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              LinkedIn
            </a>
          </div>
        </div>
      </MotionWrapper>

      {/* Skills Card (Media Lists Equivalent) */}
      <MotionWrapper delay={0.3}>
        <div className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg shadow-sm">
          <div className="flex justify-between items-center px-5 py-4 border-b border-[var(--color-mist)] bg-gray-50 rounded-t-lg">
            <h2 className="font-bold text-gray-700">Skills / Core Focus</h2>
            <div className="w-4 h-4 rounded-full bg-gray-300 text-white text-[10px] flex items-center justify-center font-bold">i</div>
          </div>
          <div className="p-3">
            <div className="mb-3 px-2">
              <input type="text" placeholder="Filter skills..." className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-300" />
            </div>
            <ul className="text-sm text-gray-600 max-h-60 overflow-y-auto">
              {skillGroups.flatMap(g => g.items).slice(0, 10).map((skill, i) => (
                <li key={i} className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
