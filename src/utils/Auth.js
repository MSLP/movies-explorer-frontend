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
          .then((err) => Promise.reject(new Error(`${err.message}`)))
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
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
          .then((err) => Promise.reject(new Error(`${err.message}`)))
          .catch((newErr) => Promise.reject(new Error(`${newErr}`)));
      });
  }
}

export default new Auth({
  baseUrl: 'https://api.explorer.mslp.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
