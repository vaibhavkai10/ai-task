import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Sidebar = ({
  className,
  user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  isDarkMode = false,
  onThemeToggle = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full w-[280px] bg-white border-r border-gray-200 p-4",
        className,
      )}
    >
      {/* User Profile Section */}
      <div className="flex items-center space-x-3 mb-8 p-2">
        <Avatar className="h-10 w-10">
          <img src={user.avatar} alt={user.name} className="object-cover" />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <TooltipProvider key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3"
          onClick={onThemeToggle}
        >
          {isDarkMode ? (
            <>
              <Sun className="h-5 w-5" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
