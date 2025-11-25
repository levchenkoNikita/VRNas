class HowStarted {
    selectors = {
        howStarted: "[data-js-how-started]",
        howStartedAnimation: "[data-js-how-started-animation]"
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        isVisible: 'is-visible'
    }

    constructor() {

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.observer.unobserve(entry.target);
                }
            })
        })

        this.howStartedElement = document.querySelector(this.selectors.howStarted);
        this.elementsAnimation = this.howStartedElement.querySelectorAll(this.selectors.howStartedAnimation);
        this.bindEvents();
    }

    bindEvents() {
        this.elementsAnimation.forEach(el => {
            this.observer.observe(el);
        })
    }
}

export default HowStarted;