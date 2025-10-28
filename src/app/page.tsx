import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import FeaturedProjects from '@/components/FeaturedProjects';
import Stats from '@/components/Stats';
import EducationAndAchievements from '@/components/Qualification';
import Contact from '@/components/Footer';

export default function Home() {
  return (
    <div id='home' className="space-y-24 px-4 md:px-10 py-8 pt-20 md:pt-40">
      <Hero />
      <Stats />
      <Skills />
      <FeaturedProjects />
      <EducationAndAchievements />
      <Contact />
    </div>
  );
}