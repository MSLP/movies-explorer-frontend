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
        return res.json()
          .then((err) => Promise.reject(new Error(`${err.message}`)));
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
        return res.json()
          .then((err) => Promise.reject(new Error(`${err.message}`)));
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
      .then((res) => {
        if (res.ok) return res.json();
        return res.json()
          .then((err) => Promise.reject(new Error(`${err.message}`)));
      });
  }
}

export default new Auth({
  baseUrl: 'https://api.explorer.mslp.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
