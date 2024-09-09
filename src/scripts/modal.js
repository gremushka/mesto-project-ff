function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(event) {
  if (event.code === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}

export { openModal, closeModal, closeByEscape };
