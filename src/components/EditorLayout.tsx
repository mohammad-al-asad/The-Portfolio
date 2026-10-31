"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";

// Shared shell for the admin create/edit screens. Render it inside the <form>
// so the header Save button submits the form.
export default function EditorLayout({
  title,
  backHref,
  saving,
  saveLabel,
  sidebar,
  children,
}: {
  title: string;
  backHref: string;
  saving: boolean;
  saveLabel: string;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="page-container">
      <PageHeader>
        <div className="flex items-center justify-between gap-4 md:px-16 px-4 py-3.5 bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="shrink-0 border-gray-300 dark:border-gray-600"
            >
              <Link href={backHref} aria-label="Back">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              asChild
              type="button"
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              <Link href={backHref}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span className="hidden md:inline">
                {saving ? "Saving..." : saveLabel}
              </span>
            </Button>
          </div>
        </div>
      </PageHeader>

      <div
        className={`mt-[10%] md:mt-[3%] grid grid-cols-1 gap-6 items-start ${
          sidebar ? "lg:grid-cols-3" : "max-w-4xl mx-auto"
        }`}
      >
        <div className={`space-y-6 ${sidebar ? "lg:col-span-2" : ""}`}>
          {children}
        </div>
        {sidebar && (
          <aside className="space-y-6 lg:sticky lg:top-28">{sidebar}</aside>
        )}
      </div>
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}
