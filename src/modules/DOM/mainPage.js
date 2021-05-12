let content = document.getElementById("content");

let pageRender = function(){
    //Render main section
    let mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "mainDiv")
    content.appendChild(mainDiv)


}

function sideRender(){
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
                let newProjectDiv = document.createElement("div")
                newProjectDiv.setAttribute("class", "projectDiv")
                //addDivId
                //addDivName
                sideDivBottom.appendChild(newProjectDiv)
            })
            sideDivBottom.appendChild(newProjectBtn)
                //Add "On Click run function"

}



export { pageRender, sideRender }