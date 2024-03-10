const taskli = document.querySelectorAll('.task-li');
const newsection = document.querySelector('.list-h1');
const listlinesec = document.querySelector('.list-line');
const removeButtons = document.querySelectorAll('.list-removebtn button');
const removebtn = document.querySelectorAll('.removebtn');
const addbutton = document.querySelector('.input-btn');
const formsection = document.getElementById('form-sec');
const savebtn = document.querySelectorAll('.formbtn');
const taskNameInput = document.querySelectorAll('.form-in input[type="text"]');
const listSection = document.querySelector('.listsection-task');
let listItems = document.querySelectorAll('.listsection-task li');

for( let i = 0; i < taskli.length; i++){
    
    taskli[0].addEventListener('click', function(a){
        
    })


    taskli[1].addEventListener('click', function(e){
        let newh1 = e.target.textContent;
        newsection.innerHTML = '<h1>' + newh1 + '</h1>';
        listlinesec.style.display = 'flex'; 
        localStorage.setItem('todayContent', newh1);
        e.preventDefault();
    })

}


window.addEventListener('DOMContentLoaded', function() {
    const storedContent = localStorage.getItem('todayContent');
    if (storedContent) {
        document.querySelector('.list-h1 h1').textContent = storedContent;
        listlinesec.style.display = 'flex';
    }

    if(localStorage["tasks"]){
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        for (let task in tasks){
            const listItem = document.createElement('li');
            listItem.innerHTML = '<input class="listCheckbox" type="checkbox"> ' 
                + task + ' <span><i class="fa-solid fa-angle-right"></i></span>';
            listSection.appendChild(listItem);
            listItem.querySelector('input[type="checkbox"]').addEventListener('change', toggleRemoveButtons);
        }
        toggleRemoveButtons();  
    }

});

function toggleRemoveButtons() {
    let checkboxes = document.querySelectorAll('.listsection-task input[type="checkbox"]');
    let checked = false;
    
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', toggleRemoveButtons);
        if (checkboxes[i].checked) {
            checked = true;
        }
    }

    if (checked) {
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].style.display = 'inline-block';
        }
    } else {
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].style.display = 'none';
        }
    }
}

function saveToList() {
    let taskName = taskNameInput[0].value;
    if (taskName !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = '<input class="listCheckbox" type="checkbox"> ' + taskName + ' <span><i class="fa-solid fa-angle-right"></i></span>';
        listSection.appendChild(listItem);
        taskNameInput[0].value = '';

        let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        tasks[taskName] = taskName;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        listItem.querySelector('input[type="checkbox"]').addEventListener('change', toggleRemoveButtons);
        toggleRemoveButtons();

    } else {
        alert('Please enter a task name.');
    }
}

for(let i = 0; i < savebtn.length; i++) {
    savebtn[0].addEventListener('click', function(){
        formsection.style.display = 'none';
    })
    savebtn[1].addEventListener('click', saveToList);

}

function removelist() {
    let checkboxes = document.querySelectorAll('.listsection-task input[type="checkbox"]');
    let listItems = document.querySelectorAll('.listsection-task li');
    for(let i = 0; i < listItems.length; i++) {
        if(checkboxes[i].checked) {
            let taskName = checkboxes[i].nextSibling.textContent.trim();
            listItems[i].remove();

            let tasks = JSON.parse(localStorage.getItem("tasks"));
            delete tasks[taskName];
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    toggleRemoveButtons();
}

for(let i = 0; i < removebtn.length; i++) {
    removebtn[0].addEventListener('click', removelist);
    removebtn[1].addEventListener('click', function(a) {
    let checkboxes = document.querySelectorAll('.listsection-task input[type="checkbox"]');
    let listItems = document.querySelectorAll('.listsection-task li');
        for(let i = 0; i < listItems.length; i++) {
            if(checkboxes[i].checked) {
                listItems[i].classList.add('text-completed');	
                checkboxes[i].checked = false;
                checkboxes[i].disabled = true;
            }
        }

        let listicon = document.querySelectorAll('.listsection-task li i');
        for(let i = 0; i < listicon.length; i++){
            listicon[i].setAttribute("class", "fa-regular fa-circle-check");
        }
    })
}

addbutton.addEventListener('click', function() {
    formsection.style.display = 'flex';
} )