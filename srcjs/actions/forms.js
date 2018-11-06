module.exports = {

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
    },

    searchAction: (reset) => (state, actions) => {
        if(reset) {
            actions.load(state.current.split('?')[0]);
            return {
                forms: Object.assign({}, state['forms'], {
                search: {}
                })
            };
        } else {
            let params = Object.keys(state.forms.search).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(state.forms.search[k])
            }).join('&');
            actions.load(state.current.split('?')[0]+'?'+params);
        }
    },

}