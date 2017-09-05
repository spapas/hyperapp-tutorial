
const reducers = module.exports = {
    updateText: (state, actions, newValue) => ({
      'text': newValue
    }),
    
    updateCount: (state, actions, newValue) => ({
      'count': 1 * newValue
    }),
    
    updateLoading: (_, __, loading) => ({
        loading
    }),
    
    updateLoadingFilms: (_, __, loadingFilms) => ({
        loadingFilms
    }),
    
    updatePeople: (state, actions, {people, page}) => ({
        people: people,
        page: page
    }),
    
    updateFilms: (state, actions, films) => ({
        films: films
    }),
    
    updatePerson: (state, actions, person) => ({
        person: person
    }),
    
    loadPeople: (state, actions, url) => {
        actions.updateLoading(true)
        
        setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
          console.log(url);
          console.log(j);
          let match = url.match(/\?page=(\d+)/)
          let page = 1;
          if (match) page = 1*match[1]
          
          actions.updatePeople({people: j, page});
          actions.updateLoading(false)
        }), 100);
    },
    
    loadPerson: (state, actions, id) => {
        setTimeout(() => fetch('https://swapi.co/api/people/'+id).then(function (r) { return r.json() }).then(function (j) {
          console.log(j);
          actions.updatePerson(j);
          actions.updateLoading(false);
        }), 100);
    },
    
    loadPersonAndGo: (state, actions, id) => {
        actions.updateLoading(true);
        console.log("ROUTER")
        actions.router.go('#/view/'+id);
    },
    
    displayModal: (state, actions, id) => {
        actions.loadPerson(id)
        actions.updateLoading(true);
        return {
            person: 'loading'
        }
        
    },
    
    hideModal: (state, actions, id) => ({
        person: undefined
    }),
    
    addToast: (state, actiosn, text) => ({
        toasts: [...state.toasts, text]
    }),
    
    hideToast: (state, actions, text) => {
        let idx = state.toasts.indexOf(text)
        return {
            toasts: [
                ...state.toasts.slice(0, idx),
                ...state.toasts.slice(idx+1),
            ]
        }
    },
    
    updateForm: (state, actions, {object, field, value} ) => {
        console.log("updateform", object, field, value)
        return {
            [object]: Object.assign({}, state[object], {
                [field]: value
            })
            
        }
    },
    savePerson: (state, actions, id) => {
        console.log("Fake saving person ", id)
        actions.updateLoading(true);
        setTimeout(() => {
            actions.hideModal();
            actions.updateLoading(false);
            actions.addToast(`Person ${id} saved ok!`)
        }, 500);
    },
    
    loadFilms: (state, actions, films) => {
        console.log("Loading films", films)
        let film_data = []
        actions.updateLoadingFilms(true);
        const grabContent = url => fetch(url).then(res => res.json()).then(j=> film_data.push(j))

        Promise.all(films.map(grabContent)).then(() => {
            console.log("OK", film_data)
            actions.updateLoadingFilms(false);
            actions.updateFilms(film_data)
        })
    }
}