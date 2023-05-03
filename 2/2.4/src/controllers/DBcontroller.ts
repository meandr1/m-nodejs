import { MongoClient, Collection } from "mongodb"
import { Counter } from '../types'

const client: MongoClient = new MongoClient("mongodb://root:root@127.0.0.1:27017/")
export const counterValue: Collection = client.db("todos").collection("counter")
export const todoList: Collection = client.db("todos").collection("items")

let todoCounter: number;
export function incrementCounter(): number {
    return ++todoCounter;
}

export async function setDBconnection() {
    await client.connect()
    console.log('DB connection established');
    counterValue.findOne<Counter>({ counter: Number }).then((cnt) => {
        if (!cnt) {
            todoCounter = 0
            counterValue.insertOne({ counter: 0 })
        } else {
            todoCounter = cnt.counter
        }
    });
}