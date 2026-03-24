document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const heroTitle = document.getElementById('hero-logo');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroHeader = document.getElementById('hh');
    // 1. Navbar and Title Scroll Adaptation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');

            // REMOVE: Only if it's currently in the DOM
            if (heroTitle && heroTitle.parentNode) {
                heroTitle.remove();
            }
        } else {
            nav.classList.remove('nav-scrolled');

            // UNDO (Re-insert): Only if it's currently missing
            if (heroTitle && !heroHeader.contains(heroTitle)) {
                // Use prepend to put it back at the top of the header
                heroHeader.prepend(heroTitle);
            }
        }
    });

    // 2. Scroll Indicator functionality
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#projects');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 3. Optional: Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    //Text scrambling animation
    const target = document.querySelector(".typing-text");
    const finalValue = target.dataset.value;

    // Modern hacking charset: Letters, Numbers, and Tech Symbols
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?/[]{}";

    let iteration = 0;
    let interval = null;

    // Clear any existing interval
    clearInterval(interval);

    interval = setInterval(() => {
        target.innerText = finalValue
            .split("")
            .map((letter, index) => {
                // If the iteration has passed this letter's index, lock it in
                if (index < iteration) {
                    return finalValue[index];
                }

                // Otherwise, return a random "glitch" character
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iteration >= finalValue.length) {
            clearInterval(interval);
            // Optional: Add a 'finished' class to trigger a final CSS glow
            target.classList.add("locked");
        }

        // Adjusting this controls the "solve" speed
        // Higher = faster reveal | Lower = more flickering
        iteration += 1 / 4;
    }, 40);
});

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
const magneticElements = document.querySelectorAll(".magnetic");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let ringW = 30, ringH = 30; // Track current ring dimensions

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
});

function animate() {
    let targetX = mouseX;
    let targetY = mouseY;
    let targetW = 30; // Default width
    let targetH = 30; // Default height
    let isSnapping = false;

    magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

        // If close to an element
        if (distance < 40) {
            targetX = centerX;
            targetY = centerY;
            // Make the ring slightly larger than the element (padding)
            targetW = rect.width + 20;
            targetH = rect.height + 10;
            isSnapping = true;
        }
    });

    if (isSnapping) {
        ring.classList.add("magnet-active");
    } else {
        ring.classList.remove("magnet-active");
    }

    // Smoothly interpolate position
    ringX += (targetX - ringX) * 0.95;
    ringY += (targetY - ringY) * 0.95;

    // Smoothly interpolate size
    ringW += (targetW - ringW) * 0.65;
    ringH += (targetH - ringH) * 0.65;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    ring.style.width = `${ringW}px`;
    ring.style.height = `${ringH}px`;

    requestAnimationFrame(animate);
}
animate();

window.addEventListener("mousedown", (e) => {
    const ripple = document.createElement("div");
    ripple.className = "cursor-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    const ring = document.querySelector(".cursor-ring");
    if (ring) {
        ring.style.transform = "translate(-50%, -50%) scale(0.8)";
    }
    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
});

window.addEventListener("mouseup", () => {
    const ring = document.querySelector(".cursor-ring");
    if (ring) {
        ring.style.transform = "translate(-50%, -50%) scale(1)";
    }
});