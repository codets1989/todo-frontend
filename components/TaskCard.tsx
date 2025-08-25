"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import ColorDot from "./ColorDot";
import type { Task } from "@/types/task";
import { toggleTask, deleteTask } from "@/lib/api";
import { TrashIcon } from '@heroicons/react/24/solid';
interface Props {
  task: Task;
  onChanged?: () => void;
}

export default function TaskCard({ task, onChanged }: Props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function onToggle() {
    setLoading(true);
    try {
      await toggleTask(task.id, !task.completed);
      onChanged?.();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try {
      await deleteTask(task.id);
      onChanged?.();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <div className={clsx("card p-4 flex items-center gap-3 border border-black rounded-md hover:shadow transition", task.completed && "opacity-80")}>
        <button
          aria-label="Toggle completed"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
          className={clsx("btn btn-ghost border border-slate-200", task.completed && "bg-green-50")}
          disabled={loading}
        >
          <input type="checkbox" checked={task.completed} readOnly className="mr-2" />
          {task.completed ? "Done" : "Todo"}
        </button>
        <ColorDot color={task.color} />
        <div className="flex-1">
          <div className={clsx("font-medium text-xl", task.completed && "line-through text-slate-400")}>{task.title}</div>
    
        </div>
        <button
          onClick={onDelete}
          className="btn text-red-600 hover:bg-red-50"
          disabled={loading}
          aria-label="Delete task"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </Link>
  );
}
