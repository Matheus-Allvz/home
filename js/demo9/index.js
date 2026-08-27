import { preloadImages } from '../utils.js';

let lenis;
const contentElements = [...document.querySelectorAll('.content--sticky')];
const totalContentElements = contentElements.length;

// Setup Theme Switcher
const initThemeSwitcher = () => {
	const savedTheme = localStorage.getItem('matheus_portfolio_theme') || 'cyber';
	document.documentElement.setAttribute('data-theme', savedTheme);
	
	const themeBtns = document.querySelectorAll('.theme-btn');
	themeBtns.forEach(btn => {
		if (btn.getAttribute('data-set-theme') === savedTheme) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
		
		btn.addEventListener('click', () => {
			const theme = btn.getAttribute('data-set-theme');
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('matheus_portfolio_theme', theme);
			
			themeBtns.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			
			if (typeof ScrollTrigger !== 'undefined') {
				ScrollTrigger.refresh();
			}
		});
	});
};

const initSmoothScrolling = () => {
	// Detect touch device
	const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

	lenis = new Lenis({
		lerp: isTouch ? 0.2 : 0.12,
		smoothWheel: true,
		syncTouch: true,
		touchMultiplier: 1.5
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
					duration: 1.2,
					easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
				});
			} else {
				const targetEl = document.querySelector(targetId);
				if (targetEl) {
					lenis.scrollTo(targetEl, {
						offset: 0,
						duration: 1.2,
						easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
					});
				}
			}
		});
	});

	// Refresh ScrollTrigger on resize / orientationchange
	window.addEventListener('resize', () => {
		if (typeof ScrollTrigger !== 'undefined') {
			ScrollTrigger.refresh();
		}
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
				rotation: 20,
				scale: 0.9,
				filter: 'brightness(140%)'
			}, {
				ease: 'none',
				yPercent: -100,
				rotation: 0,
				scale: 1.02,
				filter: 'brightness(100%)',
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
	initThemeSwitcher();
    initSmoothScrolling();
    scroll();
};

preloadImages('.content__img, img').then(() => {
    document.body.classList.remove('loading');
    init();
});
