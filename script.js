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

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.textContent = '🌙';
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        if (document.body.classList.contains('light')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    });
}

const langToggle = document.getElementById('lang-toggle');
let currentLang = 'en';

const flagPL = '<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f5-1f1f1.svg" alt="PL" class="flag-icon">';
const flagGB = '<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ec-1f1e7.svg" alt="GB" class="flag-icon">';

if (langToggle) {
    langToggle.innerHTML = flagPL;
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pl' : 'en';
        langToggle.innerHTML = currentLang === 'en' ? flagPL : flagGB;
        
        document.querySelectorAll('[data-en][data-pl]').forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                el.textContent = text;
            }
        });
    });
}

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

const aboutParas = document.querySelectorAll('.about-text');
if (aboutParas.length > 0) {
    aboutParas.forEach(para => {
        observer.observe(para);
    });
}

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

const jobHeaders = document.querySelectorAll('.job-header');
jobHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const jobItem = this.parentElement;
        const description = jobItem.querySelector('.job-description');
        const isExpanded = description.classList.contains('expanded');
        
        document.querySelectorAll('.job-description').forEach(desc => {
            desc.classList.remove('expanded');
            desc.querySelectorAll('.code-line').forEach(line => {
                line.style.opacity = 0;
                line.style.animation = 'none';
            });
        });
        document.querySelectorAll('.job-header').forEach(h => {
            h.classList.remove('active');
        });
        
        if (!isExpanded) {
            description.classList.add('expanded');
            this.classList.add('active');
            
            const codeLines = description.querySelectorAll('.code-line');
            codeLines.forEach((line, idx) => {
                line.style.opacity = 0;
                line.style.animation = 'none';
                setTimeout(() => {
                    line.style.animation = 'codeAppear 1s forwards';
                }, 100 + idx * 200);
            });
        }
    });
});

const gmailLink = document.getElementById('gmail-link');
const emailPopup = document.getElementById('email-popup');
const closePopup = document.getElementById('close-popup');
const copyBtn = document.getElementById('copy-email');
const copyFeedback = document.getElementById('copy-feedback');

if (gmailLink && emailPopup) {
    gmailLink.addEventListener('click', (e) => {
        e.preventDefault();
        emailPopup.classList.add('active');
    });

    closePopup.addEventListener('click', () => {
        emailPopup.classList.remove('active');
        copyFeedback.textContent = '';
    });

    emailPopup.addEventListener('click', (e) => {
        if (e.target === emailPopup) {
            emailPopup.classList.remove('active');
            copyFeedback.textContent = '';
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('jacek.flak.kontakt@gmail.com').then(() => {
            copyFeedback.textContent = '✅ Copied!';
            setTimeout(() => {
                copyFeedback.textContent = '';
            }, 2000);
        });
    });
}

const projectCards = document.querySelectorAll('.project-card');
const projectPopup = document.getElementById('project-popup');
const projectPopupImg = document.getElementById('project-popup-img');
const projectPopupTitle = document.getElementById('project-popup-title');
const closeProjectPopup = document.getElementById('close-project-popup');

if (projectPopup) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const title = card.getAttribute('data-title');
            projectPopupImg.src = imgSrc;
            projectPopupTitle.textContent = title;
            projectPopup.classList.add('active');
        });
    });

    closeProjectPopup.addEventListener('click', () => {
        projectPopup.classList.remove('active');
    });

    projectPopup.addEventListener('click', (e) => {
        if (e.target === projectPopup) {
            projectPopup.classList.remove('active');
        }
    });
}

const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
