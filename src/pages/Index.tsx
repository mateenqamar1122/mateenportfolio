import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WorksSection from "@/components/WorksSection";
import ExperienceSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorksSection />
      <ExperienceSection />
    </main>
  );
};

export default Index;
