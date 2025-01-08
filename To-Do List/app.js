document.addEventListener("DOMContentLoaded", function() {
    let todoForm = document.querySelector("form");
    let todoInput = document.getElementById("todo-input");
    let todoListUL = document.getElementsByClassName("todo-list");

    let allTodos = getTodoLocalStorage();
    console.log(allTodos);
    updateTodoList();



    todoForm.addEventListener("submit", function(e){
        e.preventDefault();
        addTodo();
    })

    function addTodo(){
        const value = todoInput.value;
        const todoObj = {
            text : value,
            checked : false,
        }
        if(value != ""){
            allTodos.push(todoObj);
            updateTodoList();
            saveTodoLocalStorage();
            todoInput.value = "";
        }
        
    }

    function updateTodoList(){
        todoListUL[0].innerHTML = "";
        allTodos.forEach(function(todo, todoIndex){
            let newTodoList = createTodoItem(todo,todoIndex);
            todoListUL[0].appendChild(newTodoList);
        })
    }


    function createTodoItem(todo, todoIndex){
        const todoLI = document.createElement("li");
        todoLI.className = "todo";
        todoLI.draggable = true;
        todoLI.innerHTML = `
                <input type="checkbox" name="done" id="todo-${todoIndex}" />
                <label class="custom-checkbox" for="todo-${todoIndex}">
                    <i class="fa-solid fa-check"></i>
                </label>
                <label class="todo-text" for="todo-${todoIndex}">
                    ${todo.text}
                </label>
                <button type="button" class="delete-button" title="${todoIndex}">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
        `;

        const deleteBtn = todoLI.querySelector(".delete-button");
            deleteBtn.addEventListener("click", ()=>{
                deleteTodo(todoIndex);
            });
        const checkbox = todoLI.querySelector("input");
        checkbox.addEventListener("change", ()=>{
            allTodos[todoIndex].checked = checkbox.checked
            saveTodoLocalStorage();
            //updateTodoList();
       });
        checkbox.checked = todo.checked;
        return todoLI
    }

    function deleteTodo(todoIndex){
        allTodos = allTodos.filter((_, i) => i !== todoIndex);
        saveTodoLocalStorage();
        updateTodoList();
    }

    function saveTodoLocalStorage(){
        const todosJson = JSON.stringify(allTodos)
        localStorage.setItem("todos", todosJson);
    }

    function getTodoLocalStorage(){
        let todosJson = localStorage.getItem("todos"); 
            return JSON.parse(todosJson) || []; 
    }
   
})