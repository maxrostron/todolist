import { tasksRender } from './tasks'
import { columnLogic } from './columnLogic'

function columnsRender() {

    return {
        newColumnBtn() {
            //Renders the new column button
            let newColumnBtn = document.createElement("div")
            newColumnBtn.setAttribute("id", "newColumnBtn")
            newColumnBtn.addEventListener('click', function() {      
                columnsRender().newColumn()
            })
            mainDiv.appendChild(newColumnBtn)
            //Renders the button text
            let newColumnBtnText = document.createElement("h1")
            newColumnBtnText.innerHTML = "+"
            newColumnBtn.appendChild(newColumnBtnText)
        },
        newColumn() {
            //Adds New Column
            let newColumn = document.createElement("div")
            newColumn.setAttribute("class", "column")
            let columnID = "col: " + columnLogic().noColumns
            columnLogic().create()
            newColumn.setAttribute("id", columnID)
            console.log(newColumn.id)
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
                    newColumnTitle.contentEditable = "true";
                    newColumnHeader.appendChild(newColumnTitle)
                //Adds Column Body
                let newColumnBody = document.createElement("div")
                newColumnBody.setAttribute("class", "columnBody")
                newColumn.appendChild(newColumnBody)
            tasksRender().newTaskBtn(columnID)
                
        }
    }
}

export { columnsRender }