const image = document.querySelector('.error-illustration');
const container = document.querySelector('.error-content');

// Sensitivity - lower is more subtle, higher is more aggressive
const sensitivity = 30;

container.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
    const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);
    const rotateX = mouseY * -sensitivity;
    const rotateY = mouseX * sensitivity;

    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
});

container.addEventListener('mouseleave', () => {
    image.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
});