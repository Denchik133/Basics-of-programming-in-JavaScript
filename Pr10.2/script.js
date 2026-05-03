const API = "https://api.coingecko.com/api/v3"
const coinsDiv = document.getElementById("coins")
const statusDiv = document.getElementById("status")
const detailsDiv = document.getElementById("details")
const searchInput = document.getElementById("search")
let chart

async function fetchJSON(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error("API error")
        }
        const data = await res.json()
        if (!data) {
            throw new Error("Invalid data")
        }
        return data
    } catch (e) {
        throw e
    }
}

async function loadCoins() {
    statusDiv.textContent = "Loading..."
    statusDiv.className = "loading"
    try {
        const data = await fetchJSON(`${API}/coins/markets?vs_currency=usd&per_page=10`)
        renderCoins(data)
        fillSelects(data)
        statusDiv.textContent = ""
    } catch (e) {
        statusDiv.textContent = "Error loading data"
        statusDiv.className = "error"
    }
}

function renderCoins(coins) {
    coinsDiv.innerHTML = ""
    coins.forEach(c => {
        const div = document.createElement("div")
        div.className = "coin"
        div.textContent = `${c.name} (${c.symbol}) - $${c.current_price}`
        div.onclick = () => loadDetails(c.id)
        coinsDiv.appendChild(div)
    })
}

async function loadDetails(id) {
    try {
        const [details, chartData] = await Promise.all([
            fetchJSON(`${API}/coins/${id}`),
            fetchJSON(`${API}/coins/${id}/market_chart?vs_currency=usd&days=7`)
        ])
        renderDetails(details)
        renderChart(chartData)
    } catch {
        detailsDiv.textContent = "Error loading details"
    }
}

function renderDetails(data) {
    detailsDiv.innerHTML = `
Price: $${data.market_data.current_price.usd}<br>
24h: ${data.market_data.price_change_percentage_24h}%<br>
7d: ${data.market_data.price_change_percentage_7d}%<br>
30d: ${data.market_data.price_change_percentage_30d}%
`
}

function renderChart(data) {
    const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString())
    const prices = data.prices.map(p => p[1])
    if (chart) chart.destroy()
    chart = new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Price",
                data: prices
            }]
        }
    })
}

function fillSelects(coins) {
    const from = document.getElementById("from")
    const to = document.getElementById("to")
    coins.forEach(c => {
        const opt1 = new Option(c.symbol, c.current_price)
        const opt2 = new Option(c.symbol, c.current_price)
        from.add(opt1)
        to.add(opt2)
    })
}

function convert() {
    const amount = Number(document.getElementById("amount").value)
    const from = Number(document.getElementById("from").value)
    const to = Number(document.getElementById("to").value)
    if (isNaN(amount)) return
    const result = (amount * from) / to
    document.getElementById("convertResult").textContent = result.toFixed(4)
}

searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase()
    const items = document.querySelectorAll(".coin")
    items.forEach(el => {
        el.style.display = el.textContent.toLowerCase().includes(text) ? "" : "none"
    })
})

setInterval(loadCoins, 30000)

loadCoins()