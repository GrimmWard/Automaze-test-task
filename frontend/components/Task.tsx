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

export const Task = React.memo(function Task({
  id,
  title,
  priority,
  done,
  onDelete,
  onToggleDone,
}: TaskProps) {
  return (
    <div className="flex items-center gap-3 p-4 shadow-md rounded-md border border-gray-200">

      <Checkbox
        id={id}
        className="w-6 h-6 flex-shrink-0"
        checked={done}
        onCheckedChange={() => onToggleDone(id, !done)}
      />


      <Label
        htmlFor={id}
        className="flex-1 text-xl cursor-pointer whitespace-normal break-words min-w-0"
      >
        {title}
      </Label>


      <Label className="flex-shrink-0 mr-6">{priority}</Label>


      <Button
        variant="destructive"
        className="bg-red-400 flex-shrink-0"
        onClick={() => onDelete(id)}
      >
        <Trash color="white" /> Delete
      </Button>
    </div>
  );
});
