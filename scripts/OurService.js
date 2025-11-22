class OurService {

    selectors = {
        ourServiceList: "[data-js-our-service-list]",
        ourServiceItem: "[data-js-our-service-item]"
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock'
    }

    constructor() {
        this.listElement = document.documentElement.querySelector(this.selectors.ourServiceList);
        this.lastElement = null;
        this.bindEvents();
    }

    onHoverOver(event) {
        const element = event.target.closest(this.selectors.ourServiceItem);

        if (element) {
            element.classList.add(this.stateClasses.isActive);
            this.lastElement = element;
        }
    }

    onHoverOut(event) {
        const element = event.target.closest(this.selectors.ourServiceItem);

        if (element && this.lastElement) {
            this.lastElement.classList.remove(this.stateClasses.isActive);
        }
    }

    bindEvents() {
        this.listElement.addEventListener('mouseover', (event) => {
            this.onHoverOver(event);
        });
        this.listElement.addEventListener('mouseout', (event) => {
            this.onHoverOut(event);
        });
    }
}

export default OurService;