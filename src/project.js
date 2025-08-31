import { deleteTask, reviseTask } from "./tasks.js";
import { storeProjects } from "./storage.js";

export const state = {
    currentProject: null,
    count: 0
}



export const projectArray = [];
/*export let count = 0;
export let currentProject = null;

export function setCurrentProject(project) {
    currentProject = project;
}
export function getCurrentProject() {
    //return currentProject;
}

export function setCount(value) {
    count = value;
}
export function getCount() {
    return count;
}
*/

export class Project {
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
            const project = new Project(projectName.value, state.count);
            state.count++;
            projectName.value = "";
            state.currentProject = project;
            projectArray.push(project);

            renderProject(state.currentProject);
            renderTasks(state.currentProject);
           
            
        }
    })
}


export function renderTasks (project) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    const projectHeader = document.createElement("h2");
    projectHeader.className = "project-header"
    container.append(projectHeader)

    projectHeader.textContent = project.name;
    
    project.tasks.forEach((task, i) => {
        const taskCard = document.createElement("div");
        taskCard.id = `${task.name}-${i}`;
        taskCard.className = "task-card"
        taskCard.dataset.index = i
        //console.log(taskCard.id)
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
    storeProjects(projectArray)
}

export function renderProject (project) {
    const projectContainer = document.getElementById("project-container");
    //projectContainer.textContent = "Projects"
    const projectLabelContainer = document.createElement("div");
    projectLabelContainer.id = "label-container"
    projectLabelContainer.className = "label-container"
    const projectSelectBtn = document.createElement("button")
    projectSelectBtn.className = "projects";
    projectSelectBtn.textContent = project.name;
    projectSelectBtn.id = `button${project.id}`;
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

export function activeProject() {
    document.querySelector("#project-container").addEventListener("click", (e) => {
        if (e.target.classList.contains("projects")) {
            const compareId = e.target.id.replace("button", "");
            const index = projectArray.findIndex(obj => obj.id.toString() === compareId);

            if (index !== -1 && (!state.currentProject || state.currentProject.id !== compareId)) {
                state.currentProject = projectArray[index];
                renderTasks(state.currentProject);

                document.querySelectorAll(".projects").forEach(el => {
                    el.classList.remove("active-project");
                });
                e.target.classList.add("active-project");
            }
        }
    });
}


function projectDelete(){
    document.querySelector("#project-container").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        if(e.target.classList.contains("project-delete")) {
            const index = projectArray.findIndex(obj => obj.id.toString() === e.target.id); 
            //console.log(index)

            if(index === -1) return; //safety check but array should never be less than zero

            if(confirm(`Are you sure you want to delete ${projectArray[index].name} and all tasks?`)) {
                e.target.closest("#label-container").remove(); // removes project select and delete btns
                projectArray.splice(index, 1); // removes project from array

                storeProjects(projectArray);
                if(projectArray.length > 0) {
                    state.currentProject = projectArray[index] || projectArray[index - 1];
                    renderTasks(state.currentProject);

                    document.querySelectorAll(".projects").forEach(el => {
                        el.classList.remove("active-project");
                    });
                    //current project receives active CSS
                    document.querySelector(`#button${state.currentProject.id}`).classList.add("active-project");

                } else {
                    state.currentProject = null;
                    //remove last task card and project header
                    document.querySelectorAll(".task-card, .project-header").forEach(el => el.remove());
                }
            }
        }
    });
}

//mdn playground to format 


    

