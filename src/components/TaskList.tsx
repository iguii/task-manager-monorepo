import type { Task } from "../types";
import TaskCard from "./TaskCard";

type TaskListProps = {
    title: string
    tasks: Task[]
    deleteTask: (task: Task) => void
    toggleTask: (task: Task) => void
    emptyMessage: string
}

const TaskList = ({ title, tasks, deleteTask, toggleTask, emptyMessage }: TaskListProps) => (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl">
       <div className="mb-4 flex items-center justify-between">
           <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
           <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
              {tasks.length}
           </span>
       </div>

        {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 p-6 text-sm text-zinc-500">
                {emptyMessage}
            </div>
        ) : (
            <ul className="space-y-4">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleTask={toggleTask}
                    />
                ))}
            </ul>
        )}

    </section>
);

export default TaskList;