import { columnsRender } from '/home/maxrostron/todolist/src/modules/DOM/columns.js'
import { taskObject } from '../OPS/taskLogic.js'
import { projectObject } from '/home/maxrostron/todolist/src/modules/OPS/projectLogic.js'
import {saveProjects} from '/home/maxrostron/todolist/src/modules/OPS/storage.js'

let columnObject = {

    objects: [],
    create: function(projectID){
        let column = {
            id: "col" + this.objects.length,
            title: "",
            type: "column",
            tasks: []
        }

        let project = projectObject.objects.find(
            ({ id }) => id === projectID
        )
        project.columns.push(column)
        columnObject.objects.push(column)

        saveProjects()
        
    },
    search: function(idKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].id === idKey) {
                return myArray[i];
            }
        }
    },
    update: function(columnID, newColumnTitle){
        let objectToUpdate = columnObject.search(`${columnID}`, columnObject.objects)
        objectToUpdate.title = newColumnTitle
        saveProjects()

    },
    delete: function(columnID){
        let objectToUpdate = columnObject.search(columnID, columnObject.objects)        

        columnsRender.deleteColumnDiv(columnID)

        let objectIndex = columnObject.objects.indexOf(objectToUpdate)

        taskObject.deleteObjectColumn(columnID)

        for(let i=0; i < columnObject.objects.length; i++){
            if(i === objectIndex){
                return columnObject.objects.splice(i, 1);
            }
        }
        saveProjects()

    }

};

export { columnObject }

