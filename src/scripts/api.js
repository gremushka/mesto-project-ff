const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "98f8273d-ab44-4099-919b-bf1a95bd11af",
    "Content-Type": "application/json",
  },
};

async function getUser() {
  return fetch(`${apiConfig.baseUrl}/users/me`, { headers: apiConfig.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос профайла не выполнен");
    });
}

async function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, { headers: apiConfig.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос карточек не выполнен");
    });
}
async function patchProfile(name, info) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: info,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос изменения профайла не выполнен");
    });
}
async function patchAvatar(avatar) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос изменения аватара не выполнен");
    });
}

async function putLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      return data.likes.length;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос проставления like не выполнен");
    });
}
async function deleteLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      return data.likes.length;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос удаления like не выполнен");
    });
}
async function deleteCard(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос удаления карточки не выполнен");
    });
}
async function postCard(cardContent) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardContent.name,
      link: cardContent.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос создания карточки не выполнен");
    });
}
export {
  getUser,
  getInitialCards,
  patchProfile,
  patchAvatar,
  putLike,
  deleteLike,
  deleteCard,
  postCard,
};
