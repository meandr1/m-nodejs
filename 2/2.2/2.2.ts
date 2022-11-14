fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => console.log(data.ip))
    .catch(e => console.log(e))

    async function getMyIP() {
        const response = await fetch('https://api.ipify.org/?format=json')
        const data = await response.json()
        return data.ip
    }

getMyIP().then(ip => console.log(ip))

