class Testimonial {
  selectors = {
    root: '[data-js-testimonial-content]',
    client: '[data-js-testimonial-client-position]',
    popup: '[data-js-testimonial-popup]',
  };

  stateClasses = {
    isActive: 'is-active', isDisabled: 'is-disabled',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.allClients = this.rootElement.querySelectorAll(this.selectors.client);
    this.allPopups = this.rootElement.querySelectorAll(this.selectors.popup);

    this.bindEvents();
  }

  showPopup = (event) => {
    const client = event.target.closest(this.selectors.client);
    if (!client) return;

    const {isActive, isDisabled} = this.stateClasses;

    const isCurrentlyActive = client.classList.contains(isActive);

    this.allPopups.forEach(popup => popup.classList.add(isDisabled));
    this.allClients.forEach(client => client.classList.remove(isActive));

    if (isCurrentlyActive) return;

    const popup = client.querySelector(this.selectors.popup);
    if (popup) {
      popup.classList.remove(isDisabled);
    }

    client.classList.add(isActive);
  };

  offsetPopup = (event) => {
    const client = event.target.closest(this.selectors.client);
    if (!client) return;

    //для сохранения начального положения элемента
    let initialPosition = {top: 0, left: 0};
    initialPosition.top = client.offsetTop;
    initialPosition.left = client.offsetLeft;

    const popup = client.querySelector(this.selectors.popup);

    const rect = popup.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
      const overflowRight = rect.right - window.innerWidth;
      client.style.left = (client.offsetLeft - overflowRight) + "px";
    }
  };

  bindEvents() {
    this.rootElement.addEventListener('click', (event) => {
      this.showPopup(event);
      this.offsetPopup(event);
    });
  }
}

export default Testimonial;