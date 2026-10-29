import { Badge } from "@/components/ui/badge";

// Compact badge list for admin tables: first few items, then "+N" (full list on hover)
export default function AdminChipList({
  items,
  max = 2,
}: {
  items: string[];
  max?: number;
}) {
  if (items.length === 0) return <span className="text-muted-foreground">-</span>;
  const rest = items.length - max;
  return (
    <div className="flex items-center gap-1" title={items.join(", ")}>
      {items.slice(0, max).map((item, i) => (
        <Badge key={i} variant="secondary" className="max-w-[8rem] truncate">
          {item}
        </Badge>
      ))}
      {rest > 0 && <Badge variant="outline">+{rest}</Badge>}
    </div>
  );
}
