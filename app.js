const form = document.querySelector('#todoForm');
const inputText = document.querySelector('#task');
const todoList = document.querySelector('#list');
const alertWarning = document.querySelector('.alert-warning');
const alertSuccess = document.querySelector('.alert-success');


let todos = [];

runEvents();

function runEvents() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', pageLoaded);
    todoList.addEventListener('click', removeTodoToUI);
};

function pageLoaded() {
    checkTodos();
    todos.forEach(todo => {
        addTodoUI(todo);
    });
};

function removeTodoToUI(e) {
    if (e.target.className === "fa-solid fa-xmark"){
        const todo = e.target.parentElement.parentElement;
        removeTodoStorage(todo.innerText);
        todo.remove(); 
    }
};

function removeTodoStorage(todoToRemove) {
    checkTodos();
    todos = todos.filter(todo => todo !== todoToRemove);
    localStorage.setItem('todos', JSON.stringify(todos));
};


function addTodo(e) {
    e.preventDefault();

    const inputValue = inputText.value.trim();
    if(inputValue == null || inputValue == "") {
        alertWarning.style.display = 'block';
        setTimeout(() => {
            alertWarning.style.display = 'none';
        }, 1500);

        inputText.value = "";
    }else {
        alertSuccess.style.display = 'block';
        setTimeout(() => {
            alertSuccess.style.display = 'none';
        }, 1500);

        addTodoUI(inputValue);
        addTodoStorage(inputValue);
    }
}


function addTodoUI(newTodo) {
    const todoLi = document.createElement('li');
    todoLi.classList.add('list-element');
    todoLi.innerHTML = newTodo;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    

    todoList.appendChild(todoLi);
    todoLi.appendChild(deleteButton);

    inputText.value = "";
};


function addTodoStorage(newTodo) {
    checkTodos();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
};


function checkTodos() {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
};


  