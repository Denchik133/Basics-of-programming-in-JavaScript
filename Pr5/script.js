class Task {

  constructor({ title, description, status = "pending", priority = "low", dueDate = null, tags = [] }) {
    this.id = Date.now()
    this.title = title
    this.description = description
    this.status = status
    this.priority = priority
    this.dueDate = dueDate ? new Date(dueDate) : null
    this.tags = tags
  }

  markComplete() {
    this.status = "completed"
  }

  markIncomplete() {
    this.status = "pending"
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag)
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag)
  }

  get isOverdue() {
    if (!this.dueDate) return false
    const today = new Date()
    return this.status !== "completed" && this.dueDate < today
  }
}

class TaskManager {

  constructor() {
    this.tasks = []
  }

  createTask(data) {
    const task = new Task(data)
    this.tasks.push(task)
    return task
  }

  updateTask(id, data) {
    const task = this.tasks.find(t => t.id === id)
    if (!task) return null
    Object.assign(task, data)
    return task
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id)
  }

  getTasksByStatus(status) {
    return this.tasks.filter(t => t.status === status)
  }

  getTasksByPriority(priority) {
    return this.tasks.filter(t => t.priority === priority)
  }

  getOverdueTasks() {
    return this.tasks.filter(t => t.isOverdue)
  }

  getTasksByTag(tag) {
    return this.tasks.filter(t => t.tags.includes(tag))
  }

  searchTasks(query) {
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  getStats() {
    const total = this.tasks.length
    const completed = this.getTasksByStatus("completed").length
    const pending = this.getTasksByStatus("pending").length
    const overdue = this.getOverdueTasks().length
    return { total, completed, pending, overdue }
  }

  getCompletionRate() {
    const stats = this.getStats()
    if (stats.total === 0) return 0
    return Math.round((stats.completed / stats.total) * 100)
  }

  getTasksByDueDate() {
    return this.tasks.reduce((acc, task) => {
      if (!task.dueDate) return acc
      const date = task.dueDate.toISOString().split("T")[0]
      if (!acc[date]) acc[date] = []
      acc[date].push(task)
      return acc
    }, {})
  }
}

const manager = new TaskManager()

function createTask() {
  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const priority = document.getElementById("priority").value
  const dueDate = document.getElementById("dueDate").value
  const tags = document.getElementById("tags").value
    .split(",")
    .map(t => t.trim())
    .filter(Boolean)
  manager.createTask({ title, description, priority, dueDate, tags })
  renderTasks()
}

function renderTasks() {
  const container = document.getElementById("taskList")
  container.innerHTML = ""
  manager.tasks.forEach(task => {
    const div = document.createElement("div")
    div.className = "task"
    if (task.isOverdue) {
      div.classList.add("overdue")
    }
    div.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description}<br>
      Priority: ${task.priority}<br>
      Status: ${task.status}<br>
      Tags: ${task.tags.join(", ")}<br>
      Due: ${task.dueDate ? task.dueDate.toDateString() : "-"}<br>
      <button onclick="completeTask(${task.id})">Complete</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `
    container.appendChild(div)
  })
}

function completeTask(id) {
  const task = manager.tasks.find(t => t.id === id)
  task.markComplete()
  renderTasks()
}

function deleteTask(id) {
  manager.deleteTask(id)
  renderTasks()
}

function showStats() {
  const stats = manager.getStats()
  const rate = manager.getCompletionRate()
  document.getElementById("stats").innerHTML = `
    Total: ${stats.total}<br>
    Completed: ${stats.completed}<br>
    Pending: ${stats.pending}<br>
    Overdue: ${stats.overdue}<br>
    Completion rate: ${rate}%
  `
}