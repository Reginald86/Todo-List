import "./styles.css"
import { TaskDialog } from "./tasks.js"
import { createProject, projectArray, state} from "./project.js";
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
    container.innerHTML = ""; 

    projectArray.forEach(project => {
      console.log(project.name);
      console.log(project.tasks);

      project.tasks.forEach(task => {
        const dueCard = document.createElement("div");
        dueCard.className = "due-card";
        dueCard.innerHTML = `<span class = "due-project">${project.name}:</span> ${task.name} == ${task.date}`;
        container.append(dueCard);
      });
    });
  });
}

dueWeek();

