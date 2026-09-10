/* ==========================================================================
   MATHEUS ALVES // EDITORIAL ENGINE JAVASCRIPT
   Preloader, Magnetic Physics, CRT Channel Switcher, Web Audio Synthesizer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // 1. ORIGINAL 1:1 ARCHITECTURE INTROLOADING TIMELINE
    // -------------------------------------------------------------
    const preloader = document.getElementById('sitePreloader');
    const words = [
        document.getElementById('word0'), // WELCOME
        document.getElementById('word1'), // TO
        document.getElementById('word2'), // THE PORTFOLIO
        document.getElementById('word3'), // OF
        document.getElementById('word4'), // MATHEUS
        document.getElementById('word5')  // ALVES
    ];
    const sentence = document.getElementById('introSentence');
    const subBox = document.getElementById('introSubBox');

    const showWord = (idx) => {
        words.forEach((w, i) => {
            if (w) {
                if (i === idx) {
                    w.classList.add('active');
                } else {
                    w.classList.remove('active');
                }
            }
        });
    };

    const hideAllWords = () => {
        words.forEach(w => w && w.classList.remove('active'));
    };

    const dismissPreloader = () => {
        if (!preloader || preloader.dataset.dismissed === 'true') return;
        preloader.dataset.dismissed = 'true';

        const wordsBox = document.getElementById('introloadingWordsBox');
        const lines = document.querySelectorAll('.initloading-line');

        // 1. Fade out words box
        if (wordsBox) {
            wordsBox.style.opacity = '0';
        }

        // 2. Staggered scaleY(0) curtain lines exit (matching Daniel Spatzek GSAP hide timeline)
        setTimeout(() => {
            lines.forEach((line, idx) => {
                setTimeout(() => {
                    line.style.transform = 'scaleY(0)';
                }, idx * 14);
            });
        }, 200);

        // 3. Remove container display
        setTimeout(() => {
            if (preloader) {
                preloader.style.display = 'none';
            }
        }, 200 + (lines.length * 14) + 450);
    };

    // Sequential timing calibrated for exact pacing & impact (Total ~4.5s)
    setTimeout(() => showWord(0), 120);
    setTimeout(() => showWord(1), 650);
    setTimeout(() => showWord(2), 1150);
    setTimeout(() => showWord(3), 1750);
    setTimeout(() => showWord(4), 2250);
    setTimeout(() => showWord(5), 2750);
    setTimeout(() => {
        hideAllWords();
        if (sentence) sentence.classList.add('active');
        if (subBox) subBox.classList.add('active');
    }, 3350);
    setTimeout(dismissPreloader, 4700);
    // Fallback safety dismissal
    setTimeout(dismissPreloader, 6500);


    // -------------------------------------------------------------
    // 2. LIVE UTC-3 MILLISECOND CLOCK & MOBILE DRAWER
    // -------------------------------------------------------------
    const clockEl = document.getElementById('liveClock');
    const drawerClockEl = document.getElementById('drawerClock');
    const updateClock = () => {
        const now = new Date();
        const options = {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeStr = now.toLocaleTimeString('pt-BR', options);
        const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
        const formatted = `${timeStr}.${ms} UTC-3`;
        if (clockEl) clockEl.textContent = formatted;
        if (drawerClockEl) drawerClockEl.textContent = formatted;
    };
    setInterval(updateClock, 50);
    updateClock();

    // Mobile Menu Drawer Handler
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavDrawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeDrawer = () => {
        if (mobileNavDrawer) {
            mobileNavDrawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });


    // -------------------------------------------------------------
    // 3. SYNTHESIZER SOUND FX ENGINE (Web Audio API)
    // -------------------------------------------------------------
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.isMuted = true;
            this.btn = document.getElementById('audioToggle');
            this.stateText = document.getElementById('audioStateText');
            this.init();
        }

        init() {
            if (this.btn) {
                this.btn.addEventListener('click', () => this.toggle());
            }
        }

        initContext() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        toggle() {
            this.initContext();
            this.isMuted = !this.isMuted;
            document.body.dataset.audio = this.isMuted ? 'off' : 'on';
            if (this.stateText) {
                this.stateText.textContent = this.isMuted ? 'OFF' : 'ON';
            }
            if (!this.isMuted) {
                this.playClick(600, 0.05);
            }
        }

        playClick(freq = 440, duration = 0.04) {
            if (this.isMuted || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + duration);

                gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {}
        }

        playCrtSwitch() {
            if (this.isMuted || !this.ctx) return;
            try {
                // Low thump + high static pulse
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(80, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

                gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.08);
            } catch (e) {}
        }
    }

    const sound = new SoundEngine();


    // -------------------------------------------------------------
    // 4. CUSTOM MAGNETIC CURSOR WITH LERP PHYSICS
    // -------------------------------------------------------------
    const cursor = document.getElementById('customCursor');
    const dot = cursor ? cursor.querySelector('.cursor-dot') : null;
    const circle = cursor ? cursor.querySelector('.cursor-circle') : null;
    const label = document.getElementById('cursorLabel');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (dot) {
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        }
        if (label) {
            label.style.left = `${mouseX}px`;
            label.style.top = `${mouseY}px`;
        }
    });

    const renderCursor = () => {
        // LERP interpolation
        circleX += (mouseX - circleX) * 0.18;
        circleY += (mouseY - circleY) * 0.18;
        if (circle) {
            circle.style.left = `${circleX}px`;
            circle.style.top = `${circleY}px`;
        }
        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const hoverables = document.querySelectorAll('a, button, .work-item, .lateral-item, .cmd-card, .spec-card, .cd-jewel-case, .kinetic-stamp, .slanted-badge');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hovering');
            sound.playClick(320, 0.03);
            if (label) {
                if (el.classList.contains('work-item') || el.classList.contains('lateral-item')) label.textContent = 'SWITCH CH';
                else if (el.classList.contains('cd-jewel-case')) label.textContent = 'PLAY';
                else if (el.classList.contains('contact-card--copy')) label.textContent = 'COPY';
                else if (el.classList.contains('kinetic-stamp') || el.closest('.kinetic-stamp')) label.textContent = 'MAC // 2026';
                else if (el.dataset.cursor) label.textContent = el.dataset.cursor;
                else label.textContent = 'VIEW';
            }
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hovering');
        });
    });

    const kineticStampEl = document.getElementById('kineticStamp');
    if (kineticStampEl) {
        kineticStampEl.addEventListener('click', () => {
            sound.playGlitchChirp();
            kineticStampEl.style.animationDuration = '3s';
            setTimeout(() => {
                kineticStampEl.style.animationDuration = '20s';
            }, 3000);
        });
    }


    // -------------------------------------------------------------
    // 5. CRT TV CHANNEL SWITCHING ENGINE (SELECTED WORKS)
    // -------------------------------------------------------------
    const lateralItems = document.querySelectorAll('.lateral-item');
    const portalSlides = document.querySelectorAll('.tv-channel-slide');
    const tvScreenPortal = document.getElementById('tvScreenPortal');
    let userHasManuallyTuned = false;

    if (lateralItems.length > 0) {
        lateralItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                userHasManuallyTuned = true;
                lateralItems.forEach(w => w.classList.remove('active'));
                item.classList.add('active');

                const chId = item.dataset.channel;

                if (tvScreenPortal) {
                    tvScreenPortal.classList.add('glitching');
                    sound.playCrtSwitch();

                    setTimeout(() => {
                        tvScreenPortal.classList.remove('glitching');
                    }, 140);
                }

                portalSlides.forEach(slide => {
                    if (slide.dataset.channel === chId) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            });
        });
    }


    // -------------------------------------------------------------
    // 6. CD JEWEL CASES HORIZONTAL SCROLL & DRAG
    // -------------------------------------------------------------
    const cdTrack = document.getElementById('cdGalleryTrack');
    const cdWrapper = document.querySelector('.cd-gallery-wrapper');
    if (cdWrapper) {
        cdWrapper.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                cdWrapper.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }


    // -------------------------------------------------------------
    // 7. COPY EMAIL TO CLIPBOARD WITH TOAST FEEDBACK
    // -------------------------------------------------------------
    const copyBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toast');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = copyBtn.dataset.email || 'workingaccount.matheus@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                sound.playClick(880, 0.06);
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2800);
                }
            });
        });
    }


    // -------------------------------------------------------------
    // 8. ELEGANT NAVBAR HIDE ON SCROLL & REVEAL AT TOP
    // -------------------------------------------------------------
    const hud = document.getElementById('editorialHud') || document.querySelector('.editorial-hud');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (hud) {
            if (y > 120) {
                hud.classList.add('hud--hidden');
            } else {
                hud.classList.remove('hud--hidden');
            }
        }
    }, { passive: true });



    // -------------------------------------------------------------
    // 9. GSAP SCROLLTRIGGER ENGINE: IMMEDIATE HERO PARALLAX & STREET TV ZOOM
    // -------------------------------------------------------------
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // A. HERO PARALLAX TIMELINE (IMMEDIATE, HIGH-IMPACT VELOCITY)
        const heroStage = document.getElementById('hero');
        const heroPainting = document.getElementById('heroBgPainting');
        const heroColLeft = document.getElementById('heroColLeft');
        const heroColRight = document.getElementById('heroColRight');
        const heroTitle = document.getElementById('heroTitle');
        const heroTopManifesto = document.getElementById('heroTopManifesto');
        const heroMetaRow = document.getElementById('heroMetaRow');
        const heroTicker = document.querySelector('.hero-ticker-wrap');

        if (heroStage && heroPainting) {
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroStage,
                    start: 'top top',
                    end: () => '+=' + (window.innerHeight * 1.1),
                    pin: true,
                    scrub: 0.3,
                    anticipatePin: 1
                }
            });

            // 1. Classical Masterpiece background moves with gentle, majestic parallax
            heroTl.to(heroPainting, {
                y: '-16%',
                ease: 'none',
                duration: 1
            }, 0);

            // 2. Left column (commandments) moves downwards
            if (heroColLeft) {
                heroTl.to(heroColLeft, {
                    y: '45vh',
                    opacity: 0,
                    ease: 'power1.in',
                    duration: 0.8
                }, 0);
            }

            // 3. Right column (kinetic stream) moves upwards
            if (heroColRight) {
                heroTl.to(heroColRight, {
                    y: '-45vh',
                    opacity: 0,
                    ease: 'power1.in',
                    duration: 0.8
                }, 0);
            }

            // 4. Top manifesto summary floats upwards and fades out early
            if (heroTopManifesto) {
                heroTl.to(heroTopManifesto, {
                    y: '-25vh',
                    opacity: 0,
                    ease: 'none',
                    duration: 0.35
                }, 0);
            }

            // 5. Center monumental title expands and diverges
            if (heroTitle) {
                heroTl.to(heroTitle, {
                    scale: 1.12,
                    letterSpacing: '+=3px',
                    opacity: 0,
                    ease: 'power1.in',
                    duration: 0.75
                }, 0);
            }

            // 6. Meta cards row descends gently
            if (heroMetaRow) {
                heroTl.to(heroMetaRow, {
                    y: '18vh',
                    opacity: 0,
                    ease: 'none',
                    duration: 0.7
                }, 0);
            }

            // 7. Fade kinetic typography & ticker
            if (heroTicker) {
                heroTl.to(heroTicker, {
                    opacity: 0,
                    ease: 'power1.out',
                    duration: 0.4
                }, 0);
            }
        }


        // B. STREET & VINTAGE TV: MULTI-STAGE PINNED CENTER + LATERAL SHOWCASE + ZOOM TIMELINE
        const worksTrack = document.getElementById('works');
        const streetViewport = document.getElementById('streetViewport');
        const streetStage = document.getElementById('streetStage');
        const tvGlass = document.getElementById('tvGlassOverlay');
        const lateralShowcase = document.getElementById('lateralShowcase');
        const portalChNext = document.getElementById('portalChNext');

        if (worksTrack && streetStage && streetViewport) {
            // Initial positioning: TV starts slightly below center and glides to center
            gsap.set(streetStage, { y: '20vh', scale: 1 });
            if (lateralShowcase) {
                gsap.set(lateralShowcase, { opacity: 0, x: -30 });
            }

            let nextChannelTriggered = false;

            const zoomTl = gsap.timeline({
                scrollTrigger: {
                    trigger: worksTrack,
                    pin: streetViewport,
                    start: 'top top',
                    end: () => '+=' + (window.innerHeight * 2.5),
                    scrub: 0.25,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const prog = self.progress;

                        // When user scrolls past the pinned zone (prog >= 0.40), switch TV channel to NEXT
                        if (prog >= 0.40) {
                            if (!nextChannelTriggered) {
                                nextChannelTriggered = true;
                                sound.playCrtSwitch();
                                if (tvScreenPortal) {
                                    tvScreenPortal.classList.add('glitching');
                                    setTimeout(() => tvScreenPortal.classList.remove('glitching'), 140);
                                }
                            }
                            portalSlides.forEach(slide => {
                                if (slide.dataset.channel === 'NEXT') {
                                    slide.classList.add('active');
                                } else {
                                    slide.classList.remove('active');
                                }
                            });
                        } else {
                            if (nextChannelTriggered) {
                                nextChannelTriggered = false;
                                // Restore currently active lateral item channel
                                const activeItem = document.querySelector('.lateral-item.active') || lateralItems[0];
                                const activeCh = activeItem ? activeItem.dataset.channel : '01';
                                portalSlides.forEach(slide => {
                                    if (slide.dataset.channel === activeCh) {
                                        slide.classList.add('active');
                                    } else {
                                        slide.classList.remove('active');
                                    }
                                });
                            }
                        }
                    }
                }
            });

            // Phase 1 (0.00 -> 0.14): TV rises smoothly into the exact viewport center (50vh) and LOCKS!
            zoomTl.to(streetStage, {
                y: 0,
                ease: 'power1.out',
                duration: 0.14
            }, 0);

            if (lateralShowcase) {
                zoomTl.to(lateralShowcase, {
                    opacity: 1,
                    x: 0,
                    ease: 'power1.out',
                    duration: 0.14
                }, 0);
            }

            // Phase 2 (0.14 -> 0.38): THE PINNED / FROZEN TV PHASE (50% shorter than before)
            // The TV is 100% frozen dead-center (y: 0, scale: 1).
            // Lateral showcase is fully interactive for reading and hovering channels.

            // Phase 3 (0.38 -> 0.44): Lateral showcase smoothly fades out as plunge begins
            if (lateralShowcase) {
                zoomTl.to(lateralShowcase, {
                    opacity: 0,
                    x: -40,
                    ease: 'power2.in',
                    duration: 0.06
                }, 0.38);
            }

            // Phase 4 (0.42 -> 1.00): Camera zooms deep into the centered TV tube!
            zoomTl.to(streetStage, {
                scale: 7.2,
                ease: 'power2.inOut',
                duration: 0.58
            }, 0.42);

            // Curved glass reflection fades away as we plunge inside the CRT phosphors
            if (tvGlass) {
                zoomTl.to(tvGlass, {
                    opacity: 0,
                    ease: 'none',
                    duration: 0.15
                }, 0.55);
            }

            // Gently fade out background artwork during deep zoom plunge
            const heroArtBackdrop = document.getElementById('heroArtBackdrop');
            if (heroArtBackdrop) {
                zoomTl.to(heroArtBackdrop, {
                    opacity: 0,
                    ease: 'power1.in',
                    duration: 0.30
                }, 0.50);
            }
        }

    }

    // Auto cycle portal TV channels gently every 4.5s until user hovers manually
    let currentPortalCh = 1;
    if (portalSlides.length > 0) {
        setInterval(() => {
            if (userHasManuallyTuned) return;
            // Only cycle if user is not in the zoom-in zone
            const worksEl = document.getElementById('works');
            if (worksEl) {
                const rect = worksEl.getBoundingClientRect();
                if (rect.top > 0 || rect.bottom < 0) return; // not currently visible
            }

            // Don't auto-cycle if NEXT channel is active during zoom
            const nextSlide = Array.from(portalSlides).find(s => s.dataset.channel === 'NEXT');
            if (nextSlide && nextSlide.classList.contains('active')) return;

            currentPortalCh = (currentPortalCh % 5) + 1;
            const chStr = `0${currentPortalCh}`;
            portalSlides.forEach(slide => {
                slide.classList.toggle('active', slide.dataset.channel === chStr);
            });
            lateralItems.forEach(item => {
                item.classList.toggle('active', item.dataset.channel === chStr);
            });
        }, 4500);
    }


    // -------------------------------------------------------------
    // 9. INTERACTIVE HERO TITLE KEYBOARD TRIGGER ENGINE
    // -------------------------------------------------------------
    const noteMap = {
        'M': 261.63, // C4
        'A': 293.66, // D4
        'T': 329.63, // E4
        'H': 349.23, // F4
        'E': 392.00, // G4
        'U': 440.00, // A4
        'S': 493.88, // B4
        'L': 523.25, // C5
        'V': 587.33  // D5
    };

    window.addEventListener('keydown', (e) => {
        // Suppress when typing in form inputs or using system shortcuts
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        const rawKey = e.key;
        if (!rawKey || rawKey.length !== 1) return;
        const key = rawKey.toUpperCase();

        const matchingChars = Array.from(document.querySelectorAll(`.hero-monumental-title .char-block[data-char="${key}"]`));
        if (matchingChars.length === 0) return;

        const baseFreq = noteMap[key] || 440;

        // Animate each occurrence sequentially with a smooth staggered ripple
        matchingChars.forEach((el, index) => {
            setTimeout(() => {
                el.classList.remove('active-key');
                void el.offsetWidth; // Force DOM reflow to retrigger CSS transition
                el.classList.add('active-key');

                // Play synth tone with slight harmonic shift per match
                const freq = baseFreq * (1 + (index * 0.15));
                sound.playClick(freq, 0.05);

                // Return to normal resting state
                setTimeout(() => {
                    el.classList.remove('active-key');
                }, 450);
            }, index * 90);
        });
    });

});
