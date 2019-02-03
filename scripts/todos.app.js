'use strict'

const todos = getSavedTodos();

//filter
const filter = {
    text : '',
    filterFunction : function(e) {
        return e.text.toLowerCase().includes(this.text.toLowerCase());
    }
}

const hideCompleted = {
    hide : false,
    filterFunction : function(e) {
        return this.hide ? true : e.completed === this.hide;
    }
}

document.querySelector('#search-text').addEventListener('input',e =>{
    filter.text = e.target.value;
    renderTodos(todos,filter);
});

renderTodos(todos,filter);

document.querySelector("#form-todo").addEventListener('submit',element =>{
    const text = element.target.elements.todoText.value.trim();
    if (text) {
        element.preventDefault();
        todos.push({
            id: uuidv4(),
            text,
            completed : false
        })
        saveTodos(todos);
        renderTodos(todos,filter);
        element.target.elements.todoText.value = '';
    }
});

document.querySelector("#showCompleted").addEventListener('change',e =>{
    hideCompleted.hide = e.target.checked;
    renderTodos(todos,hideCompleted);
})
