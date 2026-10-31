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
import { projects } from "../../generated/prisma";
import AdminTableSkeleton from "./AdminTableSkeleton";
import AdminChipList from "./AdminChipList";

function AdminProjectTable({
  projects,
  handleEdit,
  handleDelete,
  loading,
}: {
  projects: projects[];
  handleDelete: (id: string) => void;
  handleEdit: (project: projects) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <AdminTableSkeleton title="Projects List">
        <TableHead>Title</TableHead>
        <TableHead className="hidden lg:table-cell">Description</TableHead>
        <TableHead className="hidden sm:table-cell">Tags</TableHead>
        <TableHead>Featured</TableHead>
        <TableHead>Actions</TableHead>
      </AdminTableSkeleton>
    );
  }

  return (
    <Card className="mt-[10%] md:mt-[3%]">
      <CardHeader>
        <CardTitle>Projects List</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No projects found. Add your first project!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden lg:table-cell">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Tags</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium max-w-[10rem] sm:max-w-[12rem] lg:max-w-[14rem] truncate" title={project.title}>
                    {project.title}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[16rem] xl:max-w-[20rem] truncate" title={project.description}>
                    {project.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <AdminChipList items={project.tags} />
                  </TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Badge variant="default">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Regular</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(project.id!)}
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

export default AdminProjectTable;
