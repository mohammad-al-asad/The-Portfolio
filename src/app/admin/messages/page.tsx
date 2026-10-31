"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import moment from "moment";
import {
  ArrowLeft,
  Copy,
  Inbox,
  Mail,
  MailOpen,
  RefreshCw,
  Reply,
  Search,
  Trash2,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageAvatar, { type ContactMessage } from "@/components/MessageAvatar";
import { MessageRowSkeleton } from "@/components/CardSkeletons";
import MessagesLocked from "@/components/MessagesLocked";
import { cn } from "@/lib/utils";

type Filter = "all" | "unread";

export default function AdminMessagesPage() {
  const { status } = useSession();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (status === "loading") return;
    // Only the admin can read messages
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    // Open a specific message when linked from the dashboard
    const id = new URLSearchParams(window.location.search).get("id");
    fetchMessages().then((data) => {
      if (id && data.some((m) => m.id === id)) select(id, data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchMessages = async (): Promise<ContactMessage[]> => {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data: ContactMessage[] = await res.json();
      setMessages(data);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Couldn't load messages");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  const setRead = async (id: string, read: boolean) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
    const res = await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    if (!res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !read } : m))
      );
      toast.error("Couldn't update message");
    }
  };

  // Reading, marking read and deleting all need the admin login
  const canEdit = status === "authenticated";
  const locked = status === "unauthenticated";

  const select = (id: string | null, list = messages) => {
    setSelectedId(id);
    window.history.replaceState(
      null,
      "",
      id ? `/admin/messages?id=${id}` : "/admin/messages"
    );
    const msg = list.find((m) => m.id === id);
    if (canEdit && msg && !msg.read) setRead(msg.id, true);
  };

  const remove = async (msg: ContactMessage) => {
    if (!confirm(`Delete the message from ${msg.name}? This can't be undone.`))
      return;
    const res = await fetch(`/api/contact/${msg.id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      select(null);
      toast.success("Message deleted");
    } else {
      toast.error("Couldn't delete message");
    }
  };

  const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email);
    toast.success("Email copied");
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter(
      (m) =>
        (filter === "all" || !m.read) &&
        (!q ||
          [m.name, m.email, m.subject, m.message].some((f) =>
            f.toLowerCase().includes(q)
          ))
    );
  }, [messages, query, filter]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  return (
    <div className="page-container">
      <PageHeader>
        <div className="flex items-center justify-between gap-4 md:px-16 px-6 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-blue-500/10 dark:to-purple-600/10 border border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold">Messages</h1>
            {unreadCount > 0 && (
              <Badge className="bg-blue-600 text-white">{unreadCount} unread</Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={refreshing || loading || locked}
          >
            <RefreshCw
              className={cn("h-4 w-4", refreshing && "animate-spin")}
            />
            <span className="hidden md:inline">Refresh</span>
          </Button>
        </div>
      </PageHeader>

      {/* Fixed-height box: fits the viewport (layout top padding 5rem / 10rem + mt-8 + pb-24 = 13rem / 18rem); only the panes inside scroll */}
      {locked ? (
        <div className="mt-8 rounded-xl border bg-card shadow-sm h-[calc(100dvh-13rem)] md:h-[calc(100dvh-18rem)] min-h-[24rem]">
          <MessagesLocked />
        </div>
      ) : (
      <div className="mt-8 rounded-xl border bg-card shadow-sm overflow-hidden grid grid-cols-1 grid-rows-[minmax(0,1fr)] lg:grid-cols-[24rem_1fr] h-[calc(100dvh-13rem)] md:h-[calc(100dvh-18rem)] min-h-[24rem]">
        {/* List pane */}
        <section
          className={cn(
            "flex flex-col min-h-0 min-w-0 lg:border-r",
            selected && "hidden lg:flex"
          )}
        >
          <div className="p-3 space-y-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages"
                className="pl-9"
              />
            </div>
            <div className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
              {(["all", "unread"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 font-medium transition-colors cursor-pointer",
                    filter === f
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f === "all" ? `All (${messages.length})` : `Unread (${unreadCount})`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="divide-y" aria-busy="true">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <MessageRowSkeleton key={i} />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16 px-6 text-center text-muted-foreground">
                <Inbox className="h-8 w-8" />
                <p className="text-sm">
                  {messages.length === 0
                    ? "No messages yet. They'll appear here when someone uses the contact form."
                    : "No messages match."}
                </p>
              </div>
            ) : (
              <ul className="divide-y">
                {visible.map((msg) => (
                  <li key={msg.id}>
                    <button
                      type="button"
                      onClick={() => select(msg.id)}
                      className={cn(
                        "w-full text-left flex gap-3 px-4 py-3.5 transition-colors cursor-pointer hover:bg-muted/60",
                        selectedId === msg.id && "bg-muted"
                      )}
                    >
                      <MessageAvatar name={msg.name} email={msg.email} />
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
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Reading pane */}
        <section
          className={cn("flex flex-col min-h-0 min-w-0", !selected && "hidden lg:flex")}
        >
          {selected ? (
            <>
              <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => select(null)}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                {canEdit && (
                <div className="ml-auto flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRead(selected.id, !selected.read)}
                  >
                    {selected.read ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <MailOpen className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">
                      {selected.read ? "Mark unread" : "Mark read"}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-600 hover:bg-red-500/10"
                    onClick={() => remove(selected)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold break-words">
                  {selected.subject}
                </h2>

                <div className="mt-5 flex items-start gap-3">
                  <MessageAvatar
                    name={selected.name}
                    email={selected.email}
                    className="h-11 w-11"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{selected.name}</p>
                    <button
                      type="button"
                      onClick={() => copyEmail(selected.email)}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Copy email"
                    >
                      <span className="truncate">{selected.email}</span>
                      <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                  <time
                    dateTime={selected.createdAt}
                    className="shrink-0 text-xs text-muted-foreground text-right"
                  >
                    {moment(selected.createdAt).format("MMM D, YYYY")}
                    <br />
                    {moment(selected.createdAt).format("h:mm A")}
                  </time>
                </div>

                <div className="mt-6 rounded-lg bg-muted/50 p-5 text-sm leading-relaxed whitespace-pre-line break-words">
                  {selected.message}
                </div>

                <Button asChild className="mt-6">
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(
                      `Re: ${selected.subject}`
                    )}`}
                  >
                    <Reply className="h-4 w-4" /> Reply by email
                  </a>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-10 w-10" />
              <p className="text-sm">Select a message to read it</p>
            </div>
          )}
        </section>
      </div>
      )}
    </div>
  );
}
