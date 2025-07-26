// main.js

// --- Clock ---
(function () {
    const clock = document.querySelector('#clock');

    function updateClock() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        clock.textContent = now.toLocaleTimeString('en-US', options);
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call
})();

// --- Login ---
(function () {
    const loginSection = document.querySelector('#login-section');
    const loginForm = document.querySelector('#login-form');
    const loginInput = loginForm.querySelector('input');
    const greetingSection = document.querySelector('#greeting-section');
    const greeting = greetingSection.querySelector('#greeting');

    const HIDDEN_CLASSNAME = 'hidden';
    const USERNAME_KEY = 'username';

    function onLoginSubmit(event) {
        event.preventDefault();
        loginSection.classList.add(HIDDEN_CLASSNAME);
        const username = loginInput.value;
        localStorage.setItem(USERNAME_KEY, username);
        paintGreetings(username);
    }

    function paintGreetings(username) {
        greeting.innerText = `Hello ${username}`;
        greetingSection.classList.remove(HIDDEN_CLASSNAME);
    }

    const savedUsername = localStorage.getItem(USERNAME_KEY);

    if (savedUsername === null) {
        loginSection.classList.remove(HIDDEN_CLASSNAME);
        loginForm.addEventListener('submit', onLoginSubmit);
    } else {
        paintGreetings(savedUsername);
    }
})();

// --- To-Do List ---
(function () {
    const toDoForm = document.getElementById('todo-form');
    const toDoInput = toDoForm.querySelector('input');
    const toDoList = document.getElementById('todo-list');

    const TODOS_KEY = 'todos';
    let toDos = [];

    function saveToDos() {
        localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    }

    function deleteToDo(event) {
        const li = event.target.parentElement;
        li.remove();
        toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
        saveToDos();
    }

    function paintToDo(newTodo) {
        const li = document.createElement('li');
        li.id = newTodo.id;
        const span = document.createElement('span');
        span.innerText = newTodo.text;
        const button = document.createElement('button');
        button.innerText = '❌';
        button.addEventListener('click', deleteToDo);
        li.appendChild(span);
        li.appendChild(button);
        toDoList.appendChild(li);
    }

    function handleToDoSubmit(event) {
        event.preventDefault();
        const newTodo = toDoInput.value;
        toDoInput.value = '';
        const newTodoObj = {
            text: newTodo,
            id: Date.now(),
        };
        toDos.push(newTodoObj);
        paintToDo(newTodoObj);
        saveToDos();
    }

    toDoForm.addEventListener('submit', handleToDoSubmit);

    const savedToDos = localStorage.getItem(TODOS_KEY);

    if (savedToDos !== null) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(paintToDo);
    }
})();
