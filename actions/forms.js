module.exports =  {
    
    updateField: ({formname, fieldname, value}) => state => {
        console.log("Update ", formname, fieldname, value);
        return {
            forms: Object.assign({}, state.forms,  {
                [formname]: Object.assign({}, state.forms[formname], {
                    [fieldname]: value
                })
            })
        }
    },

    addErrors: ({formname, errors}) => state => {
        console.log("Add errors ", errors );
        return {
            forms: Object.assign({}, state.forms,  {
                [formname]: Object.assign({}, state.forms[formname], {
                    errors
                })
            })
        }
    }

}