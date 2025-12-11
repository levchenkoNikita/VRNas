class Pricing {

    selectors = {
        pricing: "[data-js-pricing]",
        animation: "[data-js-animation]"
    }

    stateClasses = {
        isActive: 'is-active',
        isVisible: 'is-visible',
        isLock: 'is-lock'
    }

    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.observer.unobserve(entry.target);
                }
            })
        });

        this.rootElement = document.querySelector(this.selectors.pricing);
        this.arrayElementsAnimation = this.rootElement.querySelectorAll(this.selectors.animation);
        this.bindEvents();
    }

    bindEvents() {
        this.arrayElementsAnimation.forEach((el) => {
            this.observer.observe(el);
        });
    }
}

export default Pricing;