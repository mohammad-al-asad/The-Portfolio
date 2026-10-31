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
import AdminChipList from "./AdminChipList";

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
        <TableHead className="hidden lg:table-cell">Organization</TableHead>
        <TableHead className="hidden sm:table-cell">Year</TableHead>
        <TableHead className="hidden xl:table-cell">Description</TableHead>
        <TableHead className="hidden md:table-cell">Skills</TableHead>
        <TableHead>Featured</TableHead>
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
                <TableHead className="hidden lg:table-cell">Organization</TableHead>
                <TableHead className="hidden sm:table-cell">Year</TableHead>
                <TableHead className="hidden xl:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Skills</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell className="font-medium max-w-[10rem] sm:max-w-[12rem] lg:max-w-[13rem] truncate" title={achievement.title}>
                    {achievement.title}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[11rem] truncate" title={achievement.organization}>
                    {achievement.organization}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{achievement.year}</TableCell>
                  <TableCell className="hidden xl:table-cell max-w-[14rem] truncate" title={achievement.description}>
                    {achievement.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <AdminChipList items={achievement.technologies} />
                  </TableCell>
                  <TableCell>
                    {achievement.featured ? (
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
