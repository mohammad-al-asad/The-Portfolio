import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

export default function AdminTableSkeleton({children,title}:{children:ReactNode,title:string}) {
  const skeletonRows = Array(5).fill(null); // show 5 skeleton rows

  return (
    <Card className="mt-[10%] md:mt-[3%] animate-pulse">
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {children}
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
