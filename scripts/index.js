const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

AddCards(placesList, initialCards);

function AddCards(element, cards) {
  for (i = 0; i < cards.length; i++) {
    element.append(GetCard(cards[i], cardTemplate, DeleteCard));
  }
}

function GetCard(cardContent, cardTemplate, removeFunction) {
  card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__title").textContent = cardContent.name;
  card.querySelector(".card__image").src = cardContent.link;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeFunction);
  return card;
}

function DeleteCard(event) {
  event.target.parentNode.remove();
}
