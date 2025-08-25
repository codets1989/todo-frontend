import TaskForm from "@/components/TaskForm";
import Link from "next/link";
export default function NewTaskPage() {
  return (
    <div className="space-y-6">
      <Link href="/" className="text-3xl font-semibold"> <span className="text-lg">←</span></Link>
      <div className="card p-4">
        <TaskForm mode="create" />
      </div>
    </div>
  );
}
