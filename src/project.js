import { deleteTask, reviseTask } from "./tasks.js";

export let currentProject = null;
export const projectArray = [];

class Project {
    constructor(name){
        this.name = name;
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
            const project = new Project(projectName.value);
            projectName.value = "";
            currentProject = project;
            projectArray.push(project);
            console.log(project)
            renderProject(currentProject);
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
    const projectSelectBtn = document.createElement("button")
    projectSelectBtn.className = "projects";
    projectSelectBtn.textContent = project.name;
    projectContainer.append(projectSelectBtn);
}

