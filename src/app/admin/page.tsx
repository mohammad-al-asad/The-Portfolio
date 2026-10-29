"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Briefcase,
  Users,
  Settings,
  Plus,
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
import MessageAvatar, { type ContactMessage } from "@/components/MessageAvatar";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

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
      setUnreadCount(data.filter((m) => !m.read).length);
      setMessages(data.slice(0, 5));
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
      change: `${unreadCount} unread`,
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
                  {stat.title === "Messages"
                    ? stat.change
                    : `${stat.change} from last month`}
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

        {/* Recent Messages */}
        <Card className="border border-gray-700 gap-0 py-0 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b py-4">
            <div className="flex items-center gap-2">
              <CardTitle>Recent Messages</CardTitle>
              {unreadCount > 0 && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                  {unreadCount} new
                </span>
              )}
            </div>
            <Link
              href="/admin/messages"
              className="text-sm text-blue-500 hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="px-0">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                <Mail className="h-7 w-7" />
                <p className="text-sm">No messages yet.</p>
              </div>
            ) : (
              <ul className="divide-y">
                {messages.map((msg) => (
                  <li key={msg.id}>
                    <Link
                      href={`/admin/messages?id=${msg.id}`}
                      className="flex gap-3 px-5 py-3.5 hover:bg-muted/60 transition-colors"
                    >
                      <MessageAvatar
                        name={msg.name}
                        email={msg.email}
                        className="h-9 w-9 text-xs"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className={cn(
                              "truncate text-sm",
                              msg.read ? "font-medium" : "font-semibold"
                            )}
                          >
                            {msg.name}
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {moment(msg.createdAt).fromNow(true)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p
                            className={cn(
                              "truncate text-sm",
                              msg.read ? "text-muted-foreground" : "text-foreground"
                            )}
                          >
                            {msg.subject}
                          </p>
                          {!msg.read && (
                            <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="truncate text-xs text-muted-foreground mt-0.5">
                          {msg.message}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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
