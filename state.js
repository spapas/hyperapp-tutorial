let existingAuth = localStorage.getItem("auth");

if(existingAuth) {
    try {
        existingAuth = JSON.parse(existingAuth);
    } catch(error) {
        existingAuth = null;
    }
}
if(!existingAuth) existingAuth = {key:'', username:''}


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
    movies: {
        showPlot: false,
        loading: false,
        page: null,
        count: 0,
        next: null,
        previous: null,
        current: null,
        items: [],
        forms: {
            edit: null,
            search: {}
        }
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
