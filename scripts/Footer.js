class Footer {
    selectors = {
        footer: "[data-js-footer-block]",
        animation: "[data-js-animation]"
    }

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock",
        isVisible: "is-visible"
    }

    variables = {
        observer: null
    }

    constructor() {
        this.initDOM_Element();
        this.initVariables();
        this.bindEvents();
    }

    initDOM_Element = () => {
        this.rootElement = document.querySelector(this.selectors.footer);
        this.animationElements = this.rootElement.querySelectorAll(this.selectors.animation);
    }

    initVariables = () => {
        this.variables.observer = new IntersectionObserver(entries => {
            for(const entry of entries) {
                if(entry.isIntersecting) {
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.variables.observer.unobserve(entry.target);
                }
            }
        })
    }

    bindEvents = () => {
        this.animationElements.forEach(element => {
            this.variables.observer.observe(element);
        });
    }
}

export default Footer;