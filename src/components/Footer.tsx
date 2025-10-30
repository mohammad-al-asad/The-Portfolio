import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, MapPin } from 'lucide-react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/mohammad-al-asad",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/in/mohammad-al-asad",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter />,
      href: "https://x.com/maasad11914",
      label: "Twitter",
    },
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/maasad11914",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/maasad11914",
      label: "Instagram",
    },
  ];

  return (
    <footer id='contact' className="bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to bring your ideas to life? Let&apos;s discuss how we can work together to create something amazing.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mr-4">
                  <Mail className="text-foreground h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                  <a 
                    href="mailto:maasad11914@gmail.com" 
                    className="dark:text-white hover:text-blue-500 transition-colors duration-300"
                  >
                    maasad11914@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mr-4">
                  <MapPin className="text-foreground h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Location</p>
                  <p className="dark:text-white">Feni, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Follow me</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-3 text-gray-600 dark:text-gray-400 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">Send me a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="Your Name"
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Your Email"
                      type="email"
                      className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                </div>
                <div>
                  <Input 
                    placeholder="Subject"
                    className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message"
                    rows={5}
                    className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-blue-500 transition-colors duration-300 resize-none"
                  />
                </div>
                <Button variant='outline' className="w-full transition-all duration-300 transform hover:scale-105">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Mohammad Al Asad. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">
              Crafted with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}