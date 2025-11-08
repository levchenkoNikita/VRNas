class About {
	selectors = {
		aboutAnimation: '[data-js-about-animation]',
		aboutAnimationLeft: '[data-js-about-animation-left]'
	}
	
	stateClasses = {
		isVisible: 'is-visible',
		isVisibleForLeft: 'is-visible-for-left'
	}
	
	constructor() {
		this.aboutAnimationElements = document.querySelectorAll(this.selectors.aboutAnimation)
		this.aboutAnimationLeftElements = document.querySelectorAll(this.selectors.aboutAnimationLeft)
		this.initScrollAnimation()
	}
	
	initScrollAnimation() {
		if (this.aboutAnimationElements.length === 0 &&
			this.aboutAnimationLeftElements.length === 0) return
		
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if(entry.target.hasAttribute('data-js-about-animation-left') && entry.isIntersecting) {
					entry.target.classList.add(this.stateClasses.isVisibleForLeft )
				}
				if (entry.isIntersecting) {
					entry.target.classList.add(this.stateClasses.isVisible)
				}
			})
		})
		
		this.aboutAnimationElements.forEach(element => {
			observer.observe(element)
		})
		this.aboutAnimationLeftElements.forEach(element => {
			observer.observe(element)
		})
	}
}


export default About