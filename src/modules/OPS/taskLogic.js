import { columnObject } from '../OPS/columnLogic.js'
import { tasksRender } from '../DOM/tasks'
import {saveProjects} from '/home/maxrostron/todolist/src/modules/OPS/storage.js'

let taskObject = {

    objects: [],
    create: function(columnID, title, description, status, priority, date){

        let task = {
            id: "task" + this.objects.length,
            col: columnID,
            type: "task",
            title: title,
            description: description,
            status: status,
            priority: priority,
            date: date
        }
        let column = columnObject.objects.find(
            ({ id }) => id === columnID
        )
        column.tasks.push(task)
        this.objects.push(task)
        saveProjects()
    },
    search: function(idKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].id === idKey) {
                    return myArray[i];
                }
            }
    },
    openEdit: function(taskDiv){
        let objectToUpdate = taskObject.search(`${taskDiv.id}`, taskObject.objects)

        let preID = objectToUpdate.id
        let preTitle = objectToUpdate.title
        let preDescription = objectToUpdate.description
        let preStatus = objectToUpdate.status
        let prePriority = objectToUpdate.priority
        let preDate = objectToUpdate.date

        tasksRender.newTaskWindow(preID, preTitle, preDescription, preStatus, prePriority, preDate)
        saveProjects()
    },
    updateObject: function(id, title, description, status, priority, date){
        let objectToUpdate = taskObject.search(`${id}`, taskObject.objects)

        objectToUpdate.title = title
        objectToUpdate.description = description
        objectToUpdate.status = status
        objectToUpdate.priority = priority
        objectToUpdate.date = date
        saveProjects()
    },
    changePriority: function(taskDiv){
        let currentTask = taskDiv
        let objectToUpdate = taskObject.search(`${taskDiv}`, taskObject.objects)

        if(objectToUpdate.priority == "lowPriority"){
            objectToUpdate.priority = "highPriority"
            tasksRender.toggleHighPriority(currentTask)
        }
        else if (objectToUpdate.priority == "highPriority"){
            objectToUpdate.priority = "lowPriority"
            tasksRender.toggleLowPriority(currentTask)
        } 
        saveProjects()
    },
    deleteObject: function(taskDiv){
        let objectToUpdate = taskObject.search(`${taskDiv.id}`, taskObject.objects)
        

        tasksRender.divToDelete(taskDiv)

        let objectIndex = taskObject.objects.indexOf(objectToUpdate)

        for(let i=0; i < taskObject.objects.length; i++){
            console.log(i)
            if(i === objectIndex){
                return taskObject.objects.splice(i, 1);
            }
        }
        saveProjects()
    },
    deleteObjectColumn: function(columnID){
        taskObject.objects = taskObject.objects.filter(
            obj => obj.col !== `${columnID}`
        )
        saveProjects()
    }

    }
        
export { taskObject }