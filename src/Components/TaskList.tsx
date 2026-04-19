import type {Task} from "../types/Task.ts";
import TaskCard from "./TaskCard.tsx";

type TaskListProps = {
    tasks: Task[]
    deleteTask: (task: Task) => void
    toggleTask: (task: Task) => void
}

const TaskList = ({ tasks, deleteTask, toggleTask }: TaskListProps) => (
    <ul>
        {tasks.map((task, index) => (
           <TaskCard
               key={index}
               task={task}
               deleteTask={deleteTask}
               toggleTask={toggleTask}
           />
        ))}
    </ul>
);

export default TaskList;