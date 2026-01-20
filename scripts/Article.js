class Article {
    selectors = {
        article: "[data-js-article]",
        slider: "[data-js-slider]",
        popArticleList: "[data-js-pop-article-list]",
        popArticleElement: "[data-js-pop-article-element]",
        popPaganationList: "[data-js-pop-paganation-list]",
        popPaganationButton: "[data-js-pop-paganation-button]",
        animation: "[data-js-animation]"
    }

    stateClasses = {
        isActive: 'is-active',
        isVisible: 'is-visible',
        isLock: 'is-lock'
    }

    variables = {
        lastPaganationButton: null,
        lastArticleElement: null,
        accord: {},
        interval: null,
        animationTime: 6000
    }

    constructor() {
        this.initDOM_Element();
        this.initVariables();
        this.initIntersectionObserver();
        this.bindEvents();
    }

    initIntersectionObserver = () => {
        this.observer = new IntersectionObserver((entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.getAttribute("data-js-slider")) {
                        this.timer(1);
                    }
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.observer.unobserve(entry.target);
                }
            })
        }));
    }

    initDOM_Element = () => {
        this.rootElement = document.querySelector(this.selectors.article);
        this.animationElements = this.rootElement.querySelectorAll(this.selectors.animation);
        this.popArticleList = this.rootElement.querySelector(this.selectors.popArticleList);
        this.popPaganationList = this.rootElement.querySelector(this.selectors.popPaganationList);
        this.firstPopPaganationButton = this.popPaganationList.querySelector(this.selectors.popPaganationButton);
        this.popArticleListElements = this.popArticleList.querySelectorAll(this.selectors.popArticleElement);
        this.popPaganationListElements = this.popPaganationList.querySelectorAll(this.selectors.popPaganationButton);
    }

    initVariables = () => {
        this.variables.lastPaganationButton = this.popPaganationListElements[0];
        this.variables.lastArticleElement = this.popArticleListElements[0];
        this.popPaganationListElements.forEach((element, index) => {
            this.variables.accord[index + 1] = this.popArticleListElements[index];
        })
    }

    timer = (index) => {
        const interval = setInterval(() => {
            if (this.variables.lastPaganationButton && this.variables.lastArticleElement) {
                this.variables.lastPaganationButton.classList.remove(this.stateClasses.isActive);
                this.variables.lastArticleElement.classList.remove(this.stateClasses.isActive);
            }

            this.popPaganationListElements[index - 1].classList.add(this.stateClasses.isActive);

            for (const key in this.variables.accord) {
                if (key == index) {
                    this.variables.accord[key].classList.add(this.stateClasses.isActive);
                    this.variables.lastArticleElement = this.variables.accord[key];
                }
                const percentage = 100 * (index - 1);
                this.variables.accord[key].style.transform = `translateX(-${percentage}%)`;
            }

            this.variables.lastPaganationButton = this.popPaganationListElements[index - 1];
            this.variables.lastArticleElement = this.variables.accord[index];

            if (index == 4) {
                index = 1;
            }
            else {
                index++;
            }

        }, this.variables.animationTime);

        this.variables.interval = interval;
    }

    handlerPaganationClick() {
        const element = event.target.closest(this.selectors.popPaganationButton);

        if (!element || element.classList.contains(this.stateClasses.isActive)) {
            return;
        }

        clearInterval(this.variables.interval);

        if (this.variables.lastPaganationButton && this.variables.lastArticleElement) {
            this.variables.lastPaganationButton.classList.remove(this.stateClasses.isActive);
            this.variables.lastArticleElement.classList.remove(this.stateClasses.isActive);
        }

        const elementIndex = element.getAttribute('data-js-pop-paganation-button');
        element.classList.add(this.stateClasses.isActive);

        for (const key in this.variables.accord) {
            if (key == elementIndex) {
                this.variables.accord[key].classList.add(this.stateClasses.isActive);
                this.variables.lastArticleElement = this.variables.accord[key];
            }
            const percentage = 100 * (elementIndex - 1);
            this.variables.accord[key].style.transform = `translateX(-${percentage}%)`;
        }

        this.variables.lastPaganationButton = element;

        const index = Number(elementIndex) == 4 ? 1 : Number(elementIndex) + 1;

        this.timer(index);
    }

    bindEvents() {
        this.popPaganationList.addEventListener('click', this.handlerPaganationClick.bind(this));
        this.animationElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

export default Article;