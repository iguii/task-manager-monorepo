import type {Request, Response} from "express";
import {prisma} from "../lib/prisma";

//TODO: modify logic to add tags to tasks
export const createTask = async(req: Request, res: Response) => {
    let statusCode = 201;
    let newTask;

    try {
        const { title, description, tags = [] } = req.body;

        // clean tags
        const cleanedTags = [...new Set(
            tags.map((tag:any) => tag.trim().toLowerCase())
                .filter((tag:any) => tag.length > 0)
        )]

        // create all non-existing tags
        for (const tagName of cleanedTags) {
            await prisma.tag.upsert({
               where: { name: <string>tagName },
               update: {},
               create: { name: <string>tagName },
           })
        }

        newTask = await prisma.task.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                tags: {
                    connect: cleanedTags.map((tagName: any) => ({name: tagName})),
                }
            },
            include: {
                tags: true,
            },
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
    const tasks = await prisma.task.findMany({
        include: {
            tags: true,
        }
    });

    return res.status(200).json(tasks);
}

export const updateTask = async (req: Request, res: Response) => {
    const id = parseInt(<string>req.params.id);
    let statusCode = 200;
    let updatedTask;

    try{
        const {tags = [], ...rest} = req.body;

        const found = await prisma.task.findUnique({ where: { id: id } });

        if(!found) {
            statusCode = 404;
            updatedTask = { message: `Task not found` };
        } else {
            // clean tags
            const cleanedTags = [...new Set(
                tags.map((tag: string) => tag.trim().toLowerCase())
                    .filter((tag: any) => tag.length > 0)
            )];


            // create all non-existing tags
            for (const tagName of cleanedTags) {
                await prisma.tag.upsert({
                    where: {name: <string>tagName},
                    update: {},
                    create: {name: <string>tagName},
                })
            }

            updatedTask = await prisma.task.update({
                where: {id: id},
                data: {
                    ...rest,
                    tags: {
                        set: cleanedTags.map((name: any) => ({name}))
                    },
                },
                include: {
                    tags: true,
                }
            });
        }
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
