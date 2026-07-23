import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Resume } from "@/components/resume";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-6 sm:px-10">
        <Hero />
        <Resume />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
