let products = []

const list = document.getElementById("list")
const info = document.getElementById("info")

function addProduct(name, quantity, price, category) {
    products.push({ id: Date.now(), name, quantity, price, category })
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id)
}

function updateQuantity(id, qty) {
    const product = products.find(p => p.id === id)
    if (product) product.quantity = qty
}

function filterByCategory(category) {
    return products.filter(p => p.category === category)
}

function filterLowStock(min) {
    return products.filter(p => p.quantity < min)
}

function totalValue() {
    return products.reduce((sum, p) => sum + p.price * p.quantity, 0)
}

function top5() {
    return [...products].sort((a, b) => b.price - a.price).slice(0, 5)
}

function linearSearch(price) {
    let comparisons = 0
    for (let i = 0; i < products.length; i++) {
        comparisons++
        if (products[i].price === price) {
            return { item: products[i], comparisons }
        }
    }
    return { item: null, comparisons }
}

function binarySearch(price) {
    let arr = [...products].sort((a, b) => a.price - b.price)
    let left = 0
    let right = arr.length - 1
    let comparisons = 0
    while (left <= right) {
        comparisons++
        let mid = Math.floor((left + right) / 2)
        if (arr[mid].price === price) {
            return { item: arr[mid], comparisons }
        }
        if (arr[mid].price < price) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return { item: null, comparisons }
}

function searchRange(min, max) {
    return products.filter(p => p.price >= min && p.price <= max)
}

document.getElementById("addBtn").addEventListener("click", () => {
    const name = document.getElementById("name").value
    const quantity = Number(document.getElementById("quantity").value)
    const price = Number(document.getElementById("price").value)
    const category = document.getElementById("category").value
    if (!name || isNaN(quantity) || isNaN(price)) return
    addProduct(name, quantity, price, category)
    render()
})

document.getElementById("searchBtn").addEventListener("click", () => {
    const price = Number(document.getElementById("searchPrice").value)
    const linear = linearSearch(price)
    const binary = binarySearch(price)
    info.textContent = `
Linear: ${linear.comparisons} comparisons
Binary: ${binary.comparisons} comparisons
`
})

document.getElementById("rangeBtn").addEventListener("click", () => {
    const min = Number(document.getElementById("minPrice").value)
    const max = Number(document.getElementById("maxPrice").value)
    const result = searchRange(min, max)
    list.innerHTML = ""
    result.forEach(p => {
        const li = document.createElement("li")
        li.textContent = `${p.name} - ${p.price}`
        list.appendChild(li)
    })
})

function render() {
    list.innerHTML = ""
    products.forEach(p => {
        const li = document.createElement("li")
        li.textContent = `${p.name} | ${p.quantity} | ${p.price} | ${p.category}`
        li.addEventListener("click", () => deleteProduct(p.id))
        list.appendChild(li)
    })

    info.textContent = `
Total value: ${totalValue()}
Top 5: ${top5().map(p => p.name).join(", ")}
`
}