import type { Task, CreateTaskDTO, UpdateTaskDTO } from "@/types/task";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:4000";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks`, { cache: "no-store" });
  return handle<Task[]>(res);
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, { cache: "no-store" });
  return handle<Task>(res);
}

export async function createTask(dto: CreateTaskDTO): Promise<Task> {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return handle<Task>(res);
}

export async function updateTask(id: number, dto: UpdateTaskDTO): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return handle<Task>(res);
}

export async function deleteTask(id: number): Promise<{ success: boolean }>{ 
  const res = await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
  return handle<{ success: boolean }>(res);
}

export async function toggleTask(id: number, completed: boolean) {
  return updateTask(id, { completed });
}
