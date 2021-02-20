import { apiSettings } from "./utils";

class Api {
  constructor(config) {
    this.url = config.url;

    if (localStorage.getItem('jwt')) {
      const jwtHeaders = {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      }
            config.headers = jwtHeaders;

    }
    this.headers = config.headers;


  }

  //Забираем все карточки
  getCards() {
    return fetch(`${this.url}cards`, { headers: this.headers })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка получения карточек: ${res.status}`);
      })
      .then((result) => {
        return result;

      })
      .catch((err) => this._displayErr(err));
  }

  //Получаем информацию о пользователе
  getUserInfo() {

    return fetch(`${this.url}users/me`, { headers: this.headers })
      .then((res) => {
                if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка получения информации о пользователе: ${res.status}`
        );
      })
      .then((result) => {

        return result;
      })
      .catch((err) => {

        this._displayErr(err);
      }
      );
  }

  //обновляем информацию о пользователе
  updateUserInfo(name, about) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка добавления информации о пользователе: ${res.status}`
        );
      })
      .then((result) => {
        return result;
      })
      .catch((err) => this._displayErr(err));
  }

  //Добавляем новое место
  createNewPlace(name, link) {
    return fetch(`${this.url}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка добавления новой карточки: ${res.status}`
        );
      })
      .then((result) => {
        return result;
      })
      .catch((err) => this._displayErr(err));
  }

  //Удаляем карточку
  deleteMyPlace(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          `Ошибка удаления карточки ${id} карточки: ${res.status}`
        );
      })
      .then((result) => {
        return result;
      })
      .catch((err) => this._displayErr(err));
  }

  //Ставим лайк
  likeCard(id, method) {
    return fetch(`${this.url}cards/${id}/likes`, {
      method: method,
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка лайканья ${id} карточки: ${res.status}`);
      })
      .then((result) => {

        return result;
      })
      .catch((err) => this._displayErr(err));
  }

  //Ставим новый аватар
  changeAvatar(avatarUrl) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка замены аватара: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => this._displayErr(err));
  }

  _displayErr(err) {
    alert(err);
  }
}

const api = new Api({
  url: apiSettings.url,
  headers: {
    authorization: apiSettings.token,
    "Content-Type": "application/json",
  },
});

export default api;
