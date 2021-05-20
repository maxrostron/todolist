import { mainRender, sideRender } from './modules/DOM/mainPage'
import {saveProjects, loadProjects} from '/home/maxrostron/todolist/src/modules/OPS/storage.js'

let render = (function () {

    if(!localStorage.getItem('myProjects')){
        console.log("hello")
        saveProjects();
        mainRender.loadRightDiv();
        mainRender.loadStartScreen();
        sideRender.renderSideBar();
        
    } else {
        console.log("hello2")
        mainRender.loadRightDiv();
        sideRender.renderSideBar();
        loadProjects()
        
    }

    // mainRender.loadRightDiv();
    // mainRender.loadStartScreen();
    // sideRender.renderSideBar();

})();

