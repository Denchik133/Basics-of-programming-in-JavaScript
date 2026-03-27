const DELAY = 300

function createTooltip(content, type = "info") {
    const tooltip = document.createElement("div")
    tooltip.className = `tooltip ${type}`
    tooltip.innerHTML = content
    const arrow = document.createElement("div")
    arrow.className = "tooltip-arrow"
    tooltip.appendChild(arrow)
    document.body.appendChild(tooltip)
    return tooltip
}

function setPosition(el, tooltip, position) {
    const rect = el.getBoundingClientRect()
    const tRect = tooltip.getBoundingClientRect()
    let top
    let left
    if (position === "top") {
        top = rect.top - tRect.height - 8
        left = rect.left + rect.width / 2 - tRect.width / 2
    }
    if (position === "bottom") {
        top = rect.bottom + 8
        left = rect.left + rect.width / 2 - tRect.width / 2
    }
    if (position === "left") {
        top = rect.top + rect.height / 2 - tRect.height / 2
        left = rect.left - tRect.width - 8
    }
    if (position === "right") {
        top = rect.top + rect.height / 2 - tRect.height / 2
        left = rect.right + 8
    }
    if (top < 0) position = "bottom"
    if (left < 0) position = "right"
    if (left + tRect.width > window.innerWidth) position = "left"
    tooltip.style.top = top + "px"
    tooltip.style.left = left + "px"
    tooltip.classList.add(position)
}

function attachTooltip(el) {
    const content = el.dataset.tooltip
    if (!content) return
    const trigger = el.dataset.trigger || "hover"
    const type = el.dataset.type || "info"
    const position = el.dataset.position || "top"
    let tooltip
    let timer
    
    function show() {
        tooltip = createTooltip(content, type)
        setPosition(el, tooltip, position)
        setTimeout(() => tooltip.classList.add("show"), 10)
        el.setAttribute("aria-describedby", "tooltip")
    }

    function hide() {
        if (tooltip) {
            tooltip.classList.remove("show")
            setTimeout(() => tooltip.remove(), 200)
        }
    }

    if (trigger === "hover") {
        el.addEventListener("mouseenter", () => {
            timer = setTimeout(show, DELAY)
        })
        el.addEventListener("mouseleave", () => {
            clearTimeout(timer)
            hide()
        })
    }

    if (trigger === "click") {
        el.addEventListener("click", () => {
            if (tooltip) hide()
            else show()
        })
    }

    if (trigger === "focus") {
        el.addEventListener("focus", show)
        el.addEventListener("blur", hide)
    }

    el.addEventListener("touchstart", (e) => {
        e.preventDefault()
        if (tooltip) hide()
        else show()
    })
}

document.querySelectorAll("[data-tooltip]").forEach(attachTooltip)

const container = document.getElementById("elements")

for (let i = 1; i <= 20; i++) {
    const btn = document.createElement("button")
    btn.textContent = "Element " + i
    btn.dataset.tooltip = "Tooltip " + i
    btn.dataset.type = ["info", "success", "warning", "error"][i % 4]
    btn.dataset.position = ["top", "right", "bottom", "left"][i % 4]
    container.appendChild(btn)
    attachTooltip(btn)
}