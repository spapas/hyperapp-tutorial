import updateField from "./forms.js"


module.exports = {
    load: url => (state, actions) => {
        actions.updateLoading(true)
        
        setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
          console.log(url);
          console.log(j);
          let match = url.match(/\?page=(\d+)/)
          let page = 1;
          if (match) page = 1*match[1]
          
          actions.update({response: j, page});
          actions.updateLoading(false)
        }), 100);
    },

    updateLoading: loading => state => ({
        loading
    }),
    
    updateShowPlot: showPlot => state => ({
        showPlot
    }),

    update: ({response, page}) => state => ({
        page,
        count: response.count,
        next: response.next,
        previous: response.previous,
        items: response.results

    }),

    updateEdit: item => state => ({
        forms: Object.assign({}, state['forms'], {
            edit: item
        })
    }),

    saveEdit: key => state => {
        console.log("Saving ...", state)
        let item = state.forms.edit
        if(item.id) { // UPDATE

        } else { // CREATE
            console.log("Create new item")
            fetch(window.g_urls.movies, {
                body: JSON.stringify(item), 
                headers: {
                  'content-type': 'application/json',
                  'Authorization': "Token " + key
                },
                credentials: 'same-origin',
                method: 'POST',
                
              }).then(data => console.log(data)).catch(error => console.error(error))
        }
    },

    updateField
}