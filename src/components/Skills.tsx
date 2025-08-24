// src/components/skills.tsx
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/SectionHeader';

const skills = [
  { name: 'TypeScript', level: 90 },
  { name: 'React', level: 92 },
  { name: 'Next.js', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'Tailwind CSS', level: 93 },
  { name: 'MongoDB', level: 80 },
];

export default function Skills() {
  return (
    <section id='skills'>
      <SectionHeader 
        title="Technical Expertise" 
        subtitle="Technologies I work with" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white text-foreground dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">{skill.name}</span>
              <Badge variant="secondary">{skill.level}%</Badge>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}