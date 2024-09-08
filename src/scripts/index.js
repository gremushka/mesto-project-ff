import "../pages/index.css";
import {
  initialCards,
  addInitialCards,
  createCard,
  deleteCard,
  likeCard,
  showCard,
} from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");

const popups = document.querySelectorAll(".popup");
popups.forEach((element) => element.classList.add("popup_is-animated"));

// popupEditProfile.classList.add("popup_is-animated");
// popupShowImage.classList.add("popup_is-animated");
// popupNewCard.classList.add("popup_is-animated");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonLikeCards = document.querySelectorAll(".card__like-button");

const closeCross = document.querySelector(".popup__close");

addInitialCards(placesList, cardTemplate, initialCards);

document.addEventListener("click", (event) => {
  if (event.target === buttonEditProfile) {
    profileEditHandler(popupEditProfile);
  }
  if (event.target === buttonAddCard) {
    addNewCardHandler(popupNewCard);
  }

  if (event.target.classList.contains("popup__close")) {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
  if (event.target.classList.contains("popup_is-opened")) {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
});

function profileEditHandler(element) {
  openModal(element);
  const form = document.forms[0];
  form.elements.name.value =
    document.querySelector(".profile__title").textContent;
  form.elements.description.value = document.querySelector(
    ".profile__description"
  ).textContent;
  form.addEventListener("submit", changeProfile);
}

function changeProfile(event) {
  event.preventDefault();
  const form = event.target;
  form.removeEventListener("submit", changeProfile);
  document.querySelector(".profile__description").textContent =
    form.elements.description.value;
  document.querySelector(".profile__title").textContent =
    form.elements.name.value;
  closeModal(popupEditProfile);
  form.reset();
}

function addNewCardHandler(element) {
  openModal(element);
  const form = document.forms[1];
  form.addEventListener("submit", addCard);
}

function addCard(event) {
  event.preventDefault();
  const form = event.target;
  form.removeEventListener("submit", addCard);
  const cardData = {};
  cardData.name = form.elements["place-name"].value;
  cardData.link = form.elements["link"].value;
  closeModal(popupNewCard);
  placesList.prepend(
    createCard(cardData, cardTemplate, deleteCard, likeCard, showCard)
  );
  form.reset();
}
