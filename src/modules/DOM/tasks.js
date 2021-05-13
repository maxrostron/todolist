function tasksRender() {
    
    return {
        newTaskBtn(columnID) {
                //Add New Task Button
                let relevantColumn = document.getElementById(columnID)
                let newTaskBtn = document.createElement("div")
                newTaskBtn.setAttribute("class", "newTaskBtn")
                newTaskBtn.addEventListener('click', function() {
                    let newTask = document.createElement("div")
                    newTask.setAttribute("class", "newTask")
                    relevantColumn.appendChild(newTask)
                        //Task Colour Code
                        let newTaskColor = document.createElement("div")
                        newTaskColor.setAttribute("class", "taskColor")
                        newTask.appendChild(newTaskColor)
                })
                relevantColumn.appendChild(newTaskBtn)

                //Renders text for New Task Button
                let newTaskBtnText = document.createElement("h1")
                newTaskBtnText.innerHTML = "+"
                newTaskBtn.appendChild(newTaskBtnText);
        }
    }
    
}

export { tasksRender }