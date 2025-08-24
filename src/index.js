import "./styles.css"
import { TaskDialog } from "./tasks.js"
import { createProject} from "./project.js";

document.addEventListener("DOMContentLoaded", () => {
    TaskDialog();
    createProject();
})