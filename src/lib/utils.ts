import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Icons from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getLucideIcon(iconName?: string) {
  if (!iconName) return null;
  const formattedName =
    iconName.charAt(0).toUpperCase() +
    iconName.slice(1).replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());

  const IconComponent = (Icons as unknown as Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  >)[formattedName];

  return IconComponent
    ? React.createElement(IconComponent, {
        className: "h-6 w-6 text-blue-500 dark:text-blue-400",
      })
    : null;
}
