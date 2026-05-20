function analyzeScores(students) {
    const passed = students
        .filter(s => s.score >= 60)
        .map(s => s.name)
    const failed = students
        .filter(s => s.score < 60)
        .map(s => s.name)
    const average = Number(
        (
            students.reduce((sum, s) => sum + s.score, 0) / students.length
        ).toFixed(2)
    )
    const best = students.reduce((bestStudent, current) => {
        return current.score > bestStudent.score
            ? current
            : bestStudent
    }).name
    return {
        passed,
        failed,
        average,
        best
    }
}

function runAnalysis() {
    const result = document.getElementById("result")
    try {
        const input = document.getElementById("input").value
        const students = JSON.parse(input)
        if (!Array.isArray(students)) {
            throw new Error("Input must be an array")
        }
        const valid = students.every(s =>
            typeof s.name === "string" &&
            typeof s.score === "number"
        )
        if (!valid) {
            throw new Error("Invalid student format")
        }
        const stats = analyzeScores(students)
        result.textContent = JSON.stringify(stats, null, 4)
    } catch (e) {
        result.textContent = e.message
    }
}