import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Crafting{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Digital Experiences
          </span>{" "}
          That Inspire
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Full-stack developer specializing in building modern, responsive web
          applications with cutting-edge technologies.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="text-lg hover:text-white text-background bg-foreground dark:bg-foreground hover:bg-accent-foreground dark:hover:bg-muted-foreground dark:hover:text-black dark:border-input hover:border-muted-foreground"
          >
            <Link href="/projects" className="flex items-center">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg">
            Download CV <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl filter opacity-30" />
        <div className="relative mx-auto border border-gray-800 rounded-2xl overflow-hidden max-w-4xl">
          <div className="dark:bg-gray-800 bg-gray-100 h-6 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-gray-800/50 border border-gray-700 rounded-lg p-4 ${
                    i >= 4 ? "hidden md:block" : ""
                  }`}
                >
                  <div className="h-4 w-16 bg-gray-700 rounded mb-3"></div>
                  <div className="h-3 w-full bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 w-4/5 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
