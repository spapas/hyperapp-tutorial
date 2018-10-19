import { updateField, addErrors, searchAction, saveEdit } from "./forms.js"


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

  saveEdit,
  searchAction,
  updateField,
  addErrors
};
