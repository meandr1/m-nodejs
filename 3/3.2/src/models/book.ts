import { RowDataPacket } from "mysql2"
import { Request } from 'express';

export interface NewBook {
    name: string,
    year: number,
    pages: number,
    description: string,
    views: number,
    wanted: number,
    deleted: number
}

export interface Book extends RowDataPacket {
    id: number,
    name: string,
    authors: string,
    year: number,
    pages: number,
    description: string,
    views: number,
    wanted: number,
    deleted: number
}

export interface BookWanted extends RowDataPacket {
    wanted: number;
}

export interface BookID extends RowDataPacket {
    id: number;
}

export function createNewBook(req: Request): NewBook {
    return {
       name: req.body.name,
       year: req.body.year,
       pages: req.body.pages,
       description: req.body.description,
       views: 0,
       wanted: 0,
       deleted: 0
    }
 }