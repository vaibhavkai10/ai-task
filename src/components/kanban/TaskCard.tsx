import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, MoreVertical, MessageSquare } from "lucide-react";

interface TaskCardProps {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: "todo" | "in-progress" | "completed";
  assignee?: {
    name: string;
    avatar: string;
  };
  commentsCount?: number;
  priority?: "low" | "medium" | "high";
}

const TaskCard = ({
  title = "Example Task",
  description = "This is a sample task description that shows how the card will look with content.",
  dueDate = "2024-04-01",
  status = "todo",
  assignee = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  commentsCount = 3,
  priority = "medium",
}: TaskCardProps) => {
  const statusColors = {
    todo: "bg-slate-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
  };

  const priorityColors = {
    low: "bg-gray-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <Card className="w-[280px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-move">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={`${statusColors[status]} text-white`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-6 w-6">
                    <img
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{assignee.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center text-gray-500">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-xs">{commentsCount}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`h-2 w-2 rounded-full ${priorityColors[priority]}`}
              title={`Priority: ${priority}`}
            />
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs">{dueDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
