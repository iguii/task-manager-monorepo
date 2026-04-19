import type {Task} from "../types/Task.ts";

type TaskCardProps = {
    task: Task;
    deleteTask: (task: Task) => void;
    toggleTask: (task: Task) => void;
}
const TaskCard = ({ task, deleteTask, toggleTask }: TaskCardProps) => (
    <>
        <li>
            <span
                onClick={() => toggleTask(task)}
            >
                {task.title}
            </span>
            <p>
                {task.description}
            </p>
            <div className="tags">
                {task.tags.map(tag => (
                    <span key={tag.id} className="tag">
                        {tag.name}
                    </span>
                ))}
            </div>

            <button onClick={() => deleteTask(task)}>
                X
            </button>
        </li>
    </>
)
export default TaskCard;
