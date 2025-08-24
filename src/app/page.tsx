import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import FeaturedProjects from '@/components/FeaturedProjects';
import Stats from '@/components/Stats';
import EducationAndAchievements from '@/components/EducationAndAchievements';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div id='home' className="space-y-24">
      <Hero />
      <Stats />
      <Skills />
      <FeaturedProjects />
      <EducationAndAchievements />
      <Contact />
    </div>
  );
}