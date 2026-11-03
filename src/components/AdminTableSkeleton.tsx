import { Children, isValidElement, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const ROWS = 5;
// Bar widths cycled across the text columns so the placeholder doesn't look uniform
const WIDTHS = ["w-24", "w-40", "w-16", "w-28", "w-12", "w-32", "w-20"];

const Bar = ({ className }: { className: string }) => (
  <div className={`h-4 rounded bg-gray-200 dark:bg-gray-700 ${className}`} />
);

// Placeholder table for the admin lists. It draws one cell per header passed in,
// copying each header's className, so the columns (and which ones hide on small
// screens) always match the real table. The last column is the action buttons.
export default function AdminTableSkeleton({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const headers = Children.toArray(children).filter(isValidElement) as React.ReactElement<{
    className?: string;
  }>[];

  return (
    <Card className="md:mt-[3%] animate-pulse">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {/* Placeholder only: clip instead of showing a horizontal scrollbar on small screens */}
      <CardContent className="[&_[data-slot=table-container]]:overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>{children}</TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: ROWS }, (_, row) => (
              <TableRow key={row}>
                {headers.map((header, col) => (
                  <TableCell key={col} className={header.props.className}>
                    {col === headers.length - 1 ? (
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700" />
                      </div>
                    ) : (
                      <Bar className={WIDTHS[(col + row) % WIDTHS.length]} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
