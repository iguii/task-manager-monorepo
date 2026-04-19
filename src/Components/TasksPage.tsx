import react, {useEffect} from 'react';
import {TaskInput} from "./TaskInput.tsx";
import TaskInputBtn from "./TaskInputBtn.tsx";
import TaskList from "./TaskList.tsx";
import type {Task} from "../types/Task.ts";
import {createTask, deleteTask, getTasks, toggleTask} from "../services/taskService.ts";

const TasksPage = () => {
    const  [text, setText] = react.useState("");
    const [tasks, setTasks] = react.useState<Task[]>([]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const fetchData = async() => {
        try{
            const fetchedData = await getTasks();
            setTasks(fetchedData.data);
        }catch (e) {
            console.error("Failed to fetch tasks: ", e );
        }
    }

    const addTask = (title: string, desc: string) => {
        try {
            createTask(title, desc).then((response) => {
                console.log("Task created: ", response.data);
                setText("");
                fetchData();
            }).catch((error) => {
                console.error("Failed to create task: ", error);
            });
        } catch (e) {
           console.error("Failed to create task: ", e);
        }
    }

    const removeTask = (task: Task) => {
        try {
            const confirmation = confirm("Estás seguro que quieres eliminar esta tarea?");
            if (confirmation) {
                const currentTaskId = task.id;
                deleteTask(currentTaskId)
                    .then(() => {
                        setText("");

                        fetchData()
                            .then(() => {
                                console.log("Task deleted: ", task);
                            })
                            .catch((error) => {
                                console.error("Failed to delete task: ", error);
                            });
                    });
            }
        } catch (e) {
            console.error("Failed to delete task: ", e);
        }
    }

    const toggleTaskHandler = (task: Task) => {
        try {
            toggleTask(task.id)
                .then(()=> {
                    fetchData()
                        .then(() => {
                            console.log("Task deleted: ", task);
                        })
                        .catch((error) => {
                            console.error("Failed to delete task: ", error);
                        });
                })
                .catch((error) => {
                    console.error("Failed to delete task: ", error);
                })
        } catch (e) {
            console.error("Failed to toggle task: ", e)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Task Manager - Proyecto Final</h2>
            <p>
                Completadas: {completedTasks}/{totalTasks}
            </p>

            <div>
                <h3>Crear Tarea</h3>
                <TaskInput text={text} setText={setText} />
                <TaskInputBtn addTask={() => addTask(text, "Example cooked description")} />
            </div>

            <TaskList tasks={tasks} deleteTask={removeTask} toggleTask={toggleTaskHandler} />
        </div>
    )
}

export default TasksPage;