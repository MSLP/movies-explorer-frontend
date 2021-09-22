class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getMovies() {
    return fetch(`${this.baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
      });
  }
}

export default new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});
