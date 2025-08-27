import { deleteTask, reviseTask } from "./tasks.js";

export let currentProject = null;
export const projectArray = [];
let count = 0;

class Project {
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.tasks = [];
    }
    
    addTask(task){
        this.tasks.push(task)
    }
}

export function createProject(){
    const projectName = document.getElementById("project-name");
    projectName.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            const project = new Project(projectName.value, count);
            count++;
            projectName.value = "";
            currentProject = project;
            projectArray.push(project);

            renderProject(currentProject);
            renderTasks(currentProject);
        }
    })
}


export function renderTasks (project) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    const projectHeader = document.createElement("h2");
    container.append(projectHeader)

    projectHeader.textContent = project.name;
    
    project.tasks.forEach((task, i) => {
        const taskCard = document.createElement("div");
        taskCard.id = `${task.name}-${i}`;
        taskCard.dataset.index = i
        console.log(taskCard.id)
        const taskDeleteBtn = document.createElement("button");
        taskDeleteBtn.textContent = "Delete";
        taskDeleteBtn.className = "task-delete";
        const taskReviseBtn = document.createElement("button");
        taskReviseBtn.textContent = "Change";
        taskReviseBtn.className = "task-revise";
        taskCard.textContent = `${task.name} - ${task.date} > ${task.descr} > ${task.priority}`
        container.append(taskCard)
        taskCard.append(taskDeleteBtn, taskReviseBtn)
    })
    deleteTask();
    reviseTask();
}

function renderProject (project) {
    const projectContainer = document.getElementById("project-container");
    const projectLabelContainer = document.createElement("div");
    projectLabelContainer.id = "label-container"
    const projectSelectBtn = document.createElement("button")
    projectSelectBtn.className = "projects";
    projectSelectBtn.textContent = project.name;
    projectSelectBtn.id = project.id;
    const projectDeleteBtn = document.createElement("button");
    projectDeleteBtn.className = "project-delete";
    projectDeleteBtn.id = project.id;
    projectDeleteBtn.textContent = "Delete";
    projectContainer.append(projectLabelContainer);
    projectLabelContainer.append(projectSelectBtn, projectDeleteBtn);
    

    document.querySelectorAll(".projects").forEach(el => {
        el.classList.remove("active-project", "inactive-project");
    });
    projectSelectBtn.classList.add("active-project");
    activeProject();
    projectDelete();
    
}

//Selecting current Project (using btn) 
export function activeProject() {
    document.querySelector("#project-container").addEventListener('click', (e) => {
        if(e.target.className === "projects") {
            console.log(e.target.id);
            console.log(`${currentProject.id} is current`)
            e.target.classList.add("active-project");

          
            //find index of Project in projectArray associated with projectSelectBtn
            const index = projectArray.findIndex(obj => obj.id.toString() === e.target.id);
            
            if(index !== -1 && currentProject.id !== e.target.id.toString()){
                currentProject = projectArray[index];
                console.log(`${currentProject.id} is now`);
                renderTasks(currentProject);

                 document.querySelectorAll(".projects").forEach(el => {
                el.classList.remove("active-project", "inactive-project");
    });
                e.target.classList.add("active-project");

            }
}
    })
}

function projectDelete(){
     document.querySelector("#project-container").onclick = (e) => {
            if(e.target.className === "project-delete") {
            const index = projectArray.findIndex(obj => obj.id.toString() === e.target.id);
            console.log(e.target.id)
            console.log(e.target.parentNode.id)
            
            if(confirm(`Are you sure you want to delete ${projectArray[index].name} and all tasks?`)){
                console.log(projectArray[index])
                e.target.closest("#label-container").remove();
                
              

              
                
            } 
            }  
    };
}

    

