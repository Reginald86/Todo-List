import { Project, projectArray, renderTasks, renderProject, state } from "./project.js";

export function storeProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjects() {
    const stored = JSON.parse(localStorage.getItem("projects"));
    if (!stored) return;

    stored.forEach(pj => {
        const remake = new Project(pj.name, Number(pj.id));
        remake.tasks = pj.tasks || [];

        projectArray.push(remake);
        renderProject(remake); // ✅ only render the sidebar button
    });

    // after loading all projects, show only the last one’s tasks
    if (projectArray.length > 0) {
        const first = projectArray[0];
        state.currentProject = first;
        renderTasks(first);

        
                document.querySelectorAll(".projects").forEach(el => {
                    el.classList.remove("active-project");
                });

                document.querySelector(`#button${first.id}`).classList.add("active-project");


    }

    // resume IDs safely
    const maxId = projectArray.length > 0
        ? Math.max(...projectArray.map(pj => Number(pj.id) || 0))
        : 0;
    state.count = maxId + 1;
}


