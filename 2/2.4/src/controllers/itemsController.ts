import { Request, Response } from 'express'
import { Counter, Item, User } from '../types'
import { todoList, incrementCounter, counterValue } from './DBcontroller'

export function getItems(req: Request, res: Response) {
    let username: string = req.session.username
    if (username) {
        try {
            todoList.findOne<User>({ username }).then(user => {
                res.send({ items: user?.items })
            })
        } catch (err) {
            res.status(500).send({ error: `${(err as Error).message}` })
        }
    } else {
        res.status(403).send({ error: 'forbidden' });
    }
}

export function deleteItem(req: Request, res: Response) {
    let itemID: number = req.body.id
    let username: string = req.session.username
    try {
        todoList.updateOne({ username }, { $pull: { items: { id: itemID } } })
            .then(updateResult => {
                if (updateResult.modifiedCount) res.send({ ok: true })
                else res.status(500).send({ error: "Failed to update item" })
            })
    } catch (err) {
        res.status(500).send({ error: `${(err as Error).message}` })
    }
}

export function addItem(req: Request, res: Response) {
    let newCounter: Counter = { counter: incrementCounter() }
    let item: Item = { id: newCounter.counter, text: req.body.text, checked: false }
    try {
        todoList.updateOne({ username: req.session.username }, { $push: { items: item } })
            .then(itemUpdateRes => {
                counterValue.updateOne({ counter: newCounter.counter - 1 }, { $set: newCounter })
                    .then(cntUpdateResult => {
                        if (cntUpdateResult.modifiedCount && itemUpdateRes.modifiedCount) res.send({ id: newCounter.counter })
                        else res.status(500).send({ error: "Failed to add item" })
                    })
            })
    } catch (err) {
        res.status(500).send({ error: `${(err as Error).message}` })
    }
}

export function editItem(req: Request, res: Response) {
    let item: Item = req.body
    let itemID: number = req.body.id
    let username: string = req.session.username
    try {
        todoList.updateOne({ username }, { $set: { 'items.$[item]': item } },
            { arrayFilters: [{ "item.id": itemID }] }).then(updateResult => {
                if (updateResult.modifiedCount) res.send({ ok: true })
                else res.status(500).send({ error: "Failed to update item" })
            })
    } catch (err) {
        res.status(500).send({ error: `${(err as Error).message}` })
    }
}