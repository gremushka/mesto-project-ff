import { openModal } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(
  cardContent,
  cardTemplate,
  removeFunction,
  likeFunction,
  showFunction
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = cardContent.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardImage.addEventListener("click", () => showFunction(card));

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeFunction(card));

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeFunction);

  return card;
}

function deleteCard(element) {
  element.remove();
}

function showCard(element) {
  const popupShowImage = document.querySelector(".popup_type_image");
  const popupImage = document.querySelector(".popup__image");
  let popupImageCaption = document.querySelector(".popup__caption");
  const cardImage = element.querySelector(".card__image");
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;
  openModal(popupShowImage);
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function addInitialCards(element, cardTemplate, cards) {
  for (let i = 0; i < cards.length; i++) {
    element.append(
      createCard(cards[i], cardTemplate, deleteCard, likeCard, showCard)
    );
  }
}

export {
  initialCards,
  addInitialCards,
  createCard,
  deleteCard,
  likeCard,
  showCard,
};
