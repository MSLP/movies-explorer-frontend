class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  register(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
      });
  }

  login(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(new Error(`Error: ${res.status}`));
      });
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse);
  }
}

export default new Auth({
  baseUrl: 'https://api.explorer.mslp.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
