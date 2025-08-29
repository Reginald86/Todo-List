

export function storeProjects(projects){
    
        localStorage.setItem("projects", JSON.stringify(projects));
        const stored = JSON.parse(localStorage.getItem("projects"));
        stored.forEach(pj => {
            console.log(pj.name)
            console.log(pj.tasks)
        })
  
}
    
    


