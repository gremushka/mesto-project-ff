function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(event) {
  const modal = document.querySelector(".popup_is-opened");
  if (event.code === "Escape") {
    closeModal(modal);
  }
}

export { openModal, closeModal, closeByEscape };
