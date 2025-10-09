"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
} from "lucide-react";
import Image from "next/image";

// Extended project data with more details
const allProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured online shopping platform with payment integration and inventory management.",
    detailedDescription:
      "Developed a complete e-commerce solution with user authentication, product catalog, shopping cart, checkout process, and admin dashboard. Integrated Stripe for payments and implemented inventory management system.",
    image: "/ecommerce-project.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe API",
    ],
    features: [
      "User Authentication",
      "Product Catalog",
      "Shopping Cart",
      "Payment Processing",
      "Order Management",
      "Admin Dashboard",
    ],
    liveUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
    completionDate: "June 2023",
    teamSize: "Solo",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A productivity application for teams to collaborate on projects and tasks.",
    detailedDescription:
      "Built a collaborative task management application with real-time updates, team workspaces, task assignments, progress tracking, and notifications. Implemented using Next.js with TypeScript for type safety.",
    image: "/task-management-project.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
    ],
    features: [
      "Real-time Collaboration",
      "Task Assignments",
      "Progress Tracking",
      "Team Workspaces",
      "Notifications",
      "File Attachments",
    ],
    liveUrl: "https://taskmanager.example.com",
    githubUrl: "https://github.com/example/task-manager",
    completionDate: "March 2023",
    teamSize: "3 Developers",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather forecasting application with interactive maps and location tracking.",
    detailedDescription:
      "Created a weather dashboard that provides current conditions, forecasts, and interactive maps. Integrated with multiple weather APIs and implemented location-based services with geolocation API.",
    image: "/weather-dashboard-project.jpg",
    tags: ["React", "API Integration", "Chart.js", "Leaflet", "Geolocation"],
    technologies: [
      "React",
      "Chart.js",
      "Leaflet Maps",
      "OpenWeather API",
      "Geolocation API",
    ],
    features: [
      "Current Weather",
      "7-Day Forecast",
      "Interactive Maps",
      "Location Search",
      "Weather Charts",
      "Favorite Locations",
    ],
    liveUrl: "https://weather-dashboard.example.com",
    githubUrl: "https://github.com/example/weather-dashboard",
    completionDate: "January 2023",
    teamSize: "Solo",
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description:
      "Dashboard for tracking and analyzing social media performance across multiple platforms.",
    image: "/social-analytics-project.jpg",
    tags: ["Vue.js", "Firebase", "Chart.js", "REST API"],
    technologies: [
      "Vue.js",
      "Vuex",
      "Firebase",
      "Chart.js",
      "Social Media APIs",
    ],
    features: [
      "Multi-platform Integration",
      "Performance Metrics",
      "Content Analytics",
      "Audience Insights",
      "Custom Reports",
    ],
    liveUrl: "https://social-analytics.example.com",
    githubUrl: "https://github.com/example/social-analytics",
    completionDate: "November 2022",
    teamSize: "2 Developers",
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description:
      "Mobile application for tracking workouts, nutrition, and health metrics.",
    image: "/fitness-app-project.jpg",
    tags: ["React Native", "Firebase", "HealthKit", "Chart.js"],
    technologies: [
      "React Native",
      "Firebase",
      "HealthKit API",
      "Chart.js",
      "Nutritionix API",
    ],
    features: [
      "Workout Tracking",
      "Nutrition Logging",
      "Progress Charts",
      "Goal Setting",
      "Social Features",
    ],
    liveUrl: "https://fitness-app.example.com",
    githubUrl: "https://github.com/example/fitness-app",
    completionDate: "August 2022",
    teamSize: "4 Developers",
  },
  {
    id: 6,
    title: "Real Estate Platform",
    description:
      "Comprehensive platform for property listings, virtual tours, and agent connections.",
    image: "/real-estate-project.jpg",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "AWS", "WebRTC"],
    technologies: [
      "Next.js",
      "GraphQL",
      "PostgreSQL",
      "AWS S3",
      "WebRTC",
      "Google Maps API",
    ],
    features: [
      "Property Listings",
      "Virtual Tours",
      "Agent Matching",
      "Mortgage Calculator",
      "Neighborhood Insights",
    ],
    liveUrl: "https://realestate.example.com",
    githubUrl: "https://github.com/example/real-estate",
    completionDate: "May 2022",
    teamSize: "5 Developers",
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [modalOpen, setModalOpen] = useState(false);

  interface Project {
    id: number;
    title: string;
    description: string;
    detailedDescription?: string;
    image: string;
    tags: string[];
    technologies: string[];
    features?: string[];
    liveUrl?: string;
    githubUrl?: string;
    completionDate: string;
    teamSize: string;
  }

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark md:py-18">
      <div className="container mx-auto">
        {/* Header - With Gradient Accent */}
        <div className="md:mb-10 mb-8 md:mt-5">
          <div className="flex py-4 px-6 gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl self-center md:text-3xl font-bold text-gray-900 dark:text-white">
              All Projects
            </h1>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-white py-0 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 shadow-sm dark:shadow-none group cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="p-6 pb-0">
                <div className="relative w-full h-56 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                  <Image src="/diceGame.png" alt={project.title} fill />
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
              <CardFooter className="px-6 pb-6 pt-0">
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
          ))}
        </div>

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
                      <Image src="/diceGame.png" alt={selectedProject.title} fill />
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
                          <span>
                            Completed: {selectedProject.completionDate}
                          </span>
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
      </div>
    </div>
  );
}
