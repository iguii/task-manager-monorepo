import type {Tag} from "./Tag.ts";

export type Task = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
}