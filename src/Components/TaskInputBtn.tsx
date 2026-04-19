type TaskInputBtnProps = {
    addTask: () => void;
}

export const TaskInputBtn = ({ addTask } : TaskInputBtnProps) => (
    <button onClick={addTask}>
        Agregar Tarea
    </button>
);

export default TaskInputBtn;
