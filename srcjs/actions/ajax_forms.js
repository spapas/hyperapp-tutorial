module.exports = (ajaxUrl) => ({
    saveEdit: ({key, g_actions}) => (state, actions) => {
        actions.updateLoading(true);
        let item = state.forms.edit;

        for(var k in item) {
            let v = item[k];
            if(Array.isArray(v)) {
                item[k] = v.map(x=> {
                    return {
                        'id': x.id,
                        'name': x.text
                    }
                }
                )
            }
        }
        let saveUrl = '';
        let method = '';
        if(item.id) { // UPDATE
            saveUrl = ajaxUrl+item.id+'/';
            method = 'PATCH';
        } else { // CREATE
            saveUrl = ajaxUrl;
            method = 'POST';
        }

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
})