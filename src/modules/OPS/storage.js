import { sideRender } from '../DOM/mainPage'
import { projectObject } from '/home/maxrostron/todolist/src/modules/OPS/projectLogic.js'

function saveProjects(){
    console.log("saving" + projectObject.objects)
    localStorage.setItem("myProjects", JSON.stringify(projectObject.objects))
}

function loadProjects(){
    projectObject.objects = []
    console.log("loading")
    console.log(localStorage.getItem("myProjects"))
    projectObject.objects = localStorage.getItem("myProjects")
    sideRender.loadProjectDiv()
    console.log("loaded" + projectObject.objects)
}


export {saveProjects, loadProjects}