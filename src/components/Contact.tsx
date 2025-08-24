import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact">
      <SectionHeader
        title="Get In Touch"
        subtitle="Have something in mind? Let's talk"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mr-4">
                <Mail className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="dark:text-white">maasad11914@gmail.com.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400">Location</p>
                <p>Feni, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                placeholder="Your Name"
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              />
              <Input 
                placeholder="Your Email"
                type="email"
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              />
            </div>
            <Input 
              placeholder="Subject"
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
            <Textarea 
              placeholder="Your Message"
              rows={5}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
            <Button className="w-full">
              Send Message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}