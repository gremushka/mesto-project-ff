import "../pages/index.css";
import { createCard, removeCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUser,
  getInitialCards,
  patchProfile,
  patchAvatar,
  postCard,
} from "./api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".popup__input__error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupShowImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");

const popups = document.querySelectorAll(".popup");

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonChangeAvatar = document.querySelector(".profile__image");

const profileForm = document.forms[0];
const newCardForm = document.forms[1];
const avatarForm = document.forms[2];

const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");
const profileImg = document.querySelector(".profile__image");

const initialData = await Promise.all([getUser(), getInitialCards()]);

const currentUserId = initialData[0]._id;

showProfile(initialData[0]);
addInitialCards(placesList, cardTemplate, initialData[1]);

popups.forEach((element) => {
  element.classList.add("popup_is-animated");
  element.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_is-opened")) {
      closeModal(element, validationConfig);
    }
    if (event.target.classList.contains("popup__close")) {
      closeModal(element, validationConfig);
    }
  });
});

buttonEditProfile.addEventListener("click", () =>
  editProfileButtonHandler(popupEditProfile)
);

buttonAddCard.addEventListener("click", () =>
  addCardButtonHandler(popupNewCard)
);
buttonChangeAvatar.addEventListener("click", () =>
  changeAvatarButtonHandler(popupAvatar)
);

profileForm.addEventListener("submit", changeProfile);
newCardForm.addEventListener("submit", addCard);
avatarForm.addEventListener("submit", changeAvatar);

enableValidation(validationConfig);

function showProfile(profileData) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImg.style.backgroundImage = `url(${profileData.avatar})`;
}

function addCardButtonHandler(element) {
  clearValidation(newCardForm, validationConfig);
  openModal(popupNewCard);
}

function editProfileButtonHandler(element) {
  openModal(element);
  clearValidation(profileForm, validationConfig);
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
}

function changeAvatarButtonHandler(element) {
  clearValidation(avatarForm, validationConfig);
  openModal(element);
}

function changeProfile(event) {
  event.preventDefault();
  profileDescription.textContent = profileForm.elements.description.value;
  profileTitle.textContent = profileForm.elements.name.value;
  patchProfile(
    profileForm.elements.name.value,
    profileForm.elements.description.value
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
  closeModal(popupEditProfile, validationConfig);
  profileForm.reset();
  clearValidation(profileForm, validationConfig);
}

function addCard(event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = newCardForm.elements["place-name"].value;
  cardData.link = newCardForm.elements["link"].value;
  const form = event.target;
  postCard(cardData).then((data) => {
    closeModal(popupNewCard, validationConfig);
    placesList.prepend(
      createCard(
        data,
        cardTemplate,
        removeCard,
        likeCard,
        showCard,
        currentUserId
      )
    );

    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
  });
}
function changeAvatar(event) {
  event.preventDefault();
  const avatar = avatarForm.elements["avatar"].value;
  patchAvatar(avatar).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
  closeModal(popupAvatar, validationConfig);
  profileImg.style.backgroundImage = `url(${avatar})`;
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
}

function addInitialCards(element, cardTemplate, cards) {
  for (let i = 0; i < cards.length; i++) {
    element.append(
      createCard(
        cards[i],
        cardTemplate,
        removeCard,
        likeCard,
        showCard,
        currentUserId
      )
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
