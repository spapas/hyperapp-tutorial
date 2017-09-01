
const reducers = module.exports = {
    updateText: (state, actions, newValue) => {
        return {
          'text': newValue
        }
    },
    
    updateCount: (state, actions, newValue) => {
        return {
          'count': 1 * newValue
        }
    },
    
    updateLoading: (_, __, loading) => ({
        loading
    }),
    
    updatePeople: (state, actions, people) => ({
        people: people
    }),
    
    updatePerson: (state, actions, person) => ({
        person: person
    }),
    
    loadPeople: (state, actions, url) => {
        actions.updateLoading(true)
        setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
          console.log(j);
          actions.updatePeople(j);
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
    }
}