type Items = {
    id: number,
    text: string,
    checked: boolean
}

type User = {
    username: string
    pass: string
    items: Items[]
}
export { Items, User }