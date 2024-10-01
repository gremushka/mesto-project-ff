const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "98f8273d-ab44-4099-919b-bf1a95bd11af",
    "Content-Type": "application/json",
  },
};
function testResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

async function getUser() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(testResult);
}

async function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(testResult);
}
async function patchProfile(name, info) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: info,
    }),
  }).then(testResult);
}
async function patchAvatar(avatar) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(testResult);
}

async function putLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  })
    .then(testResult)
    .then((data) => {
      return data.likes.length;
    });
}
async function deleteLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
    .then(testResult)
    .then((data) => {
      return data.likes.length;
    });
}
async function deleteCard(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(testResult);
}
async function postCard(cardContent) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardContent.name,
      link: cardContent.link,
    }),
  }).then(testResult);
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
