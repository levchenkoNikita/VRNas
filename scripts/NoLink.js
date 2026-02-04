class NoLink {
    selectors = {
        noLinkElement: ".no-link",
        noLinkParents: "[data-js-no-link]"
    }

    stateClasses = {
        isActive: 'is-active'
    }

    variables = {
        lastElement: null,
        timer: null
    }

    constructor() {
        this.noLinkParents = document.querySelectorAll(this.selectors.noLinkParents);
        this.bindEvents();
    }

    createNoLinkElement() {
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.setAttribute("class", "no-link");
        span.textContent = "Link hasn't been added";
        div.appendChild(span);
        return div;
    }

    timeActivity() {
        this.variables.timer = setTimeout(() => {
            return this.deactivationNoLinkElement();
        }, 2000);
    }

    timeClear() {
        clearTimeout(this.variables.timer);
        this.variables.timer = null;
    }

    activationNoLinkElement(noLink) {
        this.timeClear();
        noLink.classList.add(this.stateClasses.isActive);
        this.variables.lastElement = noLink;
        this.timeActivity();
    }

    deactivationNoLinkElement() {
        if (!this.variables.lastElement) {
            return;
        }
        this.variables.lastElement.classList.remove(this.stateClasses.isActive);
        this.variables.lastElement = null;
        this.timeClear();
    }

    onClickNoLinkElement() {
        const element = event.target.closest(this.selectors.noLinkParents);

        if (!element) {
            this.timeClear();
            return this.deactivationNoLinkElement();
        }

        const noLink = element.querySelector(this.selectors.noLinkElement);

        if (noLink) {
            if (this.variables.timer) {
                this.deactivationNoLinkElement();
            }
            return this.activationNoLinkElement(noLink);
        }

        if (this.variables.timer) {
            this.deactivationNoLinkElement();
        }

        const div = this.createNoLinkElement();
        element.appendChild(div);
        setTimeout(() => {
            div.classList.add(this.stateClasses.isActive);
        });
        this.variables.lastElement = div;
        this.timeActivity();
    }

    onClickNoLinkParent() {
        const element = event.target.closest(this.selectors.noLinkParents);

        if (!element) {
            return;
        }

        event.preventDefault();
    }

    bindEvents = () => {
        document.documentElement.addEventListener('click', this.onClickNoLinkElement.bind(this));
        document.documentElement.addEventListener('click', this.onClickNoLinkParent.bind(this));
    }
}

export default NoLink;