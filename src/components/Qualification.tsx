"use client";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { achievements, educations } from "../../generated/prisma";
import LoadingScreen from "./LoadingScreen";

export default function Qualification() {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [education, setEducation] = useState<educations[] | null>(null);
  const [achievement, setAchievement] = useState<achievements[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduRes, achRes] = await Promise.all([
          fetch("/api/educations"),
          fetch("/api/achievements"),
        ]);
        if (eduRes.ok && achRes.ok) {
          const [eduData, achData] = await Promise.all([
            eduRes.json(),
            achRes.json(),
          ]);
          setEducation(eduData);
          setAchievement(achData);
        }
      } catch (error) {
        console.error("Error fetching qualifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  type ModalItem =
    | (educations & { type: "education" })
    | (achievements & { type: "achievement" });

  const openModal = (item: ModalItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <section id="qualifications" className="py-16">
      <SectionHeader
        title="Qualifications"
        subtitle="My academic background and professional accomplishments"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Education Column */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <GraduationCap className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            Education
          </h3>

          <div className="space-y-6">
            {education?.map((item, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 shadow-sm dark:shadow-none group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 self-start mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                        <GraduationCap className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {item.institution}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {item.degree}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                    >
                      GPA: {item.gpa}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600"
                    onClick={() => openModal({ ...item, type: "education" })}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements Column */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
            Achievements
          </h3>

          <div className="space-y-6">
            {achievement?.map((item, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors duration-300 shadow-sm dark:shadow-none group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 self-start mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                        <Award className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 ">
                          {item.organization}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300"
                    >
                      {item.year}
                    </Badge>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600"
                    onClick={() => openModal({ ...item, type: "achievement" })}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <DialogHeader className="relative">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedItem?.type === "education"
                ? selectedItem.institution
                : selectedItem?.type === "achievement"
                ? selectedItem.title
                : ""}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
              {selectedItem?.type === "education"
                ? selectedItem.degree
                : selectedItem?.type === "achievement"
                ? selectedItem.organization
                : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            {selectedItem?.type === "education" ? (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedItem.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedItem.location}</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
                    GPA: {selectedItem.gpa}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedItem.detailedDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Key Courses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.courses.map((course, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedItem.imageUrl && (
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                      Certificate
                    </h4>
                    <div className="border bg-white border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="relative w-full h-64">
                        <Image
                          src={selectedItem.imageUrl}
                          alt={selectedItem.degree}
                          fill
                          className="object-contain"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9kfa+400h6SL9OwVR0Y9KRVhiUfvJZwqW5iMRBfT//2Q=="
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : selectedItem?.type === "achievement" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedItem.year}</span>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedItem.detailedDescription}
                  </p>
                </div>

                {selectedItem.technologies && (
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.imageUrl && (
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                      Certificate
                    </h4>
                    <div className="border bg-white border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="relative w-full h-64">
                        <Image
                          src={selectedItem.imageUrl}
                          alt={selectedItem.title}
                          fill
                          className="object-contain"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9kfa+400h6SL9OwVR0Y9KRVhiUfvJZwqW5iMRBfT//2Q=="
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
