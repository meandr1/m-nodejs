import {add, del, edit, load} from '../mongo'
import {Request, Response} from "express";
import {FileStore} from './sessioncontroller'


export async function getTasks(req: Request, res: Response) {
    if (FileStore[req.sessionID] != undefined && FileStore[req.sessionID].userId != undefined) {
        res.end(JSON.stringify({items: await load(FileStore[req.sessionID].userId)}))
    } else {
        res.end(JSON.stringify({error: "forbidden"}))
    }
}

export async function addTask(req: Request, res: Response) {
    res.end(JSON.stringify({id: await add(req.body, FileStore[req.sessionID].userId)}))
}

export async function editTask(req: Request, res: Response) {
    res.end(JSON.stringify(await edit(req.body, FileStore[req.sessionID].userId)))
}

export async function deleteTask(req: Request, res: Response) {
    res.send(JSON.stringify({ok: await del(req.body, FileStore[req.sessionID].userId)}))
}