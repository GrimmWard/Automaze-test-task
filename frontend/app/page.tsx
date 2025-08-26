"use client"

import { AddTaskButton } from "@/components/AddTaskButton";
import { Task } from "@/components/Task";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "@/hooks/useTasks";
import { TaskType } from "@/types";


export default function Home() {

  const { filteredTasks, searchQuery, setSearchQuery, loading, error, setTasks, handleToggleDone, handleDelete, setStatusFilter, setSortOrder } = useTasks();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 flex-col">
      <div className="relative w-3xl h-40 rounded-md mb-3 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-6xl font-bold text-white">
          TODO App
        </h1>
      </div>

      <Card className="w-3xl flex flex-col gap-3 space-y-4 p-6 shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-4xl font-bold">Tasks</CardTitle>
          <CardAction>
            <AddTaskButton onAdd={(task) => setTasks(prev => [...prev, task])} />
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select onValueChange={(val) => setStatusFilter(val as "all" | "done" | "undone")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(val) => setSortOrder(val as "asc" | "desc")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">ASC</SelectItem>
                <SelectItem value="desc">DESC</SelectItem>
              </SelectContent>
            </Select>

          </div>



          {loading && <p className="text-gray-500">Loading tasks...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && filteredTasks.length === 0 && (
            <p className="text-gray-500">No tasks found. Add one!</p>
          )}


          {
            filteredTasks.map((task: TaskType) => (
              <Task
                key={task.id}
                {...task}
                onToggleDone={handleToggleDone}
                onDelete={handleDelete}
              />
            ))}

        </CardContent>


        {/* <CardFooter>
          <p>Card Footer</p>
          TODO: Maybe add pagination here
        </CardFooter> */}
      </Card>
    </div>
  );
}
