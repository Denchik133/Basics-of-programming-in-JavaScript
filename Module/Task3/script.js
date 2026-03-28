<<<<<<< HEAD
function isPalindrome(str) {
    if (typeof str !== "string") {
        return false
    }
    const clean = str.toLowerCase().replace(/\s+/g, "")
    const reversed = clean.split("").reverse().join("")
    return clean === reversed
}

function runPalindrome() {
    const text = document.getElementById("text").value
    const res = isPalindrome(text)
    document.getElementById("result").textContent = res ? "Паліндром" : "Не паліндром"
=======
function isPalindrome(str) {
    if (typeof str !== "string") {
        return false
    }
    const clean = str.toLowerCase().replace(/\s+/g, "")
    const reversed = clean.split("").reverse().join("")
    return clean === reversed
}

function runPalindrome() {
    const text = document.getElementById("text").value
    const res = isPalindrome(text)
    document.getElementById("result").textContent = res ? "Паліндром" : "Не паліндром"
>>>>>>> e583ecedc7c76a9a7018ea6037cd1dbc5f6fc07d
}