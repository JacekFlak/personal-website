// Terminal typing effect for name
const typing = document.querySelector('.typing');
if (typing) {
    const text = typing.textContent;
    typing.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            typing.textContent += text.charAt(i);
            i++;
            setTimeout(type, 190); // Slower typing speed
        }
    }
    type();
}

// Animate code flow lines
document.querySelectorAll('.code-line').forEach((line, idx) => {
    setTimeout(() => {
        line.style.opacity = 1;
    }, 300 + idx * 500);
});

// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    // Domyślnie tryb ciemny
    themeToggle.textContent = '🌙';
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        if (document.body.classList.contains('light')) {
            themeToggle.textContent = '☀️'; // Unicode U+2600 sun, not smiling
        } else {
            themeToggle.textContent = '🌙';
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe About section
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    observer.observe(aboutText);
}

// Observe Skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}
