import { putLike, deleteLike, deleteCard } from "./api.js";

function createCard(
  cardContent,
  cardTemplate,
  removeFunction,
  likeFunction,
  showFunction,
  currentUserId
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = cardContent.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardImage.addEventListener("click", () => showFunction(card));

  const deleteButton = card.querySelector(".card__delete-button");

  if (currentUserId == cardContent.owner._id) {
    card.dataset.id = cardContent._id;
    deleteButton.addEventListener("click", () => removeFunction(card));
  } else {
    deleteButton.remove();
  }

  const likeButton = card.querySelector(".card__like-button");
  likeButton.dataset.id = cardContent._id;

  if (cardContent.likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.textContent = cardContent.likes.length;
  likeButton.addEventListener("click", likeFunction);

  return card;
}

function removeCard(element) {
  console.log(element);
  const cardId = element.dataset.id;
  deleteCard(cardId)
    .then(() => {
      element.remove();
    })
    .catch((err) => {
      console.log("Ошибка. Запрос удаления карточки не выполнен");
    });
}

function likeCard(event) {
  const cardId = event.target.dataset.id;

  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((data) => {
        event.target.textContent = data;
        event.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка. Запрос удаления лайка не выполнен");
      });
  } else {
    putLike(cardId)
      .then((data) => {
        event.target.textContent = data;
        event.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка. Запрос установки лайка не выполнен");
      });
  }
}

export { createCard, removeCard, likeCard };
