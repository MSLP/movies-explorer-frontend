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
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
      });
  }

  saveMovie() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
      });
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
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
        return Promise.reject(new Error(`Error: ${res.status}`));
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
