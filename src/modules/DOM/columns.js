import { columnObject } from '../OPS/columnLogic.js'
import { tasksRender } from './tasks'


let columnsRender = (function() {

    return {
        newColumnBtn() {
            //Renders the new column button
            let newColumnBtn = document.createElement("div")
            newColumnBtn.setAttribute("id", "newColumnBtn")
            newColumnBtn.addEventListener('click', function() {      
                columnsRender.newColumn()
            })
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
        newColumn() {
            //Adds New Column
            let newColumn = document.createElement("div")
            newColumn.setAttribute("class", "column")
            columnObject.create()
            let columnID = "col" + (columnObject.objects.length - 1)
            newColumn.setAttribute("id", columnID)
            console.log(newColumn.id + " created")
            mainDiv.appendChild(newColumn)
                //Adds Column Header
                let newColumnHeader = document.createElement("div")
                newColumnHeader.setAttribute("class", "columnHeader")
                newColumn.appendChild(newColumnHeader)
                    //Column Colour
                    let newColumnColour = document.createElement("div")
                    newColumnColour.setAttribute("class", "columnColour")
                    newColumnHeader.appendChild(newColumnColour)
                    //Column Title
                    let newColumnTitle = document.createElement("div")
                    newColumnTitle.setAttribute("class", "columnTitle")
                    newColumnTitle.innerHTML = "Placeholder Title"
                    newColumnTitle.addEventListener('click', function(){
                        columnsRender.editColumnTitle(columnID)
                    })

                    
                    newColumnHeader.appendChild(newColumnTitle)
                //Adds Column Body
                let newColumnBody = document.createElement("div")
                newColumnBody.setAttribute("class", "columnBody")
                newColumn.appendChild(newColumnBody)
            tasksRender.newTaskBtn(columnID)
            columnsRender.hideNewColumnBtn()
        },
        editColumnTitle(columnID) {
            //Create Pop Up Window
            let window = document.createElement("div")
            window.setAttribute("class", "popWindow")
            document.getElementById("mainDiv").appendChild(window)
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

        }
    }
})()

export { columnsRender }