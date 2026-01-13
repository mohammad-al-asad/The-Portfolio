"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Briefcase,
  Users,
  Settings,
  Plus,
  CircleUser,
  GraduationCap,
} from "lucide-react";
import Chart from "@/components/Chart";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { EdgestoreCVUploader } from "@/components/EdgeStoreResumeUploader";
import { useEdgeStore } from "@/lib/edgestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messageCount, setMessageCount] = useState(0);

  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();
  const router = useRouter();

  // ---------------- Resume ----------------
  async function fetchResume() {
    const res = await fetch("/api/resume");
    const resume = await res.json();
    setResumeUrl(resume.resumeUrl);
  }

  useEffect(() => {
    fetchResume();
  }, []);

  const removeResume = async () => {
    if (!session) return router.push("/admin/login");
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await edgestore.resumeFiles.delete({ url: resumeUrl });
      await fetch("/api/resume", {
        method: "DELETE",
        body: JSON.stringify({ resumeUrl }),
      });
      setResumeUrl("");
    } catch (err) {
      console.error("Error deleting resume:", err);
    }
  };

  // ---------------- Messages ----------------
  async function fetchMessages() {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) return;

      const data: ContactMessage[] = await res.json();
      setMessageCount(data.length);
      setMessages(data.slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // ---------------- Stats ----------------
  const stats = [
    {
      title: "Total Visitors",
      value: "24.5K",
      icon: <Users className="h-6 w-6" />,
      change: "+12%",
    },
    {
      title: "Projects",
      value: "15",
      icon: <Briefcase className="h-6 w-6" />,
      change: "+2",
      link: "/admin/projects",
    },
    {
      title: "Achievement",
      value: "5",
      icon: <GraduationCap className="h-6 w-6" />,
      change: "+1",
    },
    {
      title: "Messages",
      value: messageCount.toString(),
      icon: <Mail className="h-6 w-6" />,
      change: `+${messages.length}`,
      link: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader>
        <div className="flex md:px-16 px-6 py-3.5 justify-between items-center bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Settings size={23} />
            Dashboard
          </h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">Upload</span> Resume
          </Button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[10%] md:mt-[3%]">
        {stats.map((stat, index) => (
          <Link href={stat.link || "#"} key={index}>
            <Card className="border border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts + Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-gray-700">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart />
          </CardContent>
        </Card>

        {/* Modern Messages */}
        <Card className="border border-gray-700">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Recent Messages</CardTitle>
            <Link
              href="/admin/messages"
              className="text-sm text-blue-500 hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <hr />
          <CardContent className="px-2">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="group flex gap-4 rounded-lg border border-gray-700  p-4 hover:shadow-md transition-all"
                  >
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{msg.name}</h4>
                        <span className="text-xs text-gray-500">
                          {moment(msg.createdAt).fromNow()}
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle>Upload Your Resume</DialogTitle>
            <DialogDescription>
              Choose a PDF file of your resume
            </DialogDescription>
          </DialogHeader>
          <EdgestoreCVUploader
            value={resumeUrl}
            onRemove={removeResume}
            onChange={(url) => setResumeUrl(url)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
