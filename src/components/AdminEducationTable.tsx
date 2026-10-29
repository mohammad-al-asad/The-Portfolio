import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { educations } from "../../generated/prisma";
import AdminTableSkeleton from "./AdminTableSkeleton";
import AdminChipList from "./AdminChipList";

function AdminEducationTable({
  educations,
  handleEdit,
  handleDelete,
  loading,
}: {
  educations: educations[];
  handleDelete: (id: string) => void;
  handleEdit: (education: educations) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <AdminTableSkeleton title="Educations List">
        <TableHead>Institution</TableHead>
        <TableHead>Degree</TableHead>
        <TableHead>Period</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>GPA</TableHead>
        <TableHead>Courses</TableHead>
        <TableHead>Featured</TableHead>
        <TableHead>Actions</TableHead>
      </AdminTableSkeleton>
    );
  }
  return (
    <Card className="mt-[10%] md:mt-[3%]">
      <CardHeader>
        <CardTitle>Educations List</CardTitle>
      </CardHeader>
      <CardContent>
        {!loading && educations.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No educations found. Add your first education!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead className="hidden md:table-cell">Degree</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="hidden xl:table-cell">Location</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Featured</TableHead>
        <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educations.map((education) => (
                <TableRow key={education.id}>
                  <TableCell className="font-medium max-w-[13rem] truncate" title={education.institution}>
                    {education.institution}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[14rem] truncate" title={education.degree}>
                    {education.degree}
                  </TableCell>
                  <TableCell>{education.period}</TableCell>
                  <TableCell className="hidden xl:table-cell max-w-[9rem] truncate" title={education.location}>
                    {education.location}
                  </TableCell>
                  <TableCell>{education.gpa || "-"}</TableCell>
                  <TableCell>
                    <AdminChipList items={education.courses} />
                  </TableCell>
                  <TableCell>
                    {education.featured ? (
                      <Badge variant="default">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Hidden</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(education)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(education.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminEducationTable;
