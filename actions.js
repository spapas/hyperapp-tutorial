
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
    
    updatePeople: people => state => ({
        people: people
    }),
    
    updatePerson: person => state => ({
        person: person
    }),
    
    loadPeople: url => (state, actions) => {
        console.log("LOADING");
        actions.updateLoading(true)
        setTimeout(() => fetch(url).then(function (r) { return r.json() }).then(function (j) {
          console.log(j);
          actions.updatePeople(j);
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
    }
}
