module.exports = {
    login: (g_actions) => (state, actions) => {
        actions.updateLoading(true)
        let data = {
            username: state.username,
            password: state.password
        }
        fetch(g_urls.login, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (r) { return r.json() }).then(function (j) {
            if(j.key) {
                actions.updateLogin(j.key);
                g_actions.toasts.add({text: "Successfully logged in!", style: "success"} )
                g_actions.location.go("/");

            } else {
                g_actions.toasts.add({text: "Error while logging in - please try again!", style: "error"})
            }
            actions.updateLoading(false)
        })
    },
    logout: (g_actions) => (state, actions) => {
        actions.updateLoading(true)
        setTimeout(() => fetch(g_urls.logout, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (r) { return r.json() }).then(function (j) {
            actions.updateLogin(null);
            g_actions.toasts.add({text: "Successfully logged out!", style: "success"})
            g_actions.location.go("/");
            actions.updateLoading(false)
        }), 500);
    },
    updateLoading: loading => state => ({
        loading
    }),
    updateLogin: key => state => ({
        key,
        password: ''
    }),
}
