class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        return res.json()
          .then((err) => {
            console.log('movies api', err);
            if (err.message.includes('movies')) return Promise.resolve([]);
            return Promise.reject(err.message);
          })
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
      });
  }

  saveMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(movie),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message))
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
      });
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message))
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message))
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
      });
  }

  changeUserInfo(newInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(newInfo),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message))
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
      });
  }
}

export default new MainApi({
  baseUrl: 'https://api.explorer.mslp.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
