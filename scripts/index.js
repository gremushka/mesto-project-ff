const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

addCards(placesList, initialCards);

function addCards(element, cards) {
  for (i = 0; i < cards.length; i++) {
    element.append(createCard(cards[i], cardTemplate, deleteCard));
  }
}

function createCard(cardContent, cardTemplate, removeFunction) {
  card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__title").textContent = cardContent.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeFunction);
  return card;
}

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}
