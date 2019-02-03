//save from local storage
'use strict'

const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos');
    try {
        return todoJSON  ? JSON.parse(todoJSON) : [];
    } catch (e) {
        return [];
    }
}

const saveTodos = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos));
}

const findTodoById = (id) =>{
    return todos.findIndex((todo) => todo.id === id);
}

const removeTodo = (id) => {
    const todoId = findTodoById(id); 
    if (todoId > -1) {
        todos.splice(todoId,1);
    }
}

const toggleTodo = (id) => {
    const todoId = findTodoById(id); 
    if (todoId > -1) {
        todos[todoId].completed = !todos[todoId].completed;
    }
}

const renderTodos = function(todos,filter) {
    const filteredTodos = todos.filter(e => filter.filterFunction(e));
    const todosList = document.querySelector('#todos');
    todosList.innerHTML = '';
    todosList.appendChild(generateSummaryDom(filteredTodos));
    if (filteredTodos.length > 0) {
        filteredTodos.forEach(note => {
            todosList.appendChild(generateTodoDom(note));
        })
    } else {
        const emptyTodo = document.createElement('p');
        emptyTodo.classList.add('empty-message');
        emptyTodo.textContent = 'No todos';
        todosList.appendChild(emptyTodo);
    }
};

const generateTodoDom = todo => {
    const todoEl = document.createElement('label');
    const container = document.createElement('div');
    const checkbox = document.createElement('input');
    const button = document.createElement('button');
    const paragraph = document.createElement('span');

    
    checkbox.setAttribute('type','checkbox');
    checkbox.checked = todo.completed;
    
    checkbox.addEventListener('click', () =>{
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filter);
    })
    button.textContent = 'remove';
    button.classList.add('button','button-text')
    paragraph.textContent = todo.text;
    
    todoEl.classList.add('list-item')
    container.classList.add('list-item__container')
    container.appendChild(checkbox);
    container.appendChild(paragraph);
    todoEl.appendChild(container);
    todoEl.appendChild(button);
    button.addEventListener('click',() => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filter);
    })
    return todoEl;
}

const generateSummaryDom = (filteredTodos) => {
    const summary = document.createElement('h2');
    summary.classList.add("list-title")
    summary.textContent = (`You have ${filteredTodos.length} `) + (filteredTodos.length > 0 ? 'todos' : 'todo' +  ' left');
    console.log(summary);
    return summary;
}
