import { profiles } from "@/data/profile";
import ProfileCard from "@/components/Profile";

export default function ProfilesSection() {
  return (
    <section id="profiles" className="bg-[#090908] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#c49a52]">
            Curated Directory
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Meet Verified Community Members
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            Discover verified adults across Lahore through a privacy-focused
            and respectful community directory.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
