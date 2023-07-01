class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  async _request(url, options) {
    const res = await fetch(`${this._baseUrl}${url}`, { headers: this._headers, credentials: this._credentials, ...options });
    return this._getResponseData(res);
  }

  getInitialCards() {
    return this._request('cards');
  }
  getProfileData() {
    return this._request('users/me');
  }
  changeProfileData(data) {
    return this._request('users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    });
  }
  addNewCard(data) {
    return this._request('cards', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }
  changeAvatar(data) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
  deleteCard(cardID) {
    return this._request(`cards/${cardID}`, {
      method: 'DELETE',
    });
  }
  changeLikeCardStatus(cardID, isLiked) {
    return isLiked
      ? this._request(`cards/${cardID}/likes`, {
          method: 'PUT',
        })
      : this._request(`cards/${cardID}/likes`, {
          method: 'DELETE',
        });
  }
}
const api = new Api({
  baseUrl: 'http://localhost:3000/',
  headers: {
    // authorization: 'ad0e399e-98fe-4937-8e46-ff5ac7a149ca',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
export default api;
