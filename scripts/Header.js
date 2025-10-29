class Header {
    selectors = {
        menu: "[data-js-header-menu]",
        select: "[data-js-header-select]",
        selectButton: "[data-js-header-select-button]",
        selectList: "[data-js-header-select-list]"
    }

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock"
    }

    constructor() {
        this.menuElement = document.querySelector(this.selectors.menu);
        this.bindEvents();
    }

    onClick(event) {
        console.log(event);
    }

    bindEvents() {
        this.menuElement.addEventListener('click', (event) => this.onClick(event));
    }
}

export default Header;