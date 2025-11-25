class OurService {

    selectors = {
        ourService: "[data-js-our-service]",
        ourServiceList: "[data-js-our-service-list]",
        ourServiceItem: "[data-js-our-service-item]",
        ourServiceAnimation: "[data-js-our-service-animation]"
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        isVisible: 'is-visible'
    }

    constructor() {

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.observer.unobserve(entry.target);
                }
            })
        })

        this.elementsAnimation = document.querySelector(this.selectors.ourService).querySelectorAll(this.selectors.ourServiceAnimation);
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

        this.elementsAnimation.forEach(el => {
            this.observer.observe(el);
        });
    }
}

export default OurService;