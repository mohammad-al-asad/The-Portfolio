import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { projects } from "../../generated/prisma";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function SingleProject({ project }: { project: projects }) {
  const [selectedProject, setSelectedProject] = useState<projects>();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (project: projects) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  return (
    <>
      <Card
        key={project.id}
        className="bg-white py-0 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 shadow-sm dark:shadow-none group cursor-pointer"
        onClick={() => openModal(project)}
      >
        <div className="p-6 pb-0">
          <div className="relative w-full h-56 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <Image src={project.imageUrl} alt={project.title} fill />
          </div>
        </div>
        <CardContent className="px-6 py-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs border-gray-300 dark:border-gray-600"
              >
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className={`px-6 pb-6 pt-0`}>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              openModal(project);
            }}
          >
            <ExternalLink className="h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>
      {/* Project Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          {selectedProject && (
            <>
              <DialogHeader className="relative">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Project Image */}
                <div>
                  <div className="relative w-full h-64 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <Image
                      src="/diceGame.png"
                      alt={selectedProject.title}
                      fill
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      Project Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>Completed: {selectedProject.completionDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>Team: {selectedProject.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    About This Project
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedProject.detailedDescription ||
                      selectedProject.description}
                  </p>
                </div>

                {/* Features */}
                {selectedProject.features && (
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {selectedProject.liveUrl && (
                    <Button asChild className="flex-1">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 border-gray-300 dark:border-gray-600"
                    >
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" /> Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SingleProject;
