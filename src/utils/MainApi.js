class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => {
            if (err.message.includes('movies')) return Promise.resolve([]);
            return Promise.reject(err.message);
          });
      });
  }

  saveMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(movie),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message));
      });
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message));
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message));
      });
  }

  changeUserInfo(newInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newInfo),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(err.message));
      });
  }
}

export default new MainApi({
  baseUrl: 'https://api.explorer.mslp.nomoredomains.monster',
});
