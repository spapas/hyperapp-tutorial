import { updateField, addErrors } from "./forms.js"


module.exports = {
  load: url => (state, actions) => {
    actions.updateLoading(true)
    setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
      let match = url.match(/\?page=(\d+)/)
      let page = 1;
      if (match) page = 1*match[1]

      actions.update({response: j, current: url, page});
      actions.updateLoading(false)
    }), 100);
  },

  updateLoading: loading => state => ({
    loading
  }),

  updateShowPlot: showPlot => state => ({
    showPlot
  }),

  update: ({response, current, page}) => state => ({
    page,
    current,
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

  saveEdit: ({key, g_actions}) => (state, actions) => {
    actions.updateLoading(true);
    let item = state.forms.edit;
    let saveUrl = '';
    let method = '';
    if(item.id) { // UPDATE
      saveUrl = item.url;
      method = 'PATCH';
    } else { // CREATE
      saveUrl = window.g_urls.movies;
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
  updateField,
  addErrors
};
