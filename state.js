
const state = module.exports = {
    auth: {
        key: null,
        username: '123',
        loading: false,
        forms: {
            login: {}
        }
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
    }
}
