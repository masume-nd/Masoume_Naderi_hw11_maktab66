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

// get item from local storage
//let data = localStorage.getItem("TODO")
// check if data is not empty

//     LIST = JSON.parse(data);
//     id = LIST.length; // set id
//     loadList(LIST); // load the list the user interface


// //load items to the user's interface
// function loadList(array) {
//     array.forEach(function(item) {
//         addToDo(item.name, item.id, item.done, item.trash , item.status)
//     });
// }

// clear.addEventListener('click' ,()=>{
//     localStorage.clear();
//     location.reload();
// })

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

}

allTasks.addEventListener("click", (e) => {
list.innerHTML = "";
const tasks = JSON.parse(localStorage.getItem("TODO"));
console.log(tasks)
if (tasks) {
    tasks.forEach((task) => {
    localStorage.setItem("TODO", JSON.stringify(LIST));    
    counter();
    });
}
});

completedTasks.addEventListener("click", (e) => {
list.innerHTML = "";
const tasks = localStorage.getItem("TODO");
if (tasks) {
    tasks
    .filter((item) => item.checked)
    .forEach((task) => {
    localStorage.setItem("TODO", JSON.stringify(LIST.status==2));    
        counter();
    });
}
});

ActiveTasks.addEventListener("click", (e) => {
list.innerHTML = "";
const tasks = JSON.parse(localStorage.getItem("TODO"));
if (tasks) {
    tasks
    .filter((item) => !item.checked)
    .forEach((task) => {
    localStorage.setItem("TODO", JSON.stringify(LIST.status==1));  
        counter();
    });
}
});
  

document.addEventListener("keydown", function(event) {
    if(event.key == "Enter"){
        const task = input.value;
        event.preventDefault();

        //if the input isn't empty
        if(task){
            addToDo(task , id , false , false , 1);
            LIST.push({
                name : task,
                id : id,
                done : false,
                trash : false,
                status : 1
            });
            //add items to local storage (this code must be added where the list array apdated)
           // localStorage.setItem("TODO", JSON.stringify(LIST));    
            id++;
        }
    }
}); 

//complete to do

function completeToDo(element) {
    const CHECK = "fa-check"
    const UNCHECK = "fa-circle-thin"
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.classList.toggle(class_icon_done);
    element.classList.toggle(class_icone_active);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;
    LIST[element.id].status = 2;

}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener('click' , (event) => {

    const element = event.target;
    const elementJob = element.getAttribute("job");
     if(elementJob == "delete") {
         removeToDo(element);
    } else if(elementJob == "complete") {
            completeToDo(element)
    }

    //add items to local storage
  //  localStorage.setItem("TODO", JSON.stringify(LIST));
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


