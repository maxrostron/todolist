function columnLogic() {
    let columnObjects = []
    let noColumns = columnObjects.length



    return {
        create() {
            let newColumn = {
                id: noColumns,
            }
            columnObjects.push(newColumn)
        }

    }
}

export { columnLogic }