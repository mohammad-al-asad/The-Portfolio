"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Mail,
  Briefcase,
  Users,
  Settings,
  Plus,
  CircleUser,
} from "lucide-react";
// import { useSession } from "next-auth/react";
import Chart from "@/components/Chart";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function AdminDashboard() {
  // const { data: session } = useSession();

  // if (!session) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
  //         <p>Please login to access the admin panel</p>
  //       </div>
  //     </div>
  //   );
  // }

  const stats = [
    {
      title: "Total Visitors",
      value: "24.5K",
      icon: <Users className="h-6 w-6" />,
      change: "+12%",
    },
    {
      title: "Projects",
      value: "15",
      icon: <Briefcase className="h-6 w-6" />,
      change: "+2",
      link: "/admin/projects",
    },
    {
      title: "Messages",
      value: "42",
      icon: <Mail className="h-6 w-6" />,
      change: "+5",
      link: "/admin/messages",
    },
    {
      title: "Engagement",
      value: "78%",
      icon: <Activity className="h-6 w-6" />,
      change: "+4%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header - With Gradient Accent */}
      <PageHeader>
        <div className="flex md:px-16 px-6 py-3.5 justify-between items-center bg-gradient-to-r from-blue-400/15 to-purple-600/15 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold flex justify-center items-center gap-2 md:gap-2.5">
            <Settings size={23} />
            Dashboard
          </h1>
          <Button>
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">Upload</span> New Resume
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[10%] md:mt-[3%]">
        {stats.map((stat, index) => (
          <Link href={stat.link || "#"} key={index}>
            <Card className="border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-gray-700">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart />
          </CardContent>
        </Card>

        <Card className="border border-gray-700">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-background border-2 border-dashed rounded-full">
                    <CircleUser className="text-foreground w-8 h-8" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      Interested in your services for a new project...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
