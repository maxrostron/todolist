import { taskObject } from '../OPS/taskLogic.js'
import flag from '/home/maxrostron/todolist/src/modules/IMG/flags.png'
import pencil from '/home/maxrostron/todolist/src/modules/IMG/pencil.png'


let tasksRender = (function () {
    let currentColumnID = ""
    let currentTaskDIV = ""
    let relevantColumnBody 
    let formData
    return {
    newTaskBtn(columnID) {
        //Add New Task Button
        let relevantColumn = document.getElementById(columnID)
        tasksRender.relevantColumnBody = relevantColumn.querySelector("div.columnBody")
        let newTaskBtn = document.createElement("div")
        newTaskBtn.setAttribute("class", "newTaskBtn")
        newTaskBtn.addEventListener('click', function () {
            tasksRender.newTaskWindow()
        })
        tasksRender.relevantColumnBody.appendChild(newTaskBtn)

        //Renders text for New Task Button
        let newTaskBtnText = document.createElement("h1")
        newTaskBtnText.innerHTML = "+"
        newTaskBtn.appendChild(newTaskBtnText);
        tasksRender.currentColumnID = columnID
    },
    newTaskWindow(preID, preTitle, preDescription, preStatus, prePriority, preDate) {
        //Create pop-up window
        let window = document.createElement("div")
        window.setAttribute("class", "popWindow")
        document.getElementById("mainDiv").appendChild(window)

        //Create Form
        let form = document.createElement("form");
        form.setAttribute("id", "form")
        if(preTitle != undefined) {
            form.textContent = "Update task"
        }
        form.textContent = "Create task"
        window.appendChild(form)

        //Close Form Button
        let closeFormBtn = document.createElement("div")
        closeFormBtn.id = "closeFormBtn"
        closeFormBtn.textContent = "x"
        closeFormBtn.addEventListener('click', function(){
            window.style.display = "none"
        })
        form.appendChild(closeFormBtn)

            //Create input element for task title
            let taskTitleLable = document.createElement("label")
            taskTitleLable.for = "tasktitle"
            taskTitleLable.textContent = "Task name: "
            form.appendChild(taskTitleLable)
            let taskTitle = document.createElement("input")
            taskTitle.type = "text"
            taskTitle.id = "taskTitle"
            taskTitle.name = "taskTitle"
            if(preTitle != undefined) {
                taskTitle.value = preTitle
            }
            // taskTitle.required = true
            form.appendChild(taskTitle)

            //Create input element for task description
            let taskDescriptionLable = document.createElement("label")
            taskDescriptionLable.for = "taskDescription"
            taskDescriptionLable.textContent = "Task description: "
            form.appendChild(taskDescriptionLable)
            let taskDescription = document.createElement("textarea")
            // taskDescription.type = "textarea" 
            taskDescription.setAttribute("id", "taskDescription")
            taskDescription.name = "taskDescription"
            if(preDescription != undefined){
                taskDescription.value = preDescription
            }
            // taskDescription.required = true
            form.appendChild(taskDescription)

            //Create input element for task status
            let taskStatusLable = document.createElement("label")
            taskStatusLable.for = "taskStatus"
            taskStatusLable.textContent = "Current status: "
            form.appendChild(taskStatusLable)
            let taskStatus = document.createElement("select")
            taskStatus.id = "taskStatus"
            taskStatus.name = "taskStatus"
            form.appendChild(taskStatus)
                //Add Completed Option
                let completed = document.createElement("option")
                completed.value = "completed"
                let completedText = document.createTextNode("completed")
                completed.appendChild(completedText)
                taskStatus.appendChild(completed)

                //Add In Progress Option
                let inProgress = document.createElement("option")
                inProgress.value = "inProgress"
                let inProgressText = document.createTextNode("In Progress")
                inProgress.appendChild(inProgressText)
                taskStatus.appendChild(inProgress)

                //Add Not Started Option
                let notStarted = document.createElement("option")
                notStarted.value = "notStarted"
                notStarted.selected = true
                let notStartedText = document.createTextNode("Not Started")
                notStarted.appendChild(notStartedText)
                taskStatus.appendChild(notStarted)
            if(preStatus != undefined){
                taskStatus.value = preStatus
            }
                
            //Create input element for task priority
            let taskPriorityLable = document.createElement("label")
            taskPriorityLable.for = "taskPriority"
            taskPriorityLable.textContent = "Task priority: "
            form.appendChild(taskPriorityLable)

            let taskPriority = document.createElement("select")
            taskPriority.id = "taskPriority"
            taskPriority.name = "taskPriority"
            if(prePriority != undefined){
                taskPriority.value = prePriority
            }
            
            form.appendChild(taskPriority)
                //Add High Option
                let highPriority = document.createElement("option")
                highPriority.value = "highPriority"
                let highPriorityText = document.createTextNode("High Priority")
                highPriority.appendChild(highPriorityText)
                taskPriority.appendChild(highPriority)

                //Add Low Option
                let lowPriority = document.createElement("option")
                lowPriority.value = "lowPriority"
                let lowPriorityText = document.createTextNode("Low Priority")
                lowPriority.appendChild(lowPriorityText)
                taskPriority.appendChild(lowPriority)


            //Create input element for task due date
            let taskDateLable = document.createElement("label")
            taskDateLable.for = "taskDate"
            taskDateLable.textContent = "Task due date: "
            form.appendChild(taskDateLable)

            let taskDate = document.createElement("input")
            taskDate.type = "date"
            taskDate.id = "taskDate"
            taskDate.name = "taskDate"
            if(preDate != undefined){
                taskDate.value = preDate
            }
            // taskDate.required = true
            form.appendChild(taskDate)

        
        //Create Form Submit Button
        let submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.name = "submit"
        submitBtn.setAttribute("id", "submitBtn")


        if(preTitle != undefined) {
            submitBtn.value = "Update"
            submitBtn.addEventListener("click", function(event){
                event.preventDefault();
                let id = preID
                let title = taskTitle.value
                let description = taskDescription.value
                let status = taskStatus.value
                let priority = taskPriority.value
                let date = taskDate.value  
                let update = true
                taskObject.updateObject(id, title, description, status, priority, date)
                tasksRender.updateTaskDOM(update, id, title, description, status, priority, date)
                window.remove()
            })            
        }
        else {
            submitBtn.value = "Create"
            submitBtn.addEventListener("click", function(event){
                event.preventDefault(); 
                let id = null
                let title = taskTitle.value
                let description = taskDescription.value
                let status = taskStatus.value
                let priority = taskPriority.value
                let date = taskDate.value  
                let update = false
                tasksRender.addNewTaskDiv(title, description, status, priority, date)
                tasksRender.updateTaskDOM(update, id, title, description, status, priority, date)
                window.remove()
            })
        }

        form.appendChild(submitBtn)
    },
    addNewTaskDiv(title, description, status, priority, date) {
        // Creates new object & adds to column
        taskObject.create(tasksRender.currentColumnID, title, description, status, priority, date)
        let taskID = "task" + (taskObject.objects.length - 1)
        //Creates DOM Elements
        let newTask = document.createElement("div")
        newTask.setAttribute("class", "newTask")
        newTask.setAttribute("id", taskID)
        tasksRender.relevantColumnBody.appendChild(newTask)
            //Task Colour Code
            let newTaskColor = document.createElement("div")
            newTaskColor.setAttribute("class", "taskColor")
            newTask.appendChild(newTaskColor)
            //Task Content Area
            let taskContentArea = document.createElement("div")
            taskContentArea.setAttribute("class", "taskContentArea")
            newTask.appendChild(taskContentArea)
        //Create Edit Pencil
        let editPencil = document.createElement("img")
        editPencil.id = taskID + "edit"
        editPencil.setAttribute("class", "editPencil")
        editPencil.src = pencil
        //Enables edit task feature
        editPencil.addEventListener('click', function(){
            taskObject.openEdit(this.parentElement)
        })
        newTask.appendChild(editPencil)
        currentTaskDIV = taskID
    },
    updateTaskDOM(update, id, title, description, status, priority, date){
        if(update == false){
            let taskDetailsUpper = document.createElement("div")
            taskDetailsUpper.setAttribute("class", "taskDetailsUpper")
            document.getElementById(currentTaskDIV).querySelector(".taskContentArea").appendChild(taskDetailsUpper)
    
            let taskDetailsLower = document.createElement("div")
            taskDetailsLower.setAttribute("class", "taskDetailsLower")
            document.getElementById(currentTaskDIV).querySelector(".taskContentArea").appendChild(taskDetailsLower)
    
    
            let taskTitleDOM = document.createElement("h1")
            taskTitleDOM.setAttribute("class", "taskTitle")
            taskTitleDOM.innerHTML = title
            taskDetailsUpper.appendChild(taskTitleDOM)
    
            let taskDateDOM = document.createElement("h2")
            taskDateDOM.setAttribute("class", "taskDate")
            taskDateDOM.innerHTML = date
            taskDetailsLower.appendChild(taskDateDOM)
    
            let taskPriorityDOM = document.createElement("div")
            let taskFlagDOM = document.createElement("img")
            taskFlagDOM.id = currentTaskDIV + "flag"
    
            taskFlagDOM.src = flag
                if(priority == "highPriority") {
                    taskPriorityDOM.setAttribute("class", "flag highPriorityBox")
                    taskFlagDOM.setAttribute("class", "taskFlag highPriorityFlag")
                } 
                else if(priority == "lowPriority") {
                    taskPriorityDOM.setAttribute("class", "flag lowPriorityBox")
                    taskFlagDOM.setAttribute("class", "taskFlag lowPriorityFlag")
                }
            taskPriorityDOM.addEventListener("click", function(){
                taskObject.changePriority(this.parentElement.parentElement.parentElement.id)
            })
            taskDetailsLower.appendChild(taskPriorityDOM)
            taskPriorityDOM.appendChild(taskFlagDOM)
        }
        else if (update == true){
            let divTitleToUpdate = document.getElementById(id).querySelector(".taskTitle")
            divTitleToUpdate.innerHTML = title

            let divDateToUpdate = document.getElementById(id).querySelector(".taskDate")
            divDateToUpdate.removeAttribute("class")
            divDateToUpdate.setAttribute("class", "taskDate")
            divDateToUpdate.innerHTML = date

            let divPriorityToUpdate = document.getElementById(id).querySelector(".flag")

            let divFlagToUpdate = document.getElementById(`${id}flag`)

            divPriorityToUpdate.removeAttribute("class")
            divFlagToUpdate.removeAttribute("class")

            if(priority == "highPriority") {
                divPriorityToUpdate.setAttribute("class", "flag highPriorityBox")
                divFlagToUpdate.setAttribute("class", "taskFlag highPriorityFlag")
            } 
            else if(priority == "lowPriority") {
                divPriorityToUpdate.setAttribute("class", "flag lowPriorityBox")
                divFlagToUpdate.setAttribute("class", "taskFlag lowPriorityFlag")
            }

            divPriorityToUpdate.addEventListener("click", function(){
                taskObject.changePriority(this.parentElement.parentElement.parentElement.id)
            })

        }


            
    },
    toggleHighPriority(taskDiv) {
        let targetDiv = document.getElementById(taskDiv)
        let targetDivPriorityDOM = targetDiv.querySelector('.flag')
        let targetDivFlagDOM = targetDivPriorityDOM.childNodes[0]

        targetDivPriorityDOM.removeAttribute("class")
        targetDivFlagDOM.removeAttribute("class")

        targetDivPriorityDOM.setAttribute("class", "flag highPriorityBox")
        targetDivFlagDOM.setAttribute("class", "taskFlag highPriorityFlag")        
    },
    toggleLowPriority(taskDiv){
        let targetDiv = document.getElementById(taskDiv)
        let targetDivPriorityDOM = targetDiv.querySelector('.flag')
        let targetDivFlagDOM = targetDivPriorityDOM.childNodes[0]

        targetDivPriorityDOM.removeAttribute("class")
        targetDivFlagDOM.removeAttribute("class")

        targetDivPriorityDOM.setAttribute("class", "flag lowPriorityBox")
        targetDivFlagDOM.setAttribute("class", "taskFlag lowPriorityFlag")   
    }
}     
})();

export { tasksRender }



//Need to be able to move tasks between columns, and move columns left right - draggable would be cool

//Need to be able to color columns

//Need to assign columns to projects level

//Need to figure out storage

//Nice to figure out a login page

