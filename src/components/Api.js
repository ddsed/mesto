export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkPromiseStatus(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {  
            method: "GET",
            headers: this._headers
        })
        .then(this._checkPromiseStatus);
    }

    getUserInfoApi() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        })
        .then(this._checkPromiseStatus);
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: data['form-name'],
            about: data['form-description']
          }),
        })
        .then(this._checkPromiseStatus);
      }

    createNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {   
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data['form-name'],
                link: data['form-description']
            }),
        })
        .then(this._checkPromiseStatus);
    }

    deleteCardApi(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then(this._checkPromiseStatus);
    }

    changeAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar['form-description']
        }),
      })
      .then(this._checkPromiseStatus);
    }
}