class Modal {
  init(button) {
    this.openButton = button;
    this.modal = document.getElementById(button.getAttribute('data-target'));
    this.closeButton = this.modal.querySelector('.modal__close');

    this.registerEvents();
  }

  registerEvents() {
    this.openButton.addEventListener('click', this.open.bind(this));

    this.closeButton.addEventListener('click', this.close.bind(this));
  }

  open() {
    this.modal.classList.remove('hidden');
  }

  close() {
    this.modal.classList.add('hidden');
  }
}

export default Modal;
