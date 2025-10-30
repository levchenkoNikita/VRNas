class Header {
    selectors = {
        menu: "[data-js-header-menu]",
        select: "[data-js-header-select]",
        selectButton: "[data-js-header-select-button]",
        selectList: "[data-js-header-select-list]",
        burgerButton: "[data-js-header-burger-button]"
    }

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock"
    }

    constructor() {
        this.currentSelect = [];
        this.bindEvents();
    }

    onClick(event) {
        const clickElement = event.target;
        
        // Работа меню выбора Ссылок
        if ("jsHeaderSelectButton" in clickElement.dataset) {
            this.handleMenuList(clickElement);
        }
        else {
            if (this.currentSelect.length > 0) {
                this.currentSelect[1].classList.remove("is-active");
                this.currentSelect[2].classList.remove("is-active");
                this.currentSelect = [];
            }
        }

        // Работа Бургер Кнопки
        if("jsHeaderBurgerButton" in clickElement.dataset) {
            this.handleBurgerButton(clickElement);
        }
    }

    handleMenuList(clickElement) {
        const selectElement = clickElement.closest(this.selectors.select);
        const selectList = selectElement.querySelector(this.selectors.selectList);

        if (this.currentSelect.length > 0 && this.currentSelect[0] != selectElement) {
            this.currentSelect[1].classList.remove("is-active");
            this.currentSelect[2].classList.remove("is-active");
        }

        clickElement.classList.toggle("is-active");
        selectList.classList.toggle("is-active");
        this.currentSelect = [selectElement, clickElement, selectList];
    }

    handleBurgerButton(clickElement) {
        clickElement.classList.toggle("is-active");
    }

    bindEvents() {
        document.addEventListener('click', (event) => this.onClick(event));
    }
}

export default Header;