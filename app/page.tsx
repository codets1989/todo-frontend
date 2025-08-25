"use client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { getTasks } from "@/lib/api";
import type { Task } from "@/types/task";
import TaskCard from "@/components/TaskCard";

const fetcher = async () => await getTasks();

export default function HomePage() {
  const { data, error, isLoading, mutate } = useSWR<Task[]>("tasks", fetcher);

  const tasks = data ?? [];
  const completed = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <Link href="/tasks/new" className="btn btn-primary">Create Task</Link>
      </div>

      <div className="card p-4 flex items-center justify-between">
        <div className="text-sm">Tasks: <span className="font-semibold">{tasks.length}</span></div>
        <div className="text-sm">Completed: <span className="font-semibold">{completed}</span> of <span className="font-semibold">{tasks.length}</span></div>
      </div>

      {isLoading && <div>Loading tasks…</div>}
      {error && <div className="text-red-600">Failed to load: {(error as Error).message}</div>}

      <div className="grid gap-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onChanged={() => mutate()} />
        ))}
        {!isLoading && tasks.length === 0 && (<>
          <div className="flex flex-col items-center justify-center w-full py-10">
      <div className="text-slate-500 text-sm">
        You don't have any tasks registered yet
      </div>
      <div className="text-sky-400 text-sm mt-2">
        Click "Add Task" to create your first task!
      </div>
    </div>
      </>
        )}
      </div>
    </div>
  );
}
