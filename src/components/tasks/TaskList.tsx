
import React, { useState, useEffect } from "react";
import { useTasks } from "@/context/TaskContext";
import TaskItem from "./TaskItem";
import { Task } from "@/types";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";

const TaskList: React.FC = () => {
  const { filterTasks } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const status = activeTab === "all" ? undefined : activeTab;
    setFilteredTasks(filterTasks(status, searchTerm));
  }, [filterTasks, activeTab, searchTerm]);

  const handleCreateClick = () => {
    setEditTask(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setEditTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditTask(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No matching tasks found" : "No tasks yet. Create your first task!"}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEditClick} />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No matching pending tasks found" : "No pending tasks"}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEditClick} />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No matching completed tasks found" : "No completed tasks"}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEditClick} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {isFormOpen && (
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          initialData={editTask || {}}
          mode={editTask ? "edit" : "create"}
        />
      )}
    </div>
  );
};

export default TaskList;
