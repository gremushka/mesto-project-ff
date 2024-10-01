function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(element) {
  document.removeEventListener("keydown", closeByEscape);
  element.classList.remove("popup_is-opened");
}

function closeByEscape(event) {
  if (event.code === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}

export { openModal, closeModal, closeByEscape };
