import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupShowImage = document.querySelector(".popup_type_image");

const popups = document.querySelectorAll(".popup");

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const profileForm = document.forms[0];
const newCardForm = document.forms[1];

const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");

addInitialCards(placesList, cardTemplate, initialCards);

popups.forEach((element) => {
  element.classList.add("popup_is-animated");
  element.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_is-opened")) {
      closeModal(element);
    }
    if (event.target.classList.contains("popup__close")) {
      closeModal(element);
    }
  });
});

buttonEditProfile.addEventListener("click", () =>
  editProfileButtonHandler(popupEditProfile)
);

buttonAddCard.addEventListener("click", () => openModal(popupNewCard));
profileForm.addEventListener("submit", changeProfile);
newCardForm.addEventListener("submit", addCard);

function editProfileButtonHandler(element) {
  openModal(element);
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
}

function changeProfile(event) {
  event.preventDefault();
  profileDescription.textContent = profileForm.elements.description.value;
  profileTitle.textContent = profileForm.elements.name.value;
  closeModal(popupEditProfile);
  //убрал очистку формы потому что не имеет смысла
}

function addCard(event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = newCardForm.elements["place-name"].value;
  cardData.link = newCardForm.elements["link"].value;
  closeModal(popupNewCard);
  placesList.prepend(
    createCard(cardData, cardTemplate, deleteCard, likeCard, showCard)
  );
  newCardForm.reset();
}

function addInitialCards(element, cardTemplate, cards) {
  for (let i = 0; i < cards.length; i++) {
    element.append(
      createCard(cards[i], cardTemplate, deleteCard, likeCard, showCard)
    );
  }
}

function showCard(element) {
  const cardImage = element.querySelector(".card__image");
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;
  openModal(popupShowImage);
}
