import "./styles.css"
import { TaskDialog } from "./tasks.js"
import { createProject} from "./project.js";
import { getProjects } from "./storage.js";




document.addEventListener("DOMContentLoaded", () => {
    getProjects();
    TaskDialog();
    createProject();
})

 