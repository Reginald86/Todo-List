import "./styles.css"
import { TaskDialog } from "./tasks.js"
import { createProject, projectArray, state, renderTasks} from "./project.js";
import { getProjects } from "./storage.js";




document.addEventListener("DOMContentLoaded", () => {
    getProjects();
    TaskDialog();
    createProject();
})



function dueWeek () {

const main = document.querySelector("#main");
const dueButton = document.createElement("button");
dueButton.id = "due-button";
dueButton.textContent = "Due this week"
main.append(dueButton)
renderDueWeek();

}

function renderDueWeek () {
  document.querySelector("#due-button").addEventListener("click", () => {
    const container = document.querySelector("#container");
    const dueCardContainer = document.createElement("div");
    dueCardContainer.id = "due-card-container"
    container.innerHTML = ""; 

    projectArray.forEach(project => {
      console.log(project.name);
      console.log(project.tasks);

      project.tasks.forEach(task => {
        const dueCard = document.createElement("div");
        const dueCardBtn = document.createElement("button")
        dueCardBtn.className = "due-card-button"
        dueCardBtn.id = `due-${project.id}`
        dueCardBtn.textContent = "->"
        dueCard.className = "due-card";
        dueCard.innerHTML = `<span class = "due-project">${project.name}:</span> ${task.name} == ${task.date}`;
        container.append(dueCardContainer);
        dueCardContainer.append(dueCard, dueCardBtn)
      });
    });
    dueCardSwitch();
  });
}

function dueCardSwitch() {
  document
    .getElementById("due-card-container")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("due-card-button")) {
        const compareId = e.target.id.replace("due-", "");
        console.log(compareId);
        const index = projectArray.findIndex(
          (obj) => obj.id.toString() === compareId,
        );

        if (
          index !== -1 &&
          (!state.currentProject || state.currentProject.id !== compareId)
        ) {
          document.getElementById("due-card-container").innerHTML = "";
          state.currentProject = projectArray[index];
          renderTasks(state.currentProject);
          console.log(state.currentProject);

          document.querySelectorAll(".projects").forEach((el) => {
            el.classList.remove("active-project");
            console.log(el.id.replace("due-", "button"));

            if (el.id === e.target.id.replace("due-", "button")) {
              el.classList.add("active-project");
            }
          });
        }
      }
    });
}


dueWeek();


