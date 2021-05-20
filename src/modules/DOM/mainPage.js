import { columnsRender } from './columns'
import { projectObject } from '/home/maxrostron/todolist/src/modules/OPS/projectLogic.js'
import bin from '/home/maxrostron/todolist/src/modules/IMG/delete.png'

let content = document.getElementById("content");

let sideRender = (function(){
    
    return {
    renderSideBar: function() {
    //Render side bar
    let sideDiv = document.createElement("div")
    sideDiv.setAttribute("id", "sideDiv")
    content.appendChild(sideDiv)

        //Render side bar top for user info
        let sideDivTop = document.createElement("div")
        sideDivTop.setAttribute("id", "sideDivTop")
        sideDiv.appendChild(sideDivTop)

            //Render page title
            let pageName = document.createElement("h1")
            pageName.innerHTML = "My To Do Lists"
            sideDivTop.appendChild(pageName)

            //User Details TBD


        //Render side bar bottom for project selection
        let sideDivBottom = document.createElement("div")
        sideDivBottom.setAttribute("id", "sideDivBottom")
        sideDiv.appendChild(sideDivBottom)

            //New Project Button
            let newProjectBtn = document.createElement("div")
            newProjectBtn.innerHTML = "+"
            newProjectBtn.setAttribute("class", "projectDiv newProject")
            newProjectBtn.addEventListener('click', function() {
                sideRender.setProjectTitle()
            })
            sideDivBottom.appendChild(newProjectBtn)
        },
    setProjectTitle: function(){
        let projectID = "proj" + `${projectObject.objects.length}`
        //Add New Project Div
        let newProjectDiv = document.createElement("div")
        newProjectDiv.setAttribute("class", "projectDiv")
        newProjectDiv.setAttribute("id", `${projectID}`)

        let newProjectTitle = document.createElement("div")
        newProjectTitle.addEventListener("click", function(){
            mainRender.loadProject(this.parentElement.id)
        })
        newProjectTitle.setAttribute("id", `${projectID}Title`)
        newProjectTitle.setAttribute("class", "newProjectTitle")
        newProjectDiv.appendChild(newProjectTitle)

        let projectDelete = document.createElement("img")
        projectDelete.src = bin
        projectDelete.setAttribute("id", `${projectID}Delete`)
        projectDelete.setAttribute("class", "projectDelete")
        projectDelete.addEventListener("click", function(){
            projectObject.delete(this.parentElement)
        })
        newProjectDiv.appendChild(projectDelete)

        document.getElementById("sideDivBottom").appendChild(newProjectDiv)

        //Create Pop Up Window
        let window = document.createElement("div")
        window.setAttribute("class", "popWindow")
        document.getElementById("content").appendChild(window)
        //Create Form
        let form = document.createElement("form");
        form.setAttribute("id", "projectform")
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
        let projectTitleLable = document.createElement("label")
        projectTitleLable.for = "projectTitle"
        projectTitleLable.textContent = "Project name: "
        form.appendChild(projectTitleLable)
        let projectTitle = document.createElement("input")
        projectTitle.type = "text"
        projectTitle.required = true;
        projectTitle.id = "projectTitle"
        projectTitle.name = "projectTitle"
        form.appendChild(projectTitle)

        //Create Submit Button
        let submitBtn = document.createElement("input")
        submitBtn.type = "submit"
        submitBtn.name = "submit"
        submitBtn.setAttribute("id", "columnSubmitBtn")
        submitBtn.value = "Update"
        submitBtn.addEventListener("click", function(event){
            event.preventDefault();
            projectObject.create(projectTitle.value)
            newProjectTitle.innerHTML = projectTitle.value
            window.remove()
        })
        form.appendChild(submitBtn)
    },
    deleteProjectDiv: function(projectID){
       document.getElementById(projectID).remove()
    },
    loadProjectDiv: function(){
       if(projectObject.objects != []){
           for(let i = 0; i < projectObject.objects.length; i++){
            //Add New Project Div
            let newProjectDiv = document.createElement("div")
            newProjectDiv.setAttribute("class", "projectDiv")
            newProjectDiv.setAttribute("id", `${projectObject.objects[i].id}`)

            let newProjectTitle = document.createElement("div")
            newProjectTitle.addEventListener("click", function(){
                mainRender.loadProject(this.parentElement.id)
            })
            newProjectTitle.setAttribute("id", `${projectObject.objects[i].id}Title`)
            newProjectTitle.setAttribute("class", "newProjectTitle")
            newProjectDiv.appendChild(newProjectTitle)

            let projectDelete = document.createElement("img")
            projectDelete.src = bin
            projectDelete.setAttribute("id", `${projectObject.objects[i].id}Delete`)
            projectDelete.setAttribute("class", "projectDelete")
            projectDelete.addEventListener("click", function(){
                projectObject.delete(this.parentElement)
            })
            newProjectDiv.appendChild(projectDelete)
            document.getElementById("sideDivBottom").appendChild(newProjectDiv)

           }
       }     
    }
    }
})()

let mainRender = (function(){
        
    return {
        loadRightDiv: function(){
            let rightDiv = document.createElement("div")
            rightDiv.setAttribute("id", "rightDiv")
            document.getElementById("content").appendChild(rightDiv)
        },
        loadStartScreen: function(){
            let startScreen = document.createElement("div")
            startScreen.innerHTML = "Create & select a project to get started!"
            startScreen.setAttribute("id", "startScreen")
            document.getElementById("rightDiv").appendChild(startScreen)
        },

        loadProject: function(projectID){
            if(document.getElementById("rightDiv") != null){
                //Unload start screen
                document.getElementById("rightDiv").remove()
                document.getElementById("content").style.flexDirection = "row"
            }
            else if (document.getElementsByClassName("mainDiv") != null){
                let content = document.getElementById("content").childNodes
                content[1].remove()
            }

            //Renders the main section
            let mainDiv = document.createElement("div")
            mainDiv.setAttribute("class", `mainDiv`)
            mainDiv.setAttribute("id", `main${projectID}`)
            document.getElementById("content").appendChild(mainDiv)

            let divID = `main${projectID}`

            //Renders New Column Button
            columnsRender.newColumnBtn(divID, projectID)

            //Check for any existing columns to load
            projectObject.load(projectID)
        }
    }

})()

export { mainRender, sideRender }