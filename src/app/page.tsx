import { Nav } from "@/components/nav";
import { ProfileCard } from "@/components/profile-card";
import { ActivityFeed } from "@/components/activity-feed";
import { Resume } from "@/components/resume";
import { SidebarCards } from "@/components/sidebar-cards";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 min-h-screen">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Column - 2/3 width on md+ */}
          <div className="w-full md:w-2/3 md:flex-shrink-0">
            <ProfileCard />
            <Resume />
            <ActivityFeed />
          </div>

          {/* Right Column - 1/3 width on md+ */}
          <div className="w-full md:w-1/3 md:flex-shrink-0 sticky top-24">
            <SidebarCards />
          </div>
        </div>
      </main>
    </>
  );
}
