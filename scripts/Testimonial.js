class Testimonial {
    selectors = {
        testimonial: "[data-js-testimonial-block]",
        list: "[data-js-list]",
        article: "[data-js-article]",
        button: "[data-js-person-button]",
        animation: "[data-js-animation]"
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        isVisible: 'is-visible'
    }

    variables = {
        intersectionObserver: null,
        lastArticle: null
    }

    constructor() {
        this.initDOM_Element();
        this.initVariables();
        this.bindEvents();
    }

    initDOM_Element = () => {
        this.rootElement = document.querySelector(this.selectors.testimonial);
        this.listElement = this.rootElement.querySelector(this.selectors.list);
        this.animationElements = this.rootElement.querySelectorAll(this.selectors.animation);
    }

    initVariables = () => {
        this.variables.lastArticle = this.listElement.querySelector(this.selectors.article);

        this.variables.intersectionObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('testimonial__person-wrapper--1')) {
                        setTimeout(() => {
                            entry.target.classList.add(this.stateClasses.isActive);
                        }, 200);
                    }
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.variables.intersectionObserver.unobserve(entry.target);
                }
            }
        });
    }

    onClick() {
        const isElementButton = event.target.closest(this.selectors.button);

        if (this.variables.lastArticle) {
            this.variables.lastArticle.classList.remove(this.stateClasses.isActive);
        }

        if (!isElementButton) {
            return;
        }

        const element = event.target.closest(this.selectors.article);

        if (element == this.variables.lastArticle) {
            this.variables.lastArticle = null;
            return;
        }

        element.classList.add(this.stateClasses.isActive);
        this.variables.lastArticle = element;
    }

    bindEvents = () => {
        document.addEventListener('click', this.onClick.bind(this));

        this.animationElements.forEach(element => {
            this.variables.intersectionObserver.observe(element);
        });
    }
}

export default Testimonial;