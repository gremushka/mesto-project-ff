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

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
