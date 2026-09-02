/* ==========================================================================
   MATHEUS ALVES // SPATZEK IV EDITION SCRIPT
   Custom Cursor, Web Audio API Synthesizer, Live UTC-3 Clock, Hover Reveal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. LIVE UTC-3 CLOCK (GOIÂNIA, BRASIL)
    // --------------------------------------------------------------------------
    const clockEl = document.getElementById('liveClock');
    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: 'America/Sao_Paulo',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeStr = new Intl.DateTimeFormat('pt-BR', options).format(now);
        if (clockEl) {
            clockEl.textContent = `${timeStr} UTC-3`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --------------------------------------------------------------------------
    // 2. WEB AUDIO API SYNTHESIZER (INTERACTIVE SOUND FX)
    // --------------------------------------------------------------------------
    let audioCtx = null;
    let isAudioEnabled = false;
    const audioToggle = document.getElementById('audioToggle');
    const audioStateText = document.getElementById('audioStateText');
    const bodyEl = document.body;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(type) {
        if (!isAudioEnabled || !audioCtx) return;
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        if (type === 'hover') {
            // Subtle click frequency
            osc.type = 'sine';
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.03);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.03);
        } else if (type === 'click') {
            // Crisp mechanical relay beep
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.06);
        } else if (type === 'toggle') {
            // Dual chime
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.05); // E5

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.12);
        }
    }

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            initAudio();
            isAudioEnabled = !isAudioEnabled;
            bodyEl.setAttribute('data-audio', isAudioEnabled ? 'on' : 'off');
            if (audioStateText) {
                audioStateText.textContent = isAudioEnabled ? 'ON' : 'OFF';
            }
            if (isAudioEnabled) {
                playSound('toggle');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3. CUSTOM MAGNETIC CURSOR & SPRING LERP
    // --------------------------------------------------------------------------
    const cursor = document.getElementById('customCursor');
    const cursorDot = cursor?.querySelector('.cursor-dot');
    const cursorCircle = cursor?.querySelector('.cursor-circle');
    const cursorLabel = document.getElementById('cursorLabel');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    const lerpFactor = 0.16;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }
    });

    function animateCursor() {
        circleX += (mouseX - circleX) * lerpFactor;
        circleY += (mouseY - circleY) * lerpFactor;

        if (cursorCircle) {
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;
        }
        if (cursorLabel) {
            cursorLabel.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .commandment-card, .lab-card, .contact-card');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor?.classList.add('is-hover');
            playSound('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor?.classList.remove('is-hover');
            cursor?.classList.remove('is-link');
            if (cursorLabel) cursorLabel.textContent = 'EXPLORE';
        });
        el.addEventListener('click', () => {
            playSound('click');
        });
    });

    // Magnetic item attraction
    const magneticItems = document.querySelectorAll('.magnetic-item');
    magneticItems.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            item.style.transform = `translate(${relX * 0.28}px, ${relY * 0.28}px)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0px, 0px)';
        });
    });

    // --------------------------------------------------------------------------
    // 4. FLOATING PROJECT HOVER REVEAL PREVIEW
    // --------------------------------------------------------------------------
    const hoverPreview = document.getElementById('hoverPreview');
    const previewCategory = document.getElementById('previewCategory');
    const previewTitle = document.getElementById('previewTitle');
    const previewMetric = document.getElementById('previewMetric');
    const previewVisual = document.getElementById('previewVisual');
    const workItems = document.querySelectorAll('.work-item');

    let previewX = window.innerWidth / 2;
    let previewY = window.innerHeight / 2;

    const svgGraphics = {
        dataclean: `
            <svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="150" fill="#080a0f"/>
                <path d="M20 75 H100 L130 30 L160 120 L190 60 L220 75 H280" stroke="#e5a968" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="130" cy="30" r="4" fill="#22c55e"/>
                <circle cx="160" cy="120" r="4" fill="#00f2fe"/>
                <circle cx="190" cy="60" r="4" fill="#e5a968"/>
                <text x="25" y="30" fill="#828896" font-family="monospace" font-size="10">PIPELINE: 25k rows/s</text>
                <text x="25" y="135" fill="#22c55e" font-family="monospace" font-size="10">✓ LATENCY: &lt;2.0s</text>
            </svg>
        `,
        meppo: `
            <svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="150" fill="#080a0f"/>
                <rect x="25" y="25" width="75" height="100" rx="3" stroke="#7952d4" stroke-width="1.5" fill="#11141c"/>
                <rect x="112" y="25" width="75" height="100" rx="3" stroke="#e5a968" stroke-width="1.5" fill="#11141c"/>
                <rect x="200" y="25" width="75" height="100" rx="3" stroke="#22c55e" stroke-width="1.5" fill="#11141c"/>
                <text x="35" y="45" fill="#828896" font-family="monospace" font-size="9">TODO</text>
                <text x="122" y="45" fill="#e5a968" font-family="monospace" font-size="9">DOING</text>
                <text x="210" y="45" fill="#22c55e" font-family="monospace" font-size="9">DONE</text>
            </svg>
        `,
        actuar: `
            <svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="150" fill="#080a0f"/>
                <circle cx="75" cy="75" r="30" stroke="#7952d4" stroke-width="2" fill="#131620"/>
                <circle cx="225" cy="75" r="30" stroke="#22c55e" stroke-width="2" fill="#131620"/>
                <path d="M105 75 H195" stroke="#e5a968" stroke-width="2" stroke-dasharray="4 4"/>
                <text x="55" y="79" fill="#fff" font-family="monospace" font-size="10">RABBIT</text>
                <text x="208" y="79" fill="#fff" font-family="monospace" font-size="10">PGSQL</text>
                <text x="120" y="65" fill="#e5a968" font-family="monospace" font-size="9">EVENTS</text>
            </svg>
        `,
        stream: `
            <svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="150" fill="#080a0f"/>
                <rect x="25" y="40" width="40" height="70" stroke="#00f2fe" stroke-width="1.5" fill="#0e131d"/>
                <rect x="80" y="40" width="40" height="70" stroke="#00f2fe" stroke-width="1.5" fill="#0e131d"/>
                <rect x="135" y="40" width="40" height="70" stroke="#00f2fe" stroke-width="1.5" fill="#0e131d"/>
                <path d="M185 75 H265" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)"/>
                <text x="35" y="80" fill="#00f2fe" font-family="monospace" font-size="10">B1</text>
                <text x="90" y="80" fill="#00f2fe" font-family="monospace" font-size="10">B2</text>
                <text x="145" y="80" fill="#00f2fe" font-family="monospace" font-size="10">B3</text>
                <text x="200" y="65" fill="#22c55e" font-family="monospace" font-size="9">STREAM</text>
            </svg>
        `,
        embedded: `
            <svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="150" fill="#080a0f"/>
                <rect x="80" y="30" width="140" height="90" rx="4" stroke="#e5a968" stroke-width="2" fill="#10131b"/>
                <circle cx="150" cy="75" r="22" stroke="#22c55e" stroke-width="1.5"/>
                <text x="122" y="79" fill="#22c55e" font-family="monospace" font-size="11">RP2040</text>
                <line x1="80" y1="50" x2="60" y2="50" stroke="#828896" stroke-width="2"/>
                <line x1="80" y1="75" x2="60" y2="75" stroke="#828896" stroke-width="2"/>
                <line x1="80" y1="100" x2="60" y2="100" stroke="#828896" stroke-width="2"/>
                <line x1="220" y1="50" x2="240" y2="50" stroke="#828896" stroke-width="2"/>
                <line x1="220" y1="75" x2="240" y2="75" stroke="#828896" stroke-width="2"/>
                <line x1="220" y1="100" x2="240" y2="100" stroke="#828896" stroke-width="2"/>
            </svg>
        `
    };

    function animateHoverPreview() {
        previewX += (mouseX - previewX) * 0.12;
        previewY += (mouseY - previewY) * 0.12;

        if (hoverPreview) {
            hoverPreview.style.transform = `translate(${previewX + 20}px, ${previewY - 80}px)`;
        }
        requestAnimationFrame(animateHoverPreview);
    }
    animateHoverPreview();

    workItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            const title = item.getAttribute('data-title');
            const cat = item.getAttribute('data-category');
            const metric = item.getAttribute('data-metric');
            const svgKey = item.getAttribute('data-svg');

            if (previewTitle) previewTitle.textContent = title;
            if (previewCategory) previewCategory.textContent = cat;
            if (previewMetric) previewMetric.textContent = metric;
            if (previewVisual && svgGraphics[svgKey]) {
                previewVisual.innerHTML = svgGraphics[svgKey];
            }

            hoverPreview?.classList.add('is-active');
            if (cursorLabel) cursorLabel.textContent = 'VIEW CASE';
        });

        item.addEventListener('mouseleave', () => {
            hoverPreview?.classList.remove('is-active');
        });
    });

    // --------------------------------------------------------------------------
    // 5. COPY EMAIL TO CLIPBOARD WITH TOAST
    // --------------------------------------------------------------------------
    const copyCard = document.getElementById('copyEmailCard');
    const toast = document.getElementById('toast');
    let toastTimeout = null;

    if (copyCard) {
        copyCard.addEventListener('click', () => {
            const email = 'workingaccount.matheus@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                if (toast) {
                    toast.classList.add('is-visible');
                    clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => {
                        toast.classList.remove('is-visible');
                    }, 3500);
                }
            });
        });
    }

});
