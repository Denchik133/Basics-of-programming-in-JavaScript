const BankModule = (function () {
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
        function isValidAmount(amount) {
            return typeof amount === "number" && amount > 0
        }
        return {
            deposit(amount) {
                if (!isValidAmount(amount)) return "Invalid amount"
                balance += amount
                transactions.push(createTransaction("deposit", amount))
            },
            withdraw(amount) {
                if (!isValidAmount(amount)) return "Invalid amount"
                if (amount > balance) return "Not enough money"
                balance -= amount
                transactions.push(createTransaction("withdraw", amount))
            },
            getBalance() {
                return balance
            },
            getTransactionHistory() {
                return transactions.map(t => ({ ...t }))
            }
        }
    }
    return {
        createAccount
    }

})()

function runDemo() {
    const out = document.getElementById("output")
    const acc = BankModule.createAccount("Ivan", 100)
    acc.deposit(50)
    acc.withdraw(30)
    acc.withdraw(500)
    let text = ""
    text += "Balance: " + acc.getBalance() + "\n\n"
    text += "Transactions:\n"
    acc.getTransactionHistory().forEach(t => {
        text += `${t.id} | ${t.type} | ${t.amount} | ${t.date}\n`
    })
    out.textContent = text
}