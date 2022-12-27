import {MongoClient, ObjectId, UpdateResult, WithId, Document} from "mongodb";

const client = new MongoClient("mongodb://root:root@localhost:27017");
const tasks = client.db("mongoDb").collection("todolist");
const users = client.db("mongoDb").collection("users");

type Task = { id: ObjectId, text: string, checked: boolean, userId: ObjectId };
export type User = { _id: ObjectId, login: string, pass: string };

export async function load(userId: string): Promise<WithId<Document>[]> {
    await client.connect()
    return tasks.find({userId: new ObjectId(userId)}).toArray().then()
}

export async function add(element: { text: string }, userId: string): Promise<ObjectId> {
    await client.connect()
    return tasks.insertOne({"text": element.text, "checked": false, userId: new ObjectId(userId)})
        .then(result => result.insertedId)
}

export async function edit(task: Task, userId: string): Promise<UpdateResult> {
    await client.connect()
    return tasks.updateOne({_id: new ObjectId(task.id), userId: new ObjectId(userId)}, {
        $set: {
            text: task.text,
            checked: task.checked
        }
    });
}

export async function del(task: Task, userId: string): Promise<boolean> {
    await client.connect()
    return tasks.deleteOne({_id: new ObjectId(task.id), userId: new ObjectId(userId)})
        .then(result => result.acknowledged)
}

export async function addUser(user: User, pass: string): Promise<ObjectId> {
    await client.connect()
    return users.insertOne({login: user.login, pass: pass})
        .then(result => result.insertedId)
}

export async function getUser(user: User): Promise<User | null> {
    await client.connect();
    return users.findOne<User>({login: user.login});
}

client.connect().then(() => {
    console.log("Connection to mongoDb is successful")
    client.close().then()
});