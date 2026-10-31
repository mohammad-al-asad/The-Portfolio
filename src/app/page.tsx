import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import FeaturedProjects from '@/components/FeaturedProjects';
import Stats from '@/components/Stats';
import EducationAndAchievements from '@/components/Qualification';
import Contact from '@/components/Footer';
import { prisma } from '@/lib/db';

// Served from cache; admin edits refresh it right away (see lib/revalidate)
export const revalidate = 3600;

export default async function Home() {
  const [featured, educations, achievements, resume] = await Promise.all([
    prisma.projects.findMany({ where: { featured: true }, orderBy: { createdAt: 'desc' } }),
    prisma.educations.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.achievements.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.resumes.findFirst(),
  ]);

  return (
    <div id='home' className="space-y-24 px-4 md:px-[45px] py-8 pt-20 md:pt-40">
      <Hero resumeUrl={resume?.resumeUrl} />
      <Stats />
      <EducationAndAchievements educations={educations} achievements={achievements} />
      <Skills />
      <FeaturedProjects projects={featured} />
      <Contact />
    </div>
  );
}
