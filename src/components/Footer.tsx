"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MapPin } from "lucide-react";
import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      alert("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

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
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-3 hover:scale-110 transition"
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
            <div className="bg-white dark:bg-gray-800/50 border rounded-xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-6">
                Send me a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    placeholder="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />

                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="resize-none"
                />

                <Button
                  type="submit"
                  variant="outline"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mohammad Al Asad</p>
          <p>Crafted with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
