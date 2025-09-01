import { state, renderTasks, projectArray } from "./project.js";

export function TaskDialog() {
    const taskDialog = document.getElementById("task-dialog");
    const taskForm = document.getElementById("task-form");
    const taskOpen = document.getElementById("open-task-dialog");
    const taskFormHeader = document.createElement("h4");
    taskFormHeader.className = "task-form-header";
    taskFormHeader.textContent = `Add task to project: ${state.currentProject.name}`
    taskForm.prepend(taskFormHeader);

    taskOpen.addEventListener("click", () => {
        const taskSubmitBtn = document.querySelector("#task-save");
        const taskCancelBtn = document.querySelector("#task-cancel");

        taskForm.reset();

        taskSubmitBtn.style.display = "inline-block";
        taskCancelBtn.style.display = "inline-block";

        taskDialog.showModal();
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskName = document.querySelector("#task-name").value;
        const taskDate = document.querySelector("#task-date").value;
        const taskDesc = document.querySelector("#task-desc").value;
        const taskPriority = document.querySelector("#task-priority").value;
        const task = new Task(taskName, taskDate, taskDesc, taskPriority);

        taskForm.reset();
        taskDialog.close();

        if (state.currentProject) {
            state.currentProject.tasks.push(task);
            renderTasks(state.currentProject);
        }
    });

    taskForm.addEventListener("reset", () => {
        taskDialog.close();
    });
}

class Task {
    constructor(name, date, descr, priority) {
        this.name = name;
        this.date = date;
        this.descr = descr;
        this.priority = priority;
    }
}

export function deleteTask() {
    let deleteBtn = document.querySelectorAll(".task-delete");
    deleteBtn.forEach(btn =>
        btn.addEventListener("click", (e) => {
            const taskElement = e.target.parentNode;
            const index = taskElement.dataset.index;
            taskElement.remove();

            if (state.currentProject && state.currentProject.tasks[index]) {
                state.currentProject.tasks.splice(index, 1);
            }

            renderTasks(state.currentProject);
            console.log(projectArray);
        })
    );
}

export function reviseTask() {
    document.querySelectorAll(".task-revise").forEach(task =>
        task.addEventListener("click", (e) => {
            const index = e.target.parentNode.dataset.index;

            const taskSave = document.querySelector("#task-save");
            const taskCancel = document.querySelector("#task-cancel");
            const taskForm = document.getElementById("task-form");
            const taskDialog = document.getElementById("task-dialog");

    
            taskSave.style.display = "none";
            taskCancel.style.display = "none";

            taskDialog.showModal();

        
            document.querySelector("#task-name").value = state.currentProject.tasks[index].name;
            document.querySelector("#task-date").value = state.currentProject.tasks[index].date;
            document.querySelector("#task-desc").value = state.currentProject.tasks[index].descr;
            document.querySelector("#task-priority").value = state.currentProject.tasks[index].priority;

    
            let changeTaskBtn = document.querySelector(".submit-task-change");
            if (!changeTaskBtn) {
                changeTaskBtn = document.createElement("button");
                changeTaskBtn.className = "submit-task-change";
                changeTaskBtn.type = "button";
                changeTaskBtn.textContent = "Save Changes";
                taskForm.append(changeTaskBtn);
            }

            changeTaskBtn.onclick = () => {
                Object.assign(state.currentProject.tasks[index], {
                    name: document.querySelector("#task-name").value,
                    date: document.querySelector("#task-date").value,
                    descr: document.querySelector("#task-desc").value,
                    priority: document.querySelector("#task-priority").value
                });

                taskDialog.close();

                taskSave.style.display = "inline-block";
                taskCancel.style.display = "inline-block";

                changeTaskBtn.remove();

                renderTasks(state.currentProject);
            };
        })
    );
}
