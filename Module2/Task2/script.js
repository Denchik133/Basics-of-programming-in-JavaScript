function createCounter(initial) {
    let value = initial
    return {
        increment() {
            value++
            return value
        },
        decrement() {
            value--
            return value
        },
        getValue() {
            return value
        },
        reset() {
            value = initial
            return value
        }
    }
}
let counter = createCounter(0)
function updateUI() {
    document.getElementById("value").textContent =
        counter.getValue()
}
function createNewCounter() {
    const initial = Number(
        document.getElementById("initial").value
    )
    if (isNaN(initial)) {
        alert("Enter a valid number")
        return
    }
    counter = createCounter(initial)
    updateUI()
}
function incrementCounter() {
    counter.increment()
    updateUI()
}
function decrementCounter() {
    counter.decrement()
    updateUI()
}
function resetCounter() {
    counter.reset()
    updateUI()
}