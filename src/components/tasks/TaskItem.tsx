
import React from "react";
import { Task } from "@/types";
import { useTasks } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleStatusChange = async () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    setDeleteDialogOpen(false);
  };

  const formatDueDate = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Set hours to 0 to compare just the date
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Format the date string
    const formattedDate = format(dueDate, "MMM d, yyyy");
    
    // Add additional info based on how soon it is
    if (diffDays < 0) {
      return `${formattedDate} (Overdue)`;
    } else if (diffDays === 0) {
      return `${formattedDate} (Today)`;
    } else if (diffDays === 1) {
      return `${formattedDate} (Tomorrow)`;
    }
    
    return formattedDate;
  };

  return (
    <>
      <Card className={cn(
        "mb-3 animate-fade-in transition-all",
        task.status === "completed" && "opacity-75"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.status === "completed"}
                onCheckedChange={handleStatusChange}
                className="h-5 w-5"
              />
              <CardTitle className={cn(
                "text-lg",
                task.status === "completed" && "line-through text-muted-foreground"
              )}>
                {task.title}
              </CardTitle>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                <Edit size={18} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {task.description && (
          <CardContent className="py-2">
            <CardDescription className="whitespace-pre-wrap">
              {task.description}
            </CardDescription>
          </CardContent>
        )}
        
        <CardFooter className="pt-2 pb-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDueDate(task.dueDate)}
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskItem;
