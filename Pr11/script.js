class Animal {
    #hunger
    #energy
    constructor(name, age, species) {
        this.name = name
        this.age = age
        this.species = species

        this.#hunger = 50
        this.#energy = 50
    }
    eat(food) {
        this.#hunger = Math.max(0, this.#hunger - food)
    }
    sleep(hours) {
        this.#energy = Math.min(100, this.#energy + hours * 10)
    }
    move() {
        this.#energy = Math.max(0, this.#energy - 10)
        this.#hunger = Math.min(100, this.#hunger + 10)
    }
    getState() {
        return {
            hunger: this.#hunger,
            energy: this.#energy
        }
    }
    makeSound() {
        return "Some sound"
    }
    static classify(animal) {
        if (animal instanceof Mammal) return "Mammal"
        if (animal instanceof Bird) return "Bird"
        if (animal instanceof Fish) return "Fish"
        return "Unknown"
    }
}

class Mammal extends Animal {
    constructor(name, age, species, furColor, legs) {
        super(name, age, species)
        this.furColor = furColor
        this.legs = legs
    }
    makeSound() {
        return "Mammal sound"
    }
}

class Bird extends Animal {
    constructor(name, age, species, canFly, wingSpan) {
        super(name, age, species)
        this.canFly = canFly
        this.wingSpan = wingSpan
    }
    makeSound() {
        return "Chirp"
    }
}

class Fish extends Animal {
    constructor(name, age, species, waterType) {
        super(name, age, species)
        this.waterType = waterType
    }
    makeSound() {
        return "Blub"
    }
}

class Zoo {
    constructor() {
        this.animals = []
    }
    add(animal) {
        this.animals.push(animal)
    }
    feedAll() {
        this.animals.forEach(a => a.eat(20))
    }
    getStats() {
        const total = this.animals.length
        const avgHunger = this.animals.reduce((s, a) => s + a.getState().hunger, 0) / total
        const avgEnergy = this.animals.reduce((s, a) => s + a.getState().energy, 0) / total
        return { total, avgHunger, avgEnergy }
    }
    filter(type) {
        if (type === "all") return this.animals
        return this.animals.filter(a => {
            return Animal.classify(a).toLowerCase() === type
        })
    }
}

const zoo = new Zoo()
zoo.add(new Mammal("Lion", 5, "Lion", "yellow", 4))
zoo.add(new Bird("Eagle", 3, "Eagle", true, 2))
zoo.add(new Fish("Shark", 7, "Shark", "salt"))
const list = document.getElementById("list")
const statsDiv = document.getElementById("stats")
const filter = document.getElementById("filter")

function render() {
    const animals = zoo.filter(filter.value)
    list.innerHTML = ""
    animals.forEach(a => {
        const state = a.getState()
        const div = document.createElement("div")
        div.className = "animal"
        div.innerHTML = `
${a.name} (${a.species})<br>
Type: ${Animal.classify(a)}<br>
Hunger: ${state.hunger}<br>
Energy: ${state.energy}<br>
Sound: ${a.makeSound()}<br>
<button onclick="care('${a.name}')">Care</button>
`
        list.appendChild(div)
    })
    const stats = zoo.getStats()
    statsDiv.innerHTML = `
Total: ${stats.total}<br>
Avg Hunger: ${stats.avgHunger.toFixed(1)}<br>
Avg Energy: ${stats.avgEnergy.toFixed(1)}
`
}

function feedAll() {
    zoo.feedAll()
    render()
}

function care(name) {
    const animal = zoo.animals.find(a => a.name === name)
    animal.eat(10)
    animal.sleep(2)
    render()
}

filter.addEventListener("change", render)
render()