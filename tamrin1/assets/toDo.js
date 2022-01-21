const switcher = document.querySelector('input[Type="checkbox"]')
const clear = document.querySelector('.clear')
const form = document.querySelector('#task-form');
const input = document.querySelector('#tasks-input');
const body = document.body;
const list = document.querySelector('#tasks');
const allTasks = document.querySelector('#All');
const ActiveTasks = document.querySelector('#Active');
const completedTasks = document.querySelector('#Completed');

const class_icon_done = "check-circle"
const class_icone_active = "uncheck-circle"
const check = "fa fa-check"// "ic:outline-done" 
const uncheck ="fa fa-circle-thin" // "akar-icons:circle"
const line_through = "lineThrough"

switcher.addEventListener("change", (e) => {
      body.classList.toggle("light", "dark");
      body.classList.toggle("dark", "light");
    
 });


//Variables
let LIST = [],id = 0;

class Store{
    static getToDoes() {
       let todos;
       if(localStorage.getItem("ToDo") === null){
           todos = []
       } else{
           todos = JSON.parse(localStorage.getItem("ToDo")) 
       }
       return todos
    }

    static addToDo(toDo, id , done , trash , status) {
      const todos =  Store.getToDoes();

      todos.push({
          name : toDo,
          id : Date.now(),
          done: false,
          trash : false,
          status : 1
      })
      localStorage.setItem("ToDo" , JSON.stringify(todos))
    }
}



function addToDo(toDo, id , done ,trash , status) {

    if(trash){return;}
    
    const STYLE = done ? class_icon_done :  class_icone_active ;
    const DONE = done ? check : uncheck;
    const LINE = done? line_through : "";
    const item = `<li class="task">
                    <i class="${DONE} ${STYLE}" job="complete" id="${id}"></i>
                    <input class="${LINE} text" type="text" value="${toDo}">
                    <i class="fa fa-times" job="delete" id="${id}"></i>
                </li>
                `;

    const position = "beforeend"

    list.insertAdjacentHTML(position , item)
    // Store.addToDo(toDo,id)
}

allTasks.addEventListener("click", (e) => {
    list.innerHTML = "";
    displayToDo()
// list.innerHTML = "";
// const tasks = Store.getToDoes();
// if (tasks) {
//     tasks.forEach((task) => {
//     localStorage.setItem("ToDo", JSON.stringify(LIST));    
//     counter();
//     });
// }
});

completedTasks.addEventListener("click", (e) => {
    list.innerHTML = "";
    const tasks = Store.getToDoes();
    tasks.forEach((item) =>{
        if(item.done){
            displayToDo()
        }
    })
    
// if (tasks) {
//     tasks
//     .filter((item) => item.done)
//     .forEach((task) => {
//     localStorage.setItem("ToDo", JSON.stringify(LIST.status==2));    
//         counter();
//     });
// }
});

ActiveTasks.addEventListener("click", (e) => {
list.innerHTML = "";
const tasks = Store.getToDoes();
tasks.forEach((item) =>{
    console.log(item); 
    if(!item.done){
        displayToDo()
    }
})
});
  
document.addEventListener("DOMContentLoaded" , displayToDo)


document.addEventListener("keydown", function(event) {
    if(event.key == "Enter"){
        const task = input.value;
        event.preventDefault();

        //if the input isn't empty
        if(task){
            addToDo(task , Date.now() , false , false , 1);
            Store.addToDo(task,id);
        }
    }
}); 


function displayToDo() {
    const todos = Store.getToDoes();
    todos.forEach((item)=>{
        addToDo(item.name, item.id, item.done, item.trash , item.status)
    });
}
function clearToDo(){
    list.innerHTML = "";
    localStorage.clear();
}
//complete to do

function completeToDo(element) {
    console.log(element);
    const CHECK = "fa-check"
    const UNCHECK = "fa-circle-thin"
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.classList.toggle(class_icon_done);
    element.classList.toggle(class_icone_active);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    
    const curID = element.attributes.id.value;
    const todos = Store.getToDoes();
    todos.forEach((todo , index) =>{
        if(+todo.id === +curID){
            todos[index].done = todos[index].done? false: true;
            todos[index].status = 2;
        }
    })
  


}

function removeToDo(element) {
    console.log(element);
    element.parentNode.parentNode.removeChild(element.parentNode);

    const curID = element.attributes.id.value;
    const todos = Store.getToDoes();

    todos.forEach((todo , index) =>{
        if(+todo.id === +curID){
            todos.splice(index , 1);
            todos[index].trash = true;
        }
    })
    localStorage.setItem("ToDo", JSON.stringify(todos));

}

list.addEventListener('click' , (event) => {

    const element = event.target;

    const elementJob = element.getAttribute("job");
     if(elementJob == "delete") {
        removeToDo(element);
    } else if(elementJob == "complete") {
        completeToDo(element);
    }

    //add items to local storage
    localStorage.setItem("ToDo", JSON.stringify(LIST));
});



const counter = () => {
    const itemsCounter = LIST.filter((task) => !task.done);
    const count = document.getElementById("todosLeft");
  
    const counterString = itemsCounter.length === 1 ? "item" : "items";
  
    count.innerText = `${itemsCounter.length} ${counterString} left`;
  };




























// function changeIcons(circleIcons) {
//     for(let circleIcon of circleIcons){
//         circleIcon.addEventListener('click' , (event) => {
//             let item = null
//           if(event.target.tagName == "svg"){
//             // console.log("yes");
//             item = event.target.parentElement;
            
//           } else {
//               item = event.target
//             }
//           completeToDo(item.children[0]);
      
//         });
//     }
// }







//window.addEventListener('load' , () =>{
// const button = document.getElementsByClassName('submitt')[0];

// form.addEventListener('submit',function(event){

//         event.preventDefault();
    
//         task = input.value
           
//         if(!task) {
//             alert("please add a task!");
//             return;
//         }

//         const task_el = document.createElement("li");
//         task_el.classList.add('task');
        
//         const task_content_el = document.createElement("div");
//         task_content_el.classList.add('content');
//         task_content_el.innerText = task;
//         task_el.appendChild(task_content_el);
        
        
//         const task_done_el = document.createElement('span');
//         task_done_el.classList = 'done-icon'
//         task_done_el.setAttribute("data-icone","ic:baseline-done")
//         task_content_el.appendChild(task_done_el)

//         const task_input_el = document.createElement('input')
//         task_input_el.classList = 'text';
//         task_input_el.type = "text";
//         task_input_el.value = task;
        
    
//         task_content_el.appendChild(task_input_el)
  

//         // const task_action_el = document.createElement("div")
//         // task_action_el.classList.add('action');
//         // task_content_el.appendChild(task_action_el)

       
//         // const task_delete_el = document.createElement('button')
//         // task_delete_el.classList.add('delete')
//         // task_delete_el.innerText = "&times;"
//         // task_action_el.appendChild(task_delete_el)

//         // task_delete_el.addEventListener('click', () => {
//         //     list_el.removeChild(task_el)
//         // })

        
//         list_el.appendChild(task_el);
    
//     });
    

// });


