"use client";
import React from "react";
import { useRouter } from "next/navigation";
import type { Task, CreateTaskDTO } from "@/types/task";
import { createTask, updateTask } from "@/lib/api";

const COLORS = ["red","blue","green","yellow","purple"] as const;

interface Props {
  mode: "create" | "edit";
  task?: Task;
}

export default function TaskForm({ mode, task }: Props) {
  const router = useRouter();
  const [title, setTitle] = React.useState(task?.title ?? "");
  const [color, setColor] = React.useState(task?.color ?? "blue");
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { alert("Title is required"); return; }
    setSubmitting(true);
    try {
      if (mode === "create") {
        const dto: CreateTaskDTO = { title: title.trim(), color: color as any };
        await createTask(dto);
      } else {
        await updateTask(task!.id, { title: title.trim(), color: color as any });
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-dark1 p-6 rounded-md space-y-6 text-white">
      {/* Title */}
      <div className="space-y-1">
        <label htmlFor="title" className="font-medium text-sky-400">Title</label>
        <input
          id="title"
          className="w-full p-2 rounded-md border border-slate-700 bg-brand-dark1 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          placeholder="e.g. Buy groceries"
        />
      </div>

      {/* Color Picker */}
      <div className="space-y-1">
        <label className="font-medium text-sky-400">Color</label>
        <div className="flex gap-3">
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              className={`w-8 h-8 rounded-full border-2 transition-all
                ${color === c ? "border-white scale-110" : "border-transparent"}
                ${c === "red" ? "bg-red-500" :
                   c === "blue" ? "bg-blue-500" :
                   c === "green" ? "bg-green-500" :
                   c === "yellow" ? "bg-yellow-400" :
                   c === "purple" ? "bg-purple-500" : ""}`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mode === "create" ? "Add Task" : "Save Changes"}     <span className="justify-center bg-white text-blue-600 font-bold rounded-full">
      +
    </span>

        </button>
      </div>
    </form>
  );
}
