module.exports =  ({formname, fieldname, value}) => state => {
    return {
        forms: Object.assign({}, state.forms,  {
            [formname]: Object.assign({}, state.forms[formname], {
                [fieldname]: value
            })
        })
    }
}

