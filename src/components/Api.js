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
            name: data.profileName,
            about: data.profileDescription
          }),
        })
        .then(this._checkPromiseStatus);
      }

    /*createNewCard(item) {
        return fetch("https://mesto.nomoreparties.co/v1/cohort-61/cards", {   
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "25ba17d7-1766-40fc-b636-0f2523c53d74"
            },
            body: JSON.stringify(item)
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    } */
}