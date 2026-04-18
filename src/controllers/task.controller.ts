import type {Request, Response} from "express";
import {prisma} from "../lib/prisma";
export const createTask = async(req: Request, res: Response) => {
    let statusCode = 201;
    let newTask;

    try {
        newTask = await prisma.task.create({
            data: {
                ...req.body,
            }
        });
    }catch (err: any) {
        statusCode = 500;
        newTask = {
            message: `${err.message}`,
        }
    }

    return res.status(statusCode).json(newTask);
}

export const readTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany();

    return res.status(200).json(tasks);
}

export const updateTask = async (req: Request, res: Response) => {
    const id = parseInt(<string>req.params.taskId);
    let statusCode = 200;
    let updatedTask;

    try{
        const found = await prisma.task.findUnique({ where: { id: id } });
        if(!found) {
            statusCode = 404;
            updatedTask = { message: `Task not found` };
        } else updatedTask = await prisma.task.update({
            where: { id: id },
            data: {
                id: id,
                ...req.body,
            }
        })
    }catch (e: any) {
        statusCode = 500;
        updatedTask = { message: `${e.message}` };

    }

    return res.status(statusCode).json(updatedTask);
}

export const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(<string>req.params.id);
    let statusCode = 200;
    let task;

    try{
        task = await prisma.task.findUnique({ where: { id: id} });
        if (!task) {
            statusCode = 404;
        } else await prisma.task.delete({ where: { id: id } });
    } catch (e: any) {
        statusCode = 500;
        task = { message: `${e.message}` };
    }

    return res.status(statusCode).json(task);
}


export const toggleTask = async (req: Request, res: Response) => {
    const id = parseInt(<string>req.params.id);
    let statusCode = 200;
    let task;

    try{
        task = await prisma.task.findUnique({ where: { id: id } });
        if (!task) {
            statusCode = 404;
            task = { message: "Task not found" };
        } else task = await prisma.task.update({
                where: { id: id },
                data: { completed: !task.completed },
        });
    } catch (e: any) {
        statusCode = 500;
        task = { message: `${e.message}` };
    }
    return res.status(statusCode).json(task);
}
