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