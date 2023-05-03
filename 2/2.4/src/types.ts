type Counter = {
    counter: number
}

type Item = {
    id: number,
    text: string,
    checked: boolean
}

type User = {
    username: string
    pass: string
    items: Item[]
}

export { Counter, Item, User }