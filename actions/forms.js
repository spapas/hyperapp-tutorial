module.exports = {
    updateField: ({formname, fieldname, value}) => state => {
        console.log("updateField", formname, fieldname, value)
            return {
            [formname]: Object.assign({}, state[formname], {
                [fieldname]: value
            }),
        }
    }
    
}