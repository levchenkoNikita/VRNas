class Header {
    selectors = {
        header: "[data-js-header]",
        menu: "[data-js-header-menu]",
        select: "[data-js-header-select]",
        selectButton: "[data-js-header-select-button]",
        selectList: "[data-js-header-select-list]",
        burgerButton: "[data-js-header-burger-button]"
    }

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock",
        isScrolling: "is-scrolling"
    }

    constructor() {
        this.headerElement = document.querySelector(this.selectors.header);
        this.menuElement = document.querySelector(this.selectors.menu);
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
                this.currentSelect[1].classList.remove(this.stateClasses.isActive);
                this.currentSelect[2].classList.remove(this.stateClasses.isActive);
                this.currentSelect = [];
            }
        }

        // Работа Бургер Кнопки
        if("jsHeaderBurgerButton" in clickElement.dataset) {
            this.handleBurgerButton(clickElement);
        }
    }

    onScroll() {
        const isScrolling = window.scrollY > 0;

        if(isScrolling) {
            this.headerElement.classList.add(this.stateClasses.isScrolling);
        }
        else {
            this.headerElement.classList.remove(this.stateClasses.isScrolling);
        }
    }

    handleMenuList(clickElement) {
        const selectElement = clickElement.closest(this.selectors.select);
        const selectList = selectElement.querySelector(this.selectors.selectList);

        if (this.currentSelect.length > 0 && this.currentSelect[0] != selectElement) {
            this.currentSelect[1].classList.remove(this.stateClasses.isActive);
            this.currentSelect[2].classList.remove(this.stateClasses.isActive);
        }

        clickElement.classList.toggle(this.stateClasses.isActive);
        selectList.classList.toggle(this.stateClasses.isActive);
        this.currentSelect = [selectElement, clickElement, selectList];
    }

    handleBurgerButton(clickElement) {
        const isScrolling = this.headerElement.classList.contains(this.stateClasses.isScrolling);

        if(!isScrolling) {
            this.headerElement.classList.toggle(this.stateClasses.isActive);
        }

        clickElement.classList.toggle(this.stateClasses.isActive);
        this.menuElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }

    bindEvents() {
        document.documentElement.addEventListener('click', (event) => this.onClick(event));
        window.addEventListener('scroll', () => this.onScroll());
    }
}

export default Header;