
const reducers = module.exports = {
    updateText: newValue => state => ({
      'text': newValue
    }),
    
    updateCount: newValue => state => ({
      'count': 1 * newValue
    }),
    
    updateLoading: loading => state => ({
        loading
    }),
    
    updateLoadingFilms: loadingFilms => state => ({
        loadingFilms
    }),
    
    updatePeople: ({people, page}) => state => ({
        people: people,
        page: page
    }),
    
    updateFilms: films => state => ({
        films: films
    }),
    
    updatePerson: person => state => ({
        person: person
    }),
    
    loadPeople: url => (state, actions) => {
        console.log("LOADING");
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
    
    loadPerson: id => (state, actions ) => {
        setTimeout(() => fetch('https://swapi.co/api/people/'+id).then(function (r) { return r.json() }).then(function (j) {
          console.log(j);
          actions.updatePerson(j);
          actions.updateLoading(false);
        }), 100);
    },
    
    loadPersonAndGo: id => (state, actions ) => {
        actions.updateLoading(true);
        console.log("ROUTER")
        actions.router.go('#/view/'+id);
    },
    
    displayModal: id => (state, actions) => {
        actions.loadPerson(id)
        actions.updateLoading(true);
        return {
            person: 'loading'
        }
        
    },
    
    hideModal: id => state => {
        person: undefined
    },
    
    addToast: text => state => ({
        toasts: [...state.toasts, text]
    }),
    
    hideToast: text => state => {
        let idx = state.toasts.indexOf(text)
        return {
            toasts: [
                ...state.toasts.slice(0, idx),
                ...state.toasts.slice(idx+1),
            ]
        }
    },
    
    updateForm: ({object, field, value}) => state => {
        console.log("updateform", object, field, value)
        return {
            [object]: Object.assign({}, state[object], {
                [field]: value
            })
            
        }
    },
    savePerson: id => (state, actions) => {
        console.log("Fake saving person ", id)
        actions.updateLoading(true);
        setTimeout(() => {
            actions.hideModal();
            actions.updateLoading(false);
            actions.addToast(`Person ${id} saved ok!`)
        }, 500);
    },
    
    loadFilms: films => (state, actions) => {
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
