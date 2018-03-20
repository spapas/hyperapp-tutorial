
const state = module.exports = {
    auth: {
        key: null,
        username: null,
        password: null,
        loading: false
    },
    location: location.state, 
    toasts: {
        items: []
    },
    movies: {
        showPlot: false,
        loading: false,
        page: null,
        count: 0,
        next: null,
        previous: null,
        items: []
    },
    people: {
        loading: false,
        page: null,
        count: 0,
        next: null,
        previous: null,
        items: [],
        editing: null
    },
    forms: {}
}
