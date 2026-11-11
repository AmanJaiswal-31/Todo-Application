
let todos = [
    {
        id: Date.now() + 1,
        text: "Go to Gym",
        isCompleted: false
    },
    {
        id: Date.now() + 2,
        text: "Play PubG",
        isCompleted: false
    },
    {
        id: Date.now() + 3,
        text: "Revision Of WEBDEV",
        isCompleted: false
    },

]

let editTodoId = null

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const todoCount = document.querySelector("#task-count")
const todoComplete = document.querySelector("#task-complete")
const formBtn = document.querySelector("#form-btn")
const emptyState = document.querySelector("#empty-state")
const cancelBtn = document.querySelector("#Cancel-btn")


todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoValue = todoInput.value.trim()

    if (!todoValue) {
        return
    }

    if (editTodoId) {
        todos = todos.map((todo) => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                }
            }
            return todo
        })

        editTodoId = null
        todoList.innerHTML = ''
        renderTodo()
        cancelEditing()
    }


    else {

        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false,
        }

        todos.push(newTodo)
        Count()
        addTodo(newTodo)
        emptyState.classList.add('hidden')

    }
    todoInput.value = ""
    console.log(todos)
})

function renderTodo() {
    todos.forEach((todo) => {
        addTodo(todo)
    })

    todoComplete.textContent = `COMPLETED : ${todos.filter((todo) => todo.isCompleted === true).length} `

    emptyState.classList.toggle('hidden', todos.length !== 0)
}
renderTodo()

function addTodo(todo) {
    const li = document.createElement("li")
    // li.textContent = todo.text
    li.dataset.id = todo.id
    li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`
    li.innerHTML =
        `
                <input data-id=${todo.id} type="checkbox"  ${todo.isCompleted === true ? 'checked' : ""}>
                <p class="flex-1 ${todo.isCompleted === true ? 'line-through text-red-400' : ''}" >${todo.text}</p>
                <div class="flex gap-3">
                    <button data-action="edit" class="px-2.5 py-1.5 rounded-md text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer" data-id=${todo.id}>Edit</button>
                    <button data-action="delete" class="px-2.5 py-1.5 rounded-md text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer" data-id=${todo.id}>Delete</button>
                </div>
        `
    todoList.append(li)
}

//Event Deligation

todoList.addEventListener("click", (e) => {

    let li = e.target.closest('li')
    let btn = e.target.closest('button')
    let action = btn?.dataset.action
    let id = li?.dataset?.id
    let checkbox = e.target.closest('input[type="checkbox"]')
    // console.log(checkbox)

    if (action === 'edit') {
        startEdit(id)
    }

    if (action === 'delete') {


        deleteTodo(e, id)
    }

    if (checkbox) {
        console.log("toggling")
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }

            return todo
        })
        todoList.innerHTML = ''
        renderTodo()
        console.log(todos)
    }
})


function deleteTodo(e, id) {
    // console.log("deleting..")

    e.target.closest('li').remove()

    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })
    console.log(todos)
    emptyState.classList.toggle('hidden', todos.length !== 0)

    Count()
}

function startEdit(id) {
    editTodoId = id

    let currentTodo = todos.find((todo) => {
        if (todo.id === Number(id)) {
            return todo
        }
    })

    todoInput.value = currentTodo.text
    formBtn.textContent = 'Update'
    formBtn.className = "px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors cursor-pointer";
    cancelBtn.className.remove('hidden')
    todoInput.focus()
}

function cancelEditing(){
    cancelBtn.classList.add('hidden')
    formBtn.textContent = 'Add'
    formBtn.classList = 'px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer'
    todoInput.value = ""
}

cancelBtn.addEventListener('click',()=>{
    cancelEditing()
})

function Count() {
    let count = todos.length
    todoCount.textContent = `Task(${count})`
}
Count()
