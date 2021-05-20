import { columnsRender } from '/home/maxrostron/todolist/src/modules/DOM/columns.js'
import { taskObject } from '../OPS/taskLogic.js'
import { sideRender } from '/home/maxrostron/todolist/src/modules/DOM/mainPage.js'
import {saveProjects} from '/home/maxrostron/todolist/src/modules/OPS/storage.js'

let projectObject = {

    objects: [],
    create: function(projTitle){
        let project = {
            id: "proj" + this.objects.length,
            title: "",
            type: "project",
            columns: []
        }
        project.title = projTitle
        projectObject.objects.push(project)
        saveProjects()
    },
    search: function(idKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].id === idKey) {
                return myArray[i];
            }
        }
    },
    update: function(projectID, newColumnTitle){
        let objectToUpdate = projectObject.search(`${projectID}`, projectObject.objects)
        objectToUpdate.title = newProjectTitle
        saveProjects()
    },
    load: function(projectID){
        let objectsToLoad = projectObject.search(projectID, projectObject.objects)
        let columnsToLoad = objectsToLoad.columns

        if(columnsToLoad != null){
            columnsRender.loadColumns(columnsToLoad, projectID)
        }

    },
    delete: function(projectID){
        let objectToUpdate = projectObject.search(projectID.id, projectObject.objects)

        let objectIndex = projectObject.objects.indexOf(objectToUpdate)

        sideRender.deleteProjectDiv(projectID.id)

        for(let i=0; i < projectObject.objects.length; i++){
            console.log(i)
            if(i === objectIndex){
                return projectObject.objects.splice(i, 1);
            }
        }
        saveProjects()
    }


};

export { projectObject }

