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

    const hoverables = document.querySelectorAll('a, button, .work-item, .cmd-card, .spec-card, .cd-jewel-case, .kinetic-stamp, .slanted-badge');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hovering');
            sound.playClick(320, 0.03);
            if (label) {
                if (el.classList.contains('work-item')) label.textContent = 'SWITCH CH';
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
    const workItems = document.querySelectorAll('.work-item');
    const crtScreen = document.getElementById('crtScreen');
    const crtChId = document.getElementById('crtChId');
    const crtVisual = document.getElementById('crtVisual');
    const crtStatusSub = document.getElementById('crtStatusSub');

    const channelData = {
        dataclean: {
            ch: 'CH-01 // DATACLEAN.SUITE',
            sub: 'ASYNC_STREAM // EF CORE + DAPPER',
            lines: [
                '> SYSTEM.INIT: DATACLEAN.MICROSERVICE',
                '> INPUT BATCH: 48,200 RECORDS',
                '> BENCHMARK: 6m02s ➔ 0m01.84s (99.4% GAIN)',
                '> STATUS: 200 OK // ALL CHUNKS COMMITTED'
            ],
            gain: '99.4%'
        },
        meppo: {
            ch: 'CH-02 // MEPPO FOCUS ENGINE',
            sub: 'C# .NET 8 // DESKTOP & WEB AUTOMATION',
            lines: [
                '> RUNNING: MEPPO.PROD.ENGINE',
                '> LATENCY TARGET: < 100ms',
                '> WORKFLOW AUTOMATION: 100% SUCCESS',
                '> ACTIVE SESSIONS: 42 INTERNAL NODES'
            ],
            gain: '98.0%'
        },
        actuar: {
            ch: 'CH-03 // ACTUAR CORE & RCA',
            sub: 'RABBITMQ // INCIDENT RESOLUTION ENGINE',
            lines: [
                '> RCA ENGINE: ISOLATING VECTORS',
                '> CERTIFICATION SCORE: 14.75 / 15.0',
                '> RESOLVED: TIER-2 HIGH COMPLEXITY TASKS',
                '> METRICS: 5x TOP 1 ANALYST OF THE MONTH'
            ],
            gain: '95.5%'
        },
        pipeline: {
            ch: 'CH-04 // ASYNC DATA PIPELINE',
            sub: 'DISTRIBUTED QUEUES // CHUNKED INGESTION',
            lines: [
                '> STREAM: IAsyncEnumerable<RecordChunk>',
                '> RATE: 12,400 MSGS / SECOND',
                '> MEMORY ALLOCATION: 0 B ON HEAP (Span<T>)',
                '> HEALTH: IDEMPOTENT & ZERO LOSS'
            ],
            gain: '99.8%'
        },
        telemetry: {
            ch: 'CH-05 // EMBEDDED TELEMETRY',
            sub: 'RP2040 / FREERTOS C++ HARDWARE',
            lines: [
                '> MCU: DUAL ARM CORTEX-M0+ @ 133MHz',
                '> PROTOCOL: UART / SPI HIGH-SPEED FIFO',
                '> REAL-TIME SENSOR SAMPLING: 1000 Hz',
                '> STATE: SYSTEM STABLE // NO JITTER'
            ],
            gain: '100%'
        }
    };

    workItems.forEach(item => {
        const key = item.dataset.work;
        item.addEventListener('mouseenter', () => {
            workItems.forEach(w => w.classList.remove('active'));
            item.classList.add('active');

            if (crtScreen) {
                crtScreen.classList.add('glitching');
                sound.playCrtSwitch();

                setTimeout(() => {
                    crtScreen.classList.remove('glitching');
                }, 140);
            }

            const data = channelData[key];
            if (data && crtVisual && crtChId && crtStatusSub) {
                crtChId.textContent = data.ch;
                crtStatusSub.textContent = data.sub;

                let linesHtml = data.lines.map(l => `<div class="term-line">${l}</div>`).join('');
                crtVisual.innerHTML = `
                    <div class="crt-terminal-box">
                        ${linesHtml}
                        <div class="term-benchmark-bar">
                            <div class="bench-fill" style="width: ${data.gain};"></div>
                        </div>
                    </div>
                `;
            }
        });
    });


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
    // 8. KINETIC PARALLAX ON SCROLL
    // -------------------------------------------------------------
    const letterStream = document.getElementById('letterStream');
    const kineticStamp = document.getElementById('kineticStamp');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (letterStream) {
            letterStream.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }, { passive: true });

});
