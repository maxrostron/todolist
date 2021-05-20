import { columnObject } from '../OPS/columnLogic.js'
import { tasksRender } from './tasks'
import bin from '/home/maxrostron/todolist/src/modules/IMG/delete.png'


let columnsRender = (function() {

    let currentProject

    return {
        newColumnBtn(divID, projectID) {
            //Renders the new column button
            let newColumnBtn = document.createElement("div")
            newColumnBtn.setAttribute("id", "newColumnBtn")
            newColumnBtn.addEventListener('click', function() {      
                columnsRender.newColumn(divID, projectID)
                currentProject = this.parentElement.parentElement
            })
            let mainDiv = document.getElementById(divID)
            mainDiv.appendChild(newColumnBtn)
            //Renders the button text
            let newColumnBtnText = document.createElement("h1")
            newColumnBtnText.innerHTML = "+"
            newColumnBtn.appendChild(newColumnBtnText)
        },
        hideNewColumnBtn() {
            //Tests to see if there are too many columns
            if(columnObject.objects.length >= 4) {
            newColumnBtn.style.display = "none";
            }
            else {
                newColumnBtn.style.display = "inherit";
            }
        },
        newColumn(divID, projectID) {
            //Adds New Column
            let newColumn = document.createElement("div")
            newColumn.setAttribute("class", "column")
            columnObject.create(projectID)
            let columnID = "col" + (columnObject.objects.length - 1)
            newColumn.setAttribute("id", columnID)
            let mainDiv = document.getElementById(divID)
            mainDiv.appendChild(newColumn)
                //Adds Column Header
                let newColumnHeader = document.createElement("div")
                newColumnHeader.setAttribute("class", "columnHeader")
                newColumn.appendChild(newColumnHeader)
                    // //Column Colour
                    let columnDelete = document.createElement("img")
                    columnDelete.src = bin
                    columnDelete.setAttribute("class", "columnDelete")
                    columnDelete.addEventListener('click', function(){
                        columnObject.delete(this.parentElement.parentElement.id)
                    })
                    newColumnHeader.appendChild(columnDelete)
                    //Column Title
                    let newColumnTitle = document.createElement("div")
                    newColumnTitle.setAttribute("class", "columnTitle")
                    newColumnTitle.innerHTML = "Placeholder Title"
                    newColumnTitle.addEventListener('click', function(){
                        columnsRender.editColumnTitle(columnID, divID)
                    })

                    
                    newColumnHeader.appendChild(newColumnTitle)
                //Adds Column Body
                let newColumnBody = document.createElement("div")
                newColumnBody.setAttribute("class", "columnBody")
                newColumn.appendChild(newColumnBody)
            tasksRender.newTaskBtn(columnID)
            columnsRender.hideNewColumnBtn()
        },
        editColumnTitle(columnID, projDivID) {
            //Create Pop Up Window
            let window = document.createElement("div")
            window.setAttribute("class", "popWindow")
            let mainDiv = document.getElementById(projDivID)
            mainDiv.appendChild(window)
            //Create Form
            let form = document.createElement("form");
            form.setAttribute("id", "columnform")
            form.textContent = "Edit title"
            window.appendChild(form)
            //Close Form Button
            let closeFormBtn = document.createElement("div")
            closeFormBtn.id = "closeFormBtn"
            closeFormBtn.textContent = "x"
            closeFormBtn.addEventListener('click', function(){
                window.style.display = "none"
            })
            form.appendChild(closeFormBtn)

            //Create input element for column title
            let columnTitleLable = document.createElement("label")
            columnTitleLable.for = "columntitle"
            columnTitleLable.textContent = "Column name: "
            form.appendChild(columnTitleLable)
            let columnTitle = document.createElement("input")
            columnTitle.type = "text"
            columnTitle.id = "columnTitle"
            columnTitle.name = "columnTitle"
            form.appendChild(columnTitle)

            //Create Submit Button
            let submitBtn = document.createElement("input")
            submitBtn.type = "submit"
            submitBtn.name = "submit"
            submitBtn.setAttribute("id", "columnSubmitBtn")
            submitBtn.value = "Update"
            submitBtn.addEventListener("click", function(event){
                event.preventDefault();
                columnObject.update(columnID, columnTitle.value)
                //Update Column DOM
                let titleDOM = document.getElementById(`${columnID}`).querySelector('.columnTitle')
                titleDOM.innerHTML = columnTitle.value
                window.remove()
            })
            form.appendChild(submitBtn)
        },
        deleteColumnDiv(divID){
            document.getElementById(divID).remove()
        },
        loadColumns(columnsArray, projectID){

            for (let i = 0; i < columnsArray.length; i++){
                //Render Column Divs
                let newColumn = document.createElement("div")
                newColumn.setAttribute("class", "column")
                newColumn.setAttribute("id", columnsArray[i].id)
                let mainDiv = document.getElementById(`main${projectID}`)
                mainDiv.appendChild(newColumn)

                //Adds Column Header
                let newColumnHeader = document.createElement("div")
                newColumnHeader.setAttribute("class", "columnHeader")
                newColumn.appendChild(newColumnHeader)
                    // //Column Colour
                    let columnDelete = document.createElement("img")
                    columnDelete.src = bin
                    columnDelete.setAttribute("class", "columnDelete")
                    columnDelete.addEventListener('click', function(){
                        columnObject.delete(this.parentElement.parentElement.id)
                    })
                    newColumnHeader.appendChild(columnDelete)
                    //Column Title
                    let newColumnTitle = document.createElement("div")
                    newColumnTitle.setAttribute("class", "columnTitle")
                    if(columnsArray[i].title != undefined){
                        newColumnTitle.innerHTML = columnsArray[i].title
                    }
                    else {
                        newColumnTitle.innerHTML = "Placeholder Title"
                    }
                    newColumnTitle.addEventListener('click', function(){
                        columnsRender.editColumnTitle(columnsArray[i].id, `main${projectID}`)
                    })
                    newColumnHeader.appendChild(newColumnTitle)
                
                //Adds Column Body
                let newColumnBody = document.createElement("div")
                newColumnBody.setAttribute("class", "columnBody")
                newColumn.appendChild(newColumnBody)
                tasksRender.newTaskBtn(columnsArray[i].id)
                columnsRender.hideNewColumnBtn()

                if(columnsArray[i].tasks != null){
                    tasksRender.loadTasks(columnsArray[i].tasks, columnsArray[i].id)
                }

            }



            
        }
    }
})()

export { columnsRender }