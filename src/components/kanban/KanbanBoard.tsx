import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  commentsCount: number;
  priority: "low" | "medium" | "high";
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  columns?: Column[];
  onDragEnd?: (result: any) => void;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Implement Authentication",
    description: "Set up user authentication flow using OAuth",
    status: "todo",
    dueDate: "2024-04-15",
    assignee: {
      name: "Alice Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    commentsCount: 2,
    priority: "high",
  },
  {
    id: "2",
    title: "Design Dashboard Layout",
    description: "Create wireframes for the main dashboard",
    status: "in-progress",
    dueDate: "2024-04-10",
    assignee: {
      name: "Bob Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    commentsCount: 5,
    priority: "medium",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Integrate backend APIs with frontend",
    status: "completed",
    dueDate: "2024-04-05",
    assignee: {
      name: "Charlie Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    },
    commentsCount: 3,
    priority: "low",
  },
];

const defaultColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: defaultTasks.filter((task) => task.status === "todo"),
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: defaultTasks.filter((task) => task.status === "in-progress"),
  },
  {
    id: "completed",
    title: "Completed",
    tasks: defaultTasks.filter((task) => task.status === "completed"),
  },
];

const KanbanBoard = ({
  columns = defaultColumns,
  onDragEnd = () => {},
}: KanbanBoardProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-[320px] rounded-lg p-4 ${snapshot.isDraggingOver ? "bg-gray-100" : "bg-gray-200"}`}
                >
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    {column.title} ({column.tasks.length})
                  </h2>
                  <div className="space-y-4">
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              title={task.title}
                              description={task.description}
                              status={task.status}
                              dueDate={task.dueDate}
                              assignee={task.assignee}
                              commentsCount={task.commentsCount}
                              priority={task.priority}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
