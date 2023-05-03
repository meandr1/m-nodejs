import { Request, Response } from 'express'
import { User } from '../types'
import { todoList } from './DBcontroller'

export function login(req: Request, res: Response) {
    let username: string = req.body.login
    let pass: string = req.body.pass
    todoList.findOne<User>({ username, pass }).then(user => {
        if (user) {
            req.session.username = username
            res.send({ ok: true })
        } else {
            res.status(401).send({ error: "not found" })
        }
    })
}

export function logout(req: Request, res: Response) {
    req.session.destroy(err => {
        if (err) res.status(500).send({ "error": `${(err as Error).message}` })
        else res.send({ ok: true })
    })
}

export function register(req: Request, res: Response) {
    let username: string = req.body.login
    let pass: string = req.body.pass
    let newUser: User = { username, pass, items: [] }
    todoList.findOne<User>({ username }).then(user => {
        if (!user) {
            todoList.insertOne(newUser).then(result => {
                if (result.acknowledged) {
                    req.session.username = username
                    res.send({ ok: true })
                } else res.status(500).send({ error: "Failed to add user" })
            })
        } else res.status(403).send({ error: "User with such name already registered" })
    })
}