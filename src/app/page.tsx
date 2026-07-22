import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-[var(--spacing-page-px)]">
        {/* Container untuk garis trace (circuit line) */}
        <div className="relative pl-8 sm:pl-12 border-l border-[var(--color-trace-green)] min-h-screen">
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
