function fizzBuzz(n) {
    if (typeof n !== "number" || n <= 0) {
        return []
    }
    const result = []
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz")
        } else if (i % 3 === 0) {
            result.push("Fizz")
        } else if (i % 5 === 0) {
            result.push("Buzz")
        } else {
            result.push(String(i))
        }
    }
    return result
}

function runFizz() {
    const n = Number(document.getElementById("numberInput").value)
    const res = fizzBuzz(n)
    document.getElementById("result").textContent = res.join(", ")
}