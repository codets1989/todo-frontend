import TaskForm from "@/components/TaskForm";
import { getTask } from "@/lib/api";
import Link from "next/link";
interface Props { params: { id: string } }

export default async function EditTaskPage({ params }: Props) {
  const id = Number(params.id);
  const task = await getTask(id);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-3xl font-semibold"> <span className="text-lg">←</span></Link>
      <div className="card p-4">
      
        <TaskForm mode="edit" task={task} />
      </div>
    </div>
  );
}
