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

            console.log(currentProject);
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
    const projectSelectBtn = document.createElement("button")
    projectSelectBtn.className = "projects";
    projectSelectBtn.textContent = project.name;
    projectSelectBtn.id = project.id;
    const projectDeleteBtn = document.createElement("button");
    projectDeleteBtn.className = "project-delete";
    projectDeleteBtn.id = project.id;
    projectDeleteBtn.textContent = "Delete";
    projectContainer.append(projectSelectBtn, projectDeleteBtn);

    document.querySelectorAll(".projects").forEach(el => {
        el.classList.remove("active-project", "inactive-project");
    });
    projectSelectBtn.classList.add("active-project");
    activeProject();
    projectDelete();
    
}

//Selecting current Project (using btn) 
export function activeProject() {
    document.querySelectorAll(".projects").forEach(project => {
        project.addEventListener("click", (e) => {
            console.log(project.id);
            console.log(`${currentProject.id} is current`)
            project.classList.add("active-project");

          
            //find index of Project in projectArray associated with projectSelectBtn
            const index = projectArray.findIndex(obj => obj.id.toString() === project.id);
            
            if(index !== -1 && currentProject.id !== project.id.toString()){
                currentProject = projectArray[index];
                console.log(currentProject);
                renderTasks(currentProject);

                document.querySelectorAll(".projects").forEach(p => {
                 p.classList.remove("active-project", "inactive-project");
                });

                project.classList.add("active-project");
            } else {
                project.classList.add("inactive-project");
            }
        });
    });
}

function projectDelete(){
     document.querySelectorAll(".project-delete").forEach(project => {
        project.onclick = (e) => {
            const index = projectArray.findIndex(obj => obj.id.toString() === project.id);
            
            if(confirm(`Are you sure you want to delete ${projectArray[index].name} and all tasks?`)){
                console.log(projectArray[index])
            } 
        }
    });
};
    

