<<<<<<< HEAD
const addBtn = document.getElementById("addBtn")
const input = document.getElementById("taskInput")
const list = document.getElementById("taskList")

addBtn.addEventListener("click", () => {
    const text = input.value.trim()
    if (!text) {
        return
    }
    const li = document.createElement("li")
    li.textContent = text
    list.appendChild(li)
    input.value = ""
})

list.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove()
    }
=======
const addBtn = document.getElementById("addBtn")
const input = document.getElementById("taskInput")
const list = document.getElementById("taskList")

addBtn.addEventListener("click", () => {
    const text = input.value.trim()
    if (!text) {
        return
    }
    const li = document.createElement("li")
    li.textContent = text
    list.appendChild(li)
    input.value = ""
})

list.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove()
    }
>>>>>>> e583ecedc7c76a9a7018ea6037cd1dbc5f6fc07d
})