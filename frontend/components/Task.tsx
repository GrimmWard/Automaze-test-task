import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@radix-ui/react-label'
import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { TaskType } from '@/types'

interface TaskProps extends TaskType {
  onDelete: (id: string) => void;
  onToggleDone: (id: string, done: boolean) => void;
}

export const Task = React.memo(function Task({ id, title, priority, done, onDelete, onToggleDone }: TaskProps) {
  return (
    <div className="flex items-center justify-between gap-3 p-4 shadow-md rounded-md border border-gray-200">
      <Checkbox
        id={id}
        className="w-6 h-6"
        checked={done}
        onCheckedChange={() => onToggleDone(id, !done)}
      />
      <Label htmlFor={id} className="text-xl">{title}</Label>
      <Label>{priority}</Label>
      <Button
        variant="destructive"
        className="bg-red-400"
        onClick={() => onDelete(id)}
      >
        <Trash color="white" /> Delete
      </Button>
    </div>
  );
}
)