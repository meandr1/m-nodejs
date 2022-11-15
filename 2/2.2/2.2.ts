// 1
fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => console.log(data.ip))
    .catch(e => console.log(e))

// 2
async function getMyIP() {
    const response = await fetch('https://api.ipify.org/?format=json')
    return (await response.json()).ip
}
getMyIP().then(ip => console.log(ip))

//3.1
async function getNames() {
    const host: string = 'https://random-data-api.com/api/name/random_name'
    const response1 = await fetch(host)
    const response2 = await fetch(host)
    const response3 = await fetch(host)
    return await Promise.all([response1.json(), response2.json(), response3.json()]).then((values) => {
        return values.map(item => item.name)
    })
}
getNames().then(item => item.map(item => console.log(item)))

//3.2
async function getNames2() {
    const host: string = 'https://random-data-api.com/api/name/random_name'
    const response1 = await (await fetch(host)).json()
    const response2 = await (await fetch(host)).json()
    const response3 = await (await fetch(host)).json()
    return [response1.name, response2.name, response3.name]
}
getNames2().then(item => item.map(item => console.log(item)))

//3.3
// const host: string = 'https://random-data-api.com/api/name/random_name'
// const responses = [fetch(host),fetch(host),fetch(host)].map(item => item.then((item)=>console.log(item)))
// const responses = [host,host,host].map(item => fetch(item))