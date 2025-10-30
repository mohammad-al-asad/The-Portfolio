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
                <TableHead>Degree</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educations.map((education) => (
                <TableRow key={education.id}>
                  <TableCell className="font-medium">
                    {education.institution}
                  </TableCell>
                  <TableCell>{education.degree}</TableCell>
                  <TableCell>{education.period}</TableCell>
                  <TableCell>{education.location}</TableCell>
                  <TableCell>{education.gpa || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {education.courses.map((course, index) => {
                        if (index == 2) {
                          return (
                            <Badge key={index} variant="secondary">
                              {`+${education.courses.length - 3} more`}
                            </Badge>
                          );
                        } else if (index > 2) {
                          return null;
                        } else {
                          return (
                            <Badge key={index} variant="secondary">
                              {course}
                            </Badge>
                          );
                        }
                      })}
                    </div>
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
