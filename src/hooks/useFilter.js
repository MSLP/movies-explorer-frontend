function filterValidFields(array) {
  return array.filter((movie) => {
    if (!movie.country || !movie.director || !movie.duration
      || !movie.year || !movie.description || !movie.image.formats.thumbnail.url
      || !movie.trailerLink || !movie.id || !movie.nameRU
      || !movie.nameEN) return false;
    return true;
  }).map((movie) => ({
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`,
    trailer: movie.trailerLink,
    thumbnail: `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`,
    owner: null,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    saved: false,
    _id: null,
  }));
}

function filterSavedMovies(all, saved) {
  return all.map((el) => {
    const newEl = el;
    const candidateList = saved.filter((e) => newEl.movieId === e.movieId);
    if (candidateList.length) {
      newEl.saved = true;
      newEl._id = candidateList[0]._id;
      newEl.owner = candidateList[0].owner;
    } else {
      newEl.saved = false;
      newEl._id = undefined;
      newEl.owner = undefined;
    }
    return newEl;
  });
}

export { filterValidFields, filterSavedMovies };
