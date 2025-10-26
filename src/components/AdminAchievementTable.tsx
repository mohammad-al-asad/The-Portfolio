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
import { achievements } from "../../generated/prisma";
import AdminTableSkeleton from "./AdminTableSkeleton";

function AdminAchievementTable({
  achievements,
  handleEdit,
  handleDelete,
  loading,
}: {
  achievements: achievements[];
  handleDelete: (id: string) => void;
  handleEdit: (achievement: achievements) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <AdminTableSkeleton title="Achievements List">
        <TableHead>Title</TableHead>
        <TableHead>Organization</TableHead>
        <TableHead>Year</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Technologies</TableHead>
        <TableHead>Actions</TableHead>
      </AdminTableSkeleton>
    );
  }
  return (
    <Card className="mt-[10%] md:mt-[3%]">
      <CardHeader>
        <CardTitle>Achievements List</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No achievements found. Add your first achievement!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell className="font-medium">
                    {achievement.title}
                  </TableCell>
                  <TableCell>{achievement.organization}</TableCell>
                  <TableCell>{achievement.year}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {achievement.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {achievement.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(achievement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(achievement.id!)}
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

export default AdminAchievementTable;
