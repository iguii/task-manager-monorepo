import react, {useEffect} from 'react';
import {TaskInput} from "../components/TaskInput.tsx";
import TaskInputBtn from "../components/TaskInputBtn.tsx";
import TaskList from "../components/TaskList.tsx";
import type {Task} from "../types/Task.ts";
import {createTask, deleteTask, getTasks, toggleTask} from "../services/taskService.ts";
import {useNavigate} from "react-router-dom";

const TasksPage = () => {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [text, setText] = react.useState("");
    const [description, setDescription] = react.useState("");
    const [tasks, setTasks] = react.useState<Task[]>([]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasksList = tasks.filter(task => task.completed);

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
                setDescription("");
                fetchData();
            }).catch((error) => {
                alert("Ocurrió un error inesperado, por favor intenta de nuevo más tarde.");
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

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <header className="mb-10 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm uppercase text-cyan-400">
                            Fullstack Final Project
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Hola, {user.name}
                        </h1>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Organiza tus tareas en un espacio estilo kanban.
                        </h2>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 shadow-lg transition hover:border-rose-400 hover:text-rose-300"
                    >
                        Cerrar Sesión
                    </button>
                </header>
                <section className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
                        <p className="text-sm text-zinc-400">Tareas Totales</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-100">{totalTasks}</p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
                        <p className="text-sm text-zinc-400">Tareas Pendientes</p>
                        <p className="mt-2 text-3xl font-bold text-amber-300">
                            {pendingTasks.length}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
                        <p className="text-sm text-zinc-400">Tareas Completadas</p>
                        <p className="mt-2 text-3xl font-bold text-emerald-300">
                            {completedTasks}
                        </p>
                    </div>
                </section>

                <section className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl">
                    <h2 className="mb-4 text-xl font-semibold text-zinc-100">
                        Crear Tarea
                    </h2>

                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <TaskInput
                                text={text}
                                setText={setText}
                                description={description}
                                setDescription={setDescription}
                            />
                        </div>
                        <TaskInputBtn
                            addTask={() => addTask(text, description)}
                        />
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-2">
                    <TaskList
                        title="To Do"
                        tasks={pendingTasks}
                        deleteTask={removeTask}
                        toggleTask={toggleTaskHandler}
                        emptyMessage="No hay tareas pendientes."
                    />

                    <TaskList
                        title="Completadas"
                        tasks={completedTasksList}
                        deleteTask={removeTask}
                        toggleTask={toggleTaskHandler}
                        emptyMessage="No hay tareas completadas, aún."
                    />
                </section>
            </div>
        </main>
    )
}

export default TasksPage;