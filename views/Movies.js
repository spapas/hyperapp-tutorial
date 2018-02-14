import { h } from "hyperapp"

export const home = (state, actions) => <div>
    <h2>Movie list</h2>
      <div class="columns">
        <div class="column col-lg-12" oncreate={() => actions.movies.load(window.g_urls.movies)}>
            {state.movies.loading == true ? <Spinner /> : <MoviesTable movies={state.movies} actions={actions.movies} />}
        </div>
    </div>
</div>
