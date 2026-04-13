let products = []

const list = document.getElementById("list")
const info = document.getElementById("info")

function addProduct(name, quantity, price, category, supplier) {
    const product = {
        id: Date.now(),
        name,
        quantity,
        price,
        category,
        supplier
    }
    products.push(product)
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id)
}

function updateStock(id, amount) {
    const product = products.find(p => p.id === id)
    if (product) {
        product.quantity += amount
        if (product.quantity < 0) product.quantity = 0
    }
}

function searchProducts(query) {
    return products.filter(p =>
        p.name.includes(query) ||
        p.category.includes(query) ||
        p.supplier.includes(query)
    )
}

function lowStock(min) {
    return products.filter(p => p.quantity < min)
}

function totalValue() {
    return products.reduce((sum, p) => sum + p.price * p.quantity, 0)
}

function sortProducts(type) {
    return [...products].sort((a, b) => b[type] - a[type])
}

document.getElementById("addBtn").addEventListener("click", () => {
    const name = document.getElementById("name").value
    const quantity = Number(document.getElementById("quantity").value)
    const price = Number(document.getElementById("price").value)
    const category = document.getElementById("category").value
    const supplier = document.getElementById("supplier").value
    if (!name || isNaN(quantity) || isNaN(price)) return
    addProduct(name, quantity, price, category, supplier)
    render(products)
})

document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("search").value
    const result = searchProducts(query)
    render(result)
})

document.getElementById("lowBtn").addEventListener("click", () => {
    const min = Number(document.getElementById("minStock").value)
    const result = lowStock(min)
    render(result)
})

document.getElementById("sortBtn").addEventListener("click", () => {
    const type = document.getElementById("sort").value
    const result = sortProducts(type)
    render(result)
})

function render(arr) {
    list.innerHTML = ""
    arr.forEach(p => {
        const li = document.createElement("li")
        li.textContent = `${p.name} | ${p.quantity} | ${p.price} | ${p.category} | ${p.supplier}`
        li.addEventListener("click", () => {
            updateStock(p.id, -1)
            render(products)
        })
        li.addEventListener("dblclick", () => {
            deleteProduct(p.id)
            render(products)
        })
        list.appendChild(li)
    })
    info.textContent = `Загальна вартість: ${totalValue()}`
}