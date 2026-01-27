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

    variables = {
        onHoverOver: this.onHoverOver.bind(this),
        onHoverOut: this.onHoverOut.bind(this),
        handlerClick: this.handlerClick.bind(this),
        windowListener: false
    }

    constructor() {

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.stateClasses.isVisible);
                    this.observer.unobserve(entry.target);
                }
            })
        });

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

    handlerClick() {
        const element = event.target.closest(this.selectors.ourServiceItem);

        if(element == this.lastElement) {
            element.classList.toggle(this.stateClasses.isActive);
            return;
        }

        if (this.lastElement && this.lastElement.classList.contains(this.stateClasses.isActive)) {
            this.lastElement.classList.remove(this.stateClasses.isActive);
        }

        if (element) {
            element.classList.toggle(this.stateClasses.isActive);
            this.lastElement = element;
        }
    }

    bindEvents() {
        if (!this.variables.windowListener) {
            window.addEventListener('resize', () => {
                this.variables.windowListener = true;
                this.bindEvents();
            });
        }

        if (window.innerWidth > 1024) {
            this.listElement.addEventListener('mouseover', this.variables.onHoverOver);
            this.listElement.addEventListener('mouseout', this.variables.onHoverOut);
            document.documentElement.removeEventListener('click', this.variables.handlerClick);
        }
        else if (window.innerWidth <= 1024) {
            document.documentElement.addEventListener('click', this.variables.handlerClick);
            this.listElement.removeEventListener('mouseover', this.variables.onHoverOver);
            this.listElement.removeEventListener('mouseout', this.variables.onHoverOut);
        }

        this.elementsAnimation.forEach(el => {
            this.observer.observe(el);
        });
    }
}

export default OurService;