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

      saveEdit: ({key, g_actions}) => (state, actions) => {
        actions.updateLoading(true);
        let item = state.forms.edit;

        console.log("ITEM IS", item)
        for(var k in item) {
            let v = item[k];
            if(Array.isArray(v)) {
                item[k] = v.map(x=> { 
                    console.log(" V IS ", v)
                    return {
                        'id': x.id,
                        'name': x.text
                    }
                } 
                )
            }
        }
        console.log(JSON.stringify(item))
        let saveUrl = '';
        let method = '';
        if(item.id) { // UPDATE
            saveUrl = item.url;
            method = 'PATCH';
        } else { // CREATE
            saveUrl = window.g_urls.movies;
            method = 'POST';
        }
        console.log(g_urls)
        console.log(saveUrl)

        window.setTimeout( () => {
        fetch(saveUrl, {
            body: JSON.stringify(item),
            headers: {
            'content-type': 'application/json',
            'Authorization': 'Token ' + key
            },
            method,
        }).then(response => {
            actions.updateLoading(false);

            if(response.status == 400) {
            response.json().then(errors => {
                actions.addErrors({formname: 'edit', errors});
            });
            } else if(response.status == 200 || response.status == 201) {
            response.json().then(data => {
                // Data is the object that was saved
                g_actions.toasts.add({text: 'Successfully saved object!', style: 'success'} );
                actions.updateEdit(null);
                actions.load(state.current);
            });
            }
        }).catch(error => {
            console.log('ERR', error.status);
        });
        }, 500);
    },


}