class Article {
    selectors = {
        article: "[data-js-article]",
        popArticleList: "[data-js-pop-article-list]",
        popArticleElement: "[data-js-pop-article-element]",
        popPaganationList: "[data-js-pop-paganation-list]",
        popPaganationButton: "[data-js-pop-paganation-button]"
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock'
    }

    variables = {
        lastPaganationButton: null
    }

    constructor() {
        const observer = new IntersectionObserver((entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // что-то там
                }
            })
        }));

        this.rootElement = document.querySelector(this.selectors.article);
        this.popArticleList = this.rootElement.querySelector(this.selectors.popArticleList);
        this.popPaganationList = this.rootElement.querySelector(this.selectors.popPaganationList);
        this.firstPopPaganationButton = this.popPaganationList.querySelector(this.selectors.popPaganationButton);
        this.variables.lastPaganationButton = this.firstPopPaganationButton;
        this.bindEvents();
    }

    handlerPaganationClick() {
        const element = event.target.closest(this.selectors.popPaganationButton);
        
        if(!element || element.classList.contains(this.stateClasses.isActive)) {
            return;
        }

        element.classList.add(this.stateClasses.isActive);
        
        if(this.variables.lastPaganationButton) {
            this.variables.lastPaganationButton.classList.remove(this.stateClasses.isActive);
        }

        this.variables.lastPaganationButton = element;
    }

    bindEvents() {
        this.popPaganationList.addEventListener('click', this.handlerPaganationClick.bind(this));
    }
}

export default Article;