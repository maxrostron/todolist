
let columnObject = {

    objects: [],
    create: function(){
        let column = {
            id: "col" + this.objects.length,
            title: "",
            type: "column",
            tasks: []
        }
        columnObject.objects.push(column)
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
        console.log("test")
        console.log(objectToUpdate.title)
        console.log(columnObject.objects)

    },

};

export { columnObject }

