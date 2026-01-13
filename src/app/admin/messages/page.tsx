"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail } from "lucide-react";
import moment from "moment";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const { status } = useSession();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    fetchMessages();
  }, [status]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <PageHeader>
        <div className="flex items-center justify-between md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold">
            Contact Messages
          </h1>
          <Badge variant="secondary" className="flex gap-1 items-center">
            <Mail className="h-4 w-4" />
            {messages.length}
          </Badge>
        </div>
      </PageHeader>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No messages received yet.
        </p>
      ) : (
        <div className="mt-6 space-y-5 md:px-16 px-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="group rounded-xl border border-gray-700 bg-card p-5 hover:shadow-lg transition-all"
            >
              {/* Top Row */}
              <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="h-11 w-11 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Meta */}
                  <div>
                    <h3 className="font-semibold text-base">
                      {msg.subject}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {msg.name} • {msg.email}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  {moment(msg.createdAt).fromNow()}
                </span>
              </div>

              {/* Message */}
              <p className="mt-4 text-sm text-black dark:text-white leading-relaxed whitespace-pre-line">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
