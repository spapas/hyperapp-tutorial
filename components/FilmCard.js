const { h } = require('hyperapp')


const FilmCard = module.exports = ({film}) => <div class="card">

  <div class="card-header">
    <div class="card-title h5">{film.title}</div>
    <div class="card-subtitle text-gray">Episode: {film.episode_id}</div>
    <div class="card-subtitle text-gray">Release: {film.release_date}</div>
  </div>
  <div class="card-body">
    {film.opening_crawl}
  </div>
  <div class="card-image">
    <img src="http://is2.mzstatic.com/image/thumb/Video6/v4/61/16/ce/6116cec2-d2e8-de26-f80d-38a1685d04b8/source/1200x630bb.jpg" class="img-responsive" />
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Do</button>
  </div>
</div>
