import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import KanbanBoard from "./kanban/KanbanBoard";
import TaskCreationModal from "./task/TaskCreationModal";
import TeamPanel from "./collaboration/TeamPanel";
import AIChatAssistant from "./ai/AIChatAssistant";
import MetricsPanel from "./metrics/MetricsPanel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HomeProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Home = ({ isDarkMode = false, onThemeToggle = () => {} }: HomeProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <Sidebar
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        className="flex-shrink-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Task Dashboard</h1>
            <Button
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>

          {/* Metrics Panel */}
          <div className="mb-6">
            <MetricsPanel />
          </div>

          {/* Kanban Board */}
          <div className="flex-1">
            <KanbanBoard />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Team Panel */}
      <TeamPanel className="flex-shrink-0" />

      {/* Floating AI Chat Assistant */}
      <AIChatAssistant
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Task Creation Modal */}
      <TaskCreationModal
        open={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        onSubmit={(data) => {
          console.log("Task created:", data);
          setIsTaskModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
