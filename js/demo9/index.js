import { preloadImages } from '../utils.js';

let lenis;
const contentElements = [...document.querySelectorAll('.content--sticky')];
const totalContentElements = contentElements.length;

const initSmoothScrolling = () => {
	lenis = new Lenis({
		lerp: 0.15,
		smoothWheel: true
	});

	lenis.on('scroll', () => ScrollTrigger.update());

	const scrollFn = (time) => {
		lenis.raf(time);
		requestAnimationFrame(scrollFn);
	};
	requestAnimationFrame(scrollFn);

	// Setup smooth scrolling for anchor links & nav items
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (!targetId || targetId === '#') return;
			
			e.preventDefault();
			if (targetId === '#hero' || targetId === '#top') {
				lenis.scrollTo(0, {
					duration: 1.4,
					easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
				});
			} else {
				const targetEl = document.querySelector(targetId);
				if (targetEl) {
					lenis.scrollTo(targetEl, {
						offset: 0,
						duration: 1.4,
						easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
					});
				}
			}
		});
	});
};

const scroll = () => {
    contentElements.forEach((el, position) => {
		const isLast = position === totalContentElements - 1;
		const isPreLast = position === totalContentElements - 2;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: () => {
					if ( isLast ) {
						return 'top top';
					}
					else if ( isPreLast ) {
						return 'bottom top';
					}
					else {
						return 'bottom+=100% top';
					}
				},
                end: '+=100%',
                scrub: true
            }
        })
        .to(el, {
			ease: 'none',
            yPercent: -100
        }, 0);

		const img = el.querySelector('.content__img');
		if (img) {
			tl.fromTo(img, {
				yPercent: 20,
				rotation: 40,
				scale: 0.8,
				filter: 'contrast(300%)'
			}, {
				ease: 'none',
				yPercent: -100,
				rotation: 0,
				scale: 1,
				filter: 'contrast(100%)',
				scrollTrigger: {
					trigger: el,
					start: 'top bottom',
					end: 'max',
					scrub: true
				}
			}, 0);
		}
    });
};

const init = () => {
    initSmoothScrolling();
    scroll();
};

preloadImages('.content__img, img').then(() => {
    document.body.classList.remove('loading');
    init();
});
