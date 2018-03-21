module.exports =  ({formname, fieldname, value}) => state => {
    console.log("updateField", formname, fieldname, value)
    console.log(state.forms[formname]);

    return {
        forms: Object.assign({}, state.forms,  {
            [formname]: Object.assign({}, state.forms[formname], {
                [fieldname]: value
            })
        })
    }
}

