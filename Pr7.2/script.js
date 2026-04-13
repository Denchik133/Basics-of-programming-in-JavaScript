function linearSearch(arr, target) {
    let comparisons = 0
    for (let i = 0; i < arr.length; i++) {
        comparisons++
        if (arr[i] === target) return { index: i, comparisons }
    }
    return { index: -1, comparisons }
}

function binarySearchIter(arr, target) {
    let left = 0
    let right = arr.length - 1
    let comparisons = 0
    while (left <= right) {
        comparisons++
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) return { index: mid, comparisons }
        if (arr[mid] < target) left = mid + 1
        else right = mid - 1
    }
    return { index: -1, comparisons }
}

function binarySearchRec(arr, target, left = 0, right = arr.length - 1, comparisons = { count: 0 }) {
    if (left > right) return { index: -1, comparisons: comparisons.count }
    comparisons.count++
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return { index: mid, comparisons: comparisons.count }
    if (arr[mid] < target) return binarySearchRec(arr, target, mid + 1, right, comparisons)
    else return binarySearchRec(arr, target, left, mid - 1, comparisons)
}

function jumpSearch(arr, target) {
    let step = Math.floor(Math.sqrt(arr.length))
    let prev = 0
    let comparisons = 0
    while (arr[Math.min(step, arr.length) - 1] < target) {
        comparisons++
        prev = step
        step += Math.floor(Math.sqrt(arr.length))
        if (prev >= arr.length) return { index: -1, comparisons }
    }
    for (let i = prev; i < Math.min(step, arr.length); i++) {
        comparisons++
        if (arr[i] === target) return { index: i, comparisons }
    }
    return { index: -1, comparisons }
}

function interpolationSearch(arr, target) {
    let low = 0
    let high = arr.length - 1
    let comparisons = 0
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        comparisons++
        let pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) /
            (arr[high] - arr[low])
        )
        if (arr[pos] === target) return { index: pos, comparisons }
        if (arr[pos] < target) low = pos + 1
        else high = pos - 1
    }
    return { index: -1, comparisons }
}

function exponentialSearch(arr, target) {
    let comparisons = 0
    if (arr[0] === target) return { index: 0, comparisons: 1 }
    let i = 1
    while (i < arr.length && arr[i] <= target) {
        comparisons++
        i *= 2
    }
    const res = binarySearchIter(arr.slice(i / 2, Math.min(i, arr.length)), target)
    return {
        index: res.index === -1 ? -1 : res.index + i / 2,
        comparisons: comparisons + res.comparisons
    }
}

function findRange(arr, min, max) {
    return arr.filter(x => x >= min && x <= max)
}

function findFirstLast(arr, target) {
    let first = arr.indexOf(target)
    let last = arr.lastIndexOf(target)
    return { first, last }
}

function measure(fn, arr, target) {
    const start = performance.now()
    const res = fn(arr, target)
    const time = performance.now() - start
    return { ...res, time }
}

const arr = Array.from({ length: 1000 }, (_, i) => i)
const resultDiv = document.getElementById("result")
const canvas = document.getElementById("chart")
const ctx = canvas.getContext("2d")

document.getElementById("runSearch").addEventListener("click", () => {
    const value = Number(document.getElementById("searchValue").value)
    const methods = [
        ["Linear", linearSearch],
        ["Binary", binarySearchIter],
        ["Jump", jumpSearch],
        ["Interpolation", interpolationSearch],
        ["Exponential", exponentialSearch]
    ]
    const results = methods.map(([name, fn]) => {
        const res = measure(fn, arr, value)
        return { name, ...res }
    })
    resultDiv.innerHTML = results.map(r =>
        `${r.name}: index=${r.index}, comp=${r.comparisons}, time=${r.time.toFixed(3)}ms`
    ).join("<br>")
    drawChart(results)
})

function drawChart(data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const max = Math.max(...data.map(d => d.time))
    const width = canvas.width / data.length
    data.forEach((d, i) => {
        const height = (d.time / max) * canvas.height
        ctx.fillRect(i * width, canvas.height - height, width - 5, height)
        ctx.fillText(d.name, i * width + 5, canvas.height - 5)
    })
}