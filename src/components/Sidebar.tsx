import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Folder,
  Mail,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Projects', path: '/admin/projects', icon: <Folder size={18} /> },
    { name: 'Messages', path: '/admin/messages', icon: <Mail size={18} /> },
    { name: 'Profile', path: '/admin/profile', icon: <User size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg" />
          <div>
            <h2 className="font-bold">Admin Panel</h2>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={pathname === item.path ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3"
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3"
          onClick={() => signOut()}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;