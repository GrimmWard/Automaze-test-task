import { deleteTask, getAllTasks, updateTask } from "@/api/tasks";
import { TaskType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useTasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | "done" | "undone">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default"
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let filtered = [...tasks];

      if (searchQuery.trim()) {
        filtered = filtered.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (statusFilter === "done")
        filtered = filtered.filter((task) => task.done);
      if (statusFilter === "undone")
        filtered = filtered.filter((task) => !task.done);

      if (sortOrder === "asc") {
        filtered.sort((a, b) => a.priority - b.priority);
      } else if (sortOrder === "desc") {
        filtered.sort((a, b) => b.priority - a.priority);
      }

      setFilteredTasks(filtered);
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout);
  }, [tasks, searchQuery, statusFilter, sortOrder]);

  const handleToggleDone = async (id: string, done: boolean) => {
    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));

    try {
      await updateTask(id, done);
      toast.success(done ? "Task completed!" : "Task marked as not done");
    } catch (error) {
      // Revert optimistic update on error
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !done } : t))
      );
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return {
    filteredTasks,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleToggleDone,
    handleDelete,
    setTasks,
    setStatusFilter,
    statusFilter,
    setSortOrder,
    sortOrder,
  };
}
