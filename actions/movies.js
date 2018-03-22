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

    updateEditing: item => state => ({
        editing: item
    })
}