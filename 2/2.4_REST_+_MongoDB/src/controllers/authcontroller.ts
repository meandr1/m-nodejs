import {Request, Response} from "express";
import {addUser, getUser} from "../mongo";
import {decrypt, encrypt} from "./pidcryptcontroller";
import {FileStore} from './sessioncontroller'

const ok: { ok: boolean } = {ok: true}

export async function login(req: Request, res: Response) {
    const user = await getUser(req.body)
    if (user && decrypt(user) == req.body.pass) {
        FileStore[req.sessionID] = {userId: user._id}
        res.send(JSON.stringify(ok))
    } else {
        res.send(JSON.stringify({error: 'not found'}))
    }
}

export async function logout(req: Request, res: Response) {
    res.send(JSON.stringify(ok))
}

export async function registration(req: Request, res: Response) {
    res.send(JSON.stringify({ok: await addUser(req.body, encrypt(req.body))!= null}))
}