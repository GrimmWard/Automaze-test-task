import { addTask } from "@/api/tasks"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskType } from "@/types"
import { toast } from "sonner"

export function AddTaskButton({ onAdd }: { onAdd: (task: TaskType) => void }) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim()
    const priorityStr = formData.get("priority")?.toString().trim()
    const priority = Number(priorityStr)

    if (!title) {
      toast.error("Title cannot be empty")
      return
    }

    if (!priorityStr || isNaN(priority)) {
      toast.error("Priority must be a number")
      return
    }

    if (priority < 0 || priority === 0 || priority > 10) {
      toast.error("Priority must be between 1 and 10")
      return
    }


    try {
      const newTask = await addTask({ title: title as string, priority: Number(priority) });
      onAdd(newTask.task);
      toast.success("Task added!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer text-xl p-5">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Task Title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Input id="priority" name="priority" placeholder="1" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
