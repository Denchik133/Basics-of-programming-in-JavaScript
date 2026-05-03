function simulateAPI(name, city) {
    return new Promise((resolve, reject) => {
        const delay = Math.random() * 1500 + 500
        const start = Date.now()
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject(`${name} error`)
                return
            }
            const time = Date.now() - start
            resolve({
                api: name,
                city: city,
                temp: Math.floor(Math.random() * 30),
                time: time
            })
        }, delay)
    })
}

function fetchFromAPI1(city) {
    return simulateAPI("API1", city)
}

function fetchFromAPI2(city) {
    return simulateAPI("API2", city)
}

function fetchFromAPI3(city) {
    return simulateAPI("API3", city)
}

function timeoutPromise(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject("Timeout 3s"), ms)
    })
}

const btn = document.getElementById("getWeather")
const input = document.getElementById("cityInput")
const resultDiv = document.getElementById("result")
const logsDiv = document.getElementById("logs")

btn.addEventListener("click", () => {
    const city = input.value.trim()
    if (!city) {
        resultDiv.textContent = "Введіть місто"
        return
    }
    logsDiv.innerHTML = ""
    resultDiv.textContent = "Завантаження..."

    const api1 = fetchFromAPI1(city).then(res => {
        log(`✔ ${res.api} відповів за ${res.time}ms`)
        return res
    }).catch(err => {
        log(`✖ API1: ${err}`)
        throw err
    })

    const api2 = fetchFromAPI2(city).then(res => {
        log(`✔ ${res.api} відповів за ${res.time}ms`)
        return res
    }).catch(err => {
        log(`✖ API2: ${err}`)
        throw err
    })

    const api3 = fetchFromAPI3(city).then(res => {
        log(`✔ ${res.api} відповів за ${res.time}ms`)
        return res
    }).catch(err => {
        log(`✖ API3: ${err}`)
        throw err
    })

    Promise.race([
        api1,
        api2,
        api3,
        timeoutPromise(3000)
    ])
    .then(res => {
        resultDiv.textContent = `${res.city}: ${res.temp}°C (швидше: ${res.api})`
    })
    .catch(err => {
        resultDiv.textContent = "Помилка: " + err
    })
})

function log(text) {
    const p = document.createElement("div")
    p.textContent = text
    logsDiv.appendChild(p)
}