const hostForIP: string = 'https://api.ipify.org/?format=json'
// 1
fetch(hostForIP)
    .then(response => response.json())
    .then(data => console.log(`My IP is (using fetch()): ${data.ip}`))
    .catch(e => console.log(e))

// 2
async function getMyIP(): Promise<string> {
    const response: Response = await fetch(hostForIP)
    return (await response.json()).ip
}
getMyIP().then(item => console.log(`My IP is (using function()): ${item}`))

const hostForNames: string = 'https://random-data-api.com/api/name/random_name'
//3.1
async function getNames(host: string): Promise<string[]> {
    const response1: Response = await fetch(host)
    const response2: Response = await fetch(host)
    const response3: Response = await fetch(host)
    return await Promise.all([response1.json(), response2.json(), response3.json()]).then((values) => {
        return values.map(item => item.name)
    })
}
getNames(hostForNames).then(item => { console.log('Getting names using async/await + Promise.all:'), item.map(item => console.log(item)) })

//3.2
async function getNames2(host: string): Promise<string[]> {
    let result: string[] = []
    for (let i = 0; i < 3; i++) {
        const response: { name: string } = await (await fetch(host)).json()
        result.push(response.name)
    }
    return result
}
getNames2(hostForNames).then(item => { console.log('Getting names using async/await without Promise.all:'), item.map(item => console.log(item)) })

//3.3
function getNames3(host: string): Promise<string>[] {
    return [host, host, host]
        .map(item => fetch(item))
        .map(item => item.then((item) => item.json()))
        .map(item => item.then(item => item.name))
}

(async () => {
    let res: string[] = []
    for await (const name of getNames3(hostForNames)) {
        res.push(name)
    }
    console.log(`Getting names without using async/await and Promise.all: \n${res.join('\n')}`)
})();

const hostForUsers: string = 'https://random-data-api.com/api/users/random_user'
//4.1
function getFemaleUser(host: string, requestCounter: number = 1) {
    fetch(host)
        .then(response => response.json())
        .then(user => {
            if (user.gender === 'Female') {
                console.log(`Task 4.1. requested ${requestCounter} times to get female user`)
                return user
            } else getFemaleUser(host, ++requestCounter)
        })
}
getFemaleUser(hostForUsers)

//4.2
async function getFemaleUser2(host: string) {
    let response: Response = await fetch(host)
    let user: { gender: string } = await response.json()
    let requestCounter: number = 1
    while (user.gender !== 'Female') {
        response = await fetch(host)
        user = await response.json()
        requestCounter++
    }
    console.log(`Task 4.2. requested ${requestCounter} times to get female user`)
    return user
}
getFemaleUser2(hostForUsers)

//5
// Не уверен, что я все правильно понял что нужно сделать в этом задании

function firstTask5(callBack: (ip: string) => void, ip: string) {
    callBack(ip)
}

function callBackTask5(ip: string): void {
    console.log(`My IP is (Task 5): ${ip}`);
}

async function twoTask5() {
    fetch(hostForIP).then(item => item.json()).then(item => firstTask5(callBackTask5, item.ip))
}
twoTask5()

//6
async function firstTask6(): Promise<string> {
    return fetch(hostForIP).then(item => item.json()).then(item => item.ip)
}

function callBackTask6(ip: string): void {
    console.log(`My IP is (Task 6): ${ip}`);
}

async function twoTask6(callBack: (ip: string) => void): Promise<void> {
    await firstTask6().then(ip => callBack(ip))
}

twoTask6(callBackTask6)