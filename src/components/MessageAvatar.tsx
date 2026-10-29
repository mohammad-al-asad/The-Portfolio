import { cn } from "@/lib/utils";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean | null;
  createdAt: string;
};

const GRADIENTS = [
  "from-blue-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
  "from-fuchsia-500 to-indigo-500",
  "from-sky-500 to-cyan-500",
  "from-rose-500 to-red-500",
];

// Same sender always gets the same colour
function gradientFor(seed: string) {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (
    (parts[0]?.[0] ?? "?") + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
}

export default function MessageAvatar({
  name,
  email,
  className,
}: {
  name: string;
  email: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br text-white text-sm font-semibold",
        gradientFor(email || name),
        className
      )}
    >
      {initials(name)}
    </div>
  );
}
