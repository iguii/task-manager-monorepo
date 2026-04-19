import type {Task} from "../types/Task.ts";

type TaskCardProps = {
    task: Task;
    deleteTask: (task: Task) => void;
    toggleTask: (task: Task) => void;
}
const TaskCard = ({ task, deleteTask, toggleTask }: TaskCardProps) => (
    <li
        className={`group rounded-2xl border p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
            task.completed 
                ? "border-emerald-500/20 bg-zinc-900/80"
                : "border-zinc-700/60 bg-zinc-800/80"
        }`}
    >
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
                <button
                    onClick={() => toggleTask(task)}
                    className="text-left"
                >
                    <h4 className={`text-lg font-semibold transition-colors ${
                        task.completed
                            ? "text-zinc-400 line-through"
                            : "text-zinc-100 group-hover:text-cyan-300"
                    }`}>
                        {task.title}
                    </h4>
                </button>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {task.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                        <span
                            key={tag.id}
                            className="rounded-full border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    onClick={() => toggleTask(task)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        task.completed
                            ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    }`}
                >
                    {task.completed ? "Deshacer": "Completa"}
                </button>

                <button
                    onClick={() => deleteTask(task)}
                    className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/25"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </li>
)
export default TaskCard;
