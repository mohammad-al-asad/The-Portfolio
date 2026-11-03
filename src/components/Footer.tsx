import { Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
import { SOCIAL_LINKS } from "@/lib/socials";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-background border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to bring your ideas to life? Let&apos;s discuss how we can
              work together.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-800 border rounded-lg p-3 mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href="mailto:maasad11914@gmail.com"
                    className="hover:text-blue-500"
                  >
                    maasad11914@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-800 border rounded-lg p-3 mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>Feni, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">Follow me</p>
              <div className="flex space-x-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-3 hover:scale-110 transition"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800/50 border rounded-xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-6">
                Send me a message
              </h3>

              <ContactForm />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between max-md:items-center max-md:text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mohammad Al Asad</p>
          <p>Crafted with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
