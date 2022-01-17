window.addEventListener('load', ()=>{
const form = document.querySelector('#task-form')
const input = document.querySelector('#tasks-input')
const list_el = document.querySelector('#tasks')


    form.addEventListener("keyup", (event)=> {
    
        if (event.keyCode === 13) {
        event.preventDefault();
    
        const task = input.value
        if(!task) {
            alert("please add a task!");
            return;
        }
        const task_el = document.createElement("li");
        task_el.classList.add('task');

        const task_content_el = document.createElement("div");
        task_content_el.classList.add('content');
        task_content_el.innerText = task

        task_el.appendChild(task_content_el);

        

        const task_input_el = document.createElement('input')
        task_input_el.classList.add('text');
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute('readonly' , 'readonly')

        task_content_el.appendChild(task_input_el)
        
        
        const task_action_el = document.createElement("div")
        task_action_el.classList.add('action');

        const task_delete_el = document.createElement('button')
        task_delete_el.classList.add('delete')
        task_delete_el.innerHTML = '&times'
        
        task_delete_el.appendChild(task_action_el)
        
        
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el)
        })
        list_el.appendChild(task_el)
    }
    });
})
