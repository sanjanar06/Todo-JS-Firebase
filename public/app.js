//Selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event){
    //Prevents form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Save to local storage
    // saveLocalTodos(todoInput.value);
    
    //Adding to the db
    db.collection("todo-items").add({
        Task:todoInput.value,
        status:"uncompleted"
    })
    .then((docRef) => {
        console.log("Added Document written with ID: ", docRef.id);
        newTodo.setAttribute('todo-id',docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    //Create completed btn
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Create trash btn
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to the list
    todoList.appendChild(todoDiv);

    //Clear the input
    todoInput.value=""; 

 
    
}

function deleteCheck(event){
    const item=event.target;

    //Delete
    if(item.classList[0]=="trash-btn"){
        const todo=item.parentElement;
        todo.classList.add("fall");
        // removeLocalTodos(todo);
        var id=todo.children[0].getAttribute("todo-id");
        removeDbTodo(id);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    //Completed
    if(item.classList[0]=="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
        updateStatus(todo);
    }

}

function filterTodo(e){
    const todos=document.querySelectorAll(".todo");
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display='flex';
                }
                else
                {
                    todo.style.display='none';
                }
                break;
            case "uncompleted": 
                if(!todo.classList.contains("completed")){
                    todo.style.display='flex';
                }
                else
                {
                    todo.style.display='none';
                }
                break;
        }
    })
}

// function saveLocalTodos(todo){
//     //CHECK
//     let todos;
//     if(localStorage.getItem('todos')==null){
//         todos=[];
//     }
//     else{
//         todos=JSON.parse(localStorage.getItem('todos'));
//     }
//     todos.push(todo);
//     localStorage.setItem("todos",JSON.stringify(todos));
// }

function getTodos(){
    //Retrieve from db
    db.collection("todo-items").get().then((querySnapshot) => {
        querySnapshot.forEach(function(todo){
            //Todo Div
            const todoDiv=document.createElement('div');
            todoDiv.classList.add('todo');
            if(todo.data().status=="completed")
            {
                todoDiv.classList.add('completed');
            }
            //Create LI
            const newTodo=document.createElement('li');
            newTodo.setAttribute('todo-id',todo.id);
            newTodo.textContent=todo.data().Task;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            //Create completed btn
            const completedButton=document.createElement('button');
            completedButton.innerHTML='<i class="fas fa-check"></i>';
            completedButton.classList.add('complete-btn');
            todoDiv.appendChild(completedButton);
            //Create trash btn
            const trashButton=document.createElement('button');
            trashButton.innerHTML='<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);

            //Append to the list
            todoList.appendChild(todoDiv);
        });
    });

    //Retrieve from local storage
    // let todos;
    // if(localStorage.getItem('todos')==null){
    //     todos=[];
    // }
    // else{
    //     todos=JSON.parse(localStorage.getItem('todos'));
    // }
    // todos.forEach(function(todo){
    //     //Todo Div
    //     const todoDiv=document.createElement('div');
    //     todoDiv.classList.add('todo');
    //     //Create LI
    //     const newTodo=document.createElement('li');
    //     newTodo.innerText=todo;
    //     newTodo.classList.add('todo-item');
    //     todoDiv.appendChild(newTodo);

    //     //Create completed btn
    //     const completedButton=document.createElement('button');
    //     completedButton.innerHTML='<i class="fas fa-check"></i>';
    //     completedButton.classList.add('complete-btn');
    //     todoDiv.appendChild(completedButton);
    //     //Create trash btn
    //     const trashButton=document.createElement('button');
    //     trashButton.innerHTML='<i class="fas fa-trash"></i>';
    //     trashButton.classList.add('trash-btn');
    //     todoDiv.appendChild(trashButton);

    //     //Append to the list
    //     todoList.appendChild(todoDiv);
    // });
}

function removeLocalTodos(todo){
    //CHECK
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));


}

function removeDbTodo(task){
    if(task)
    {
        db.collection("todo-items").doc(task).delete().then(function(){
            console.log("Document Deleted!");
        })
        .catch(function(){
            console.error("Error");
        })
        
    }  
   
}

function updateStatus(todo){
    var id=todo.children[0].getAttribute("todo-id");
    if(todo.classList.contains("completed"))
        {
            db.collection("todo-items").doc(id).update({
                status:"completed"
            });
        }
        else
        {
            db.collection("todo-items").doc(id).update({
                status:"uncompleted"
            });
        }
}