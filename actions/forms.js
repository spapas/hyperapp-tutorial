module.exports =  ({formname, fieldname, value}) => state => {
    console.log("Update ", formname, fieldname, value);
    return {
        forms: Object.assign({}, state.forms,  {
            [formname]: Object.assign({}, state.forms[formname], {
                [fieldname]: value
            })
        })
    }
}

