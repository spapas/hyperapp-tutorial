import { getExistingAuth } from './util/auth.js'

const genericState = {
    loading: false,
    page: null,
    count: 0,
    next: null,
    previous: null,
    items: [],
    forms: {
      edit: null,
      search: {}
    }
  }

const existingAuth = getExistingAuth()
  
const state = module.exports = {
  auth: {
    key: existingAuth.key,
    username: existingAuth.username,
    loading: false,
    forms: {
      login: {}
    }
  },
  location: location.state,
  toasts: {
    items: []
  },
  movies: Object.assign({}, genericState, {
    showPlot: false,
  }),
  people: Object.assign({}, genericState),
  genres: Object.assign({}, genericState),
  jobs: Object.assign({}, genericState)
};
