function createStore(reducer, initialState, middleware) {
    let state = initialState
    let listeners = []
    
    function getState() {
        return state
    }

    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(l => l())
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    if (middleware) {
        const originalDispatch = dispatch
        dispatch = middleware({
            getState,
            dispatch: (action) => dispatch(action)
        })(originalDispatch)
    }
    return { getState, dispatch, subscribe }
}

function combineReducers(reducers) {
    return function (state = {}, action) {
        const newState = {}
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action)
        }
        return newState
    }
}

const ADD = "ADD"
const REMOVE = "REMOVE"

const addTask = (text) => ({
    type: ADD,
    payload: text
})

const removeTask = (id) => ({
    type: REMOVE,
    payload: id
})

function todoReducer(state = [], action) {
    if (action.type === ADD) {
        return [
            ...state,
            { id: Date.now(), text: action.payload }
        ]
    }

    if (action.type === REMOVE) {
        return state.filter(t => t.id !== action.payload)
    }
    return state
}

const logger = ({ getState }) => next => action => {
    console.log("Action:", action)
    next(action)
    console.log("State:", getState())
}

const rootReducer = combineReducers({
    todos: todoReducer
})

const store = createStore(rootReducer, { todos: [] }, logger)
const input = document.getElementById("taskInput")
const btn = document.getElementById("addBtn")
const list = document.getElementById("list")

btn.addEventListener("click", () => {
    const text = input.value.trim()
    if (!text) {
        return
    }
    store.dispatch(addTask(text))
    input.value = ""
})

list.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const id = Number(e.target.dataset.id)
        store.dispatch(removeTask(id))
    }
})

function render() {
    const state = store.getState()
    list.innerHTML = ""
    state.todos.forEach(task => {
        const li = document.createElement("li")
        li.textContent = task.text
        li.dataset.id = task.id
        list.appendChild(li)
    })
}
store.subscribe(render)
render()