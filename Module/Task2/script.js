function createStudent(name, grades) {
    if (typeof name !== "string" || !Array.isArray(grades) || grades.length === 0) {
        return null
    }
    const valid = grades.filter(g => typeof g === "number" && !isNaN(g))
    if (!valid.length) {
        return null
    }
    const avg = Number((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2))
    return {
        name,
        grades: valid,
        average: avg,
        isPassed: avg >= 60
    }
}

function runStudent() {
    const name = document.getElementById("name").value
    const grades = document.getElementById("grades").value.split(",").map(Number)
    const result = createStudent(name, grades)
    document.getElementById("result").textContent = JSON.stringify(result, null, 2)
}