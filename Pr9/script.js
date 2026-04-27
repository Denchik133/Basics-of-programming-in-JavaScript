/**
 * Створення банківського акаунту (замикання)
 * @param {string} owner
 * @param {number} initialBalance
 */
function createAccount(owner, initialBalance = 0) {
    let balance = initialBalance
    let transactions = []
    let idCounter = 1
    function createTransaction(type, amount) {
        return {
            id: idCounter++,
            type,
            amount,
            date: new Date().toISOString()
        }
    }
    return {
        deposit(amount) {
            if (amount <= 0) return "Invalid amount"
            balance += amount
            transactions.push(createTransaction("deposit", amount))
        },
        withdraw(amount) {
            if (amount <= 0) return "Invalid amount"
            if (amount > balance) return "Not enough money"
            balance -= amount
            transactions.push(createTransaction("withdraw", amount))
        },
        getBalance() {
            return balance
        },
        getTransactionHistory() {
            return [...transactions]
        }
    }
}

/**
 * compose - справа наліво
 */
function compose(...fns) {
    return (value) => fns.reduceRight((acc, fn) => fn(acc), value)
}

/**
 * pipe - зліва направо
 */
function pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value)
}

/**
 * partial - часткове застосування
 */
function partial(fn, ...args) {
    return (...rest) => fn(...args, ...rest)
}

/**
 * Приклад pipeline
 */
function validatePositive(x) {
    if (x <= 0) throw new Error("Invalid")
    return x
}

function double(x) {
    return x * 2
}

function format(x) {
    return `Result: ${x}`
}

const pipeline = pipe(
    validatePositive,
    double,
    format
)

/**
 * Unit tests
 */
function runTests() {
    const acc = createAccount("Test", 100)
    acc.deposit(50)
    console.assert(acc.getBalance() === 150, "Deposit failed")
    acc.withdraw(30)
    console.assert(acc.getBalance() === 120, "Withdraw failed")
    console.assert(acc.withdraw(1000) === "Not enough money", "Overdraw check failed")
    const history = acc.getTransactionHistory()
    console.assert(Array.isArray(history), "History not array")
    const testPipe = pipeline(5)
    console.assert(testPipe === "Result: 10", "Pipe failed")
    const add = (a, b) => a + b
    const add5 = partial(add, 5)
    console.assert(add5(3) === 8, "Partial failed")
    console.log("All tests passed")
}

/**
 * Demo
 */
function runDemo() {
    const out = document.getElementById("output")
    const acc = createAccount("Ivan", 100)
    acc.deposit(50)
    acc.withdraw(30)
    const history = acc.getTransactionHistory()
    let text = ""
    text += "Balance: " + acc.getBalance() + "\n\n"
    text += "Transactions:\n"
    history.forEach(t => {
        text += `${t.id} | ${t.type} | ${t.amount} | ${t.date}\n`
    })
    text += "\nPipeline:\n"
    text += pipeline(10)
    out.textContent = text
    runTests()
}