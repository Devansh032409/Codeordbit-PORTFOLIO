// ==========================================
// 0. Preloader
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ==========================================
// 1. Navbar Sticky & Scroll Effect
// ==========================================
const header = document.getElementById('header');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// 2. Mobile Menu Toggle
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==========================================
// 3. Active Nav Link on Scroll
// ==========================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Add an offset to trigger earlier
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// 4. Typing Effect
// ==========================================
const typedOutput = document.getElementById('typed-output');
const words = ['Web Developer', 'Python Developer', 'Full Stack Learner', 'AI Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newWordDelay = 2000;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedOutput.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedOutput.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let delay = isDeleting ? erasingDelay : typingDelay;
    
    if (!isDeleting && charIndex === currentWord.length) {
        delay = newWordDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 500;
    }
    
    setTimeout(typeEffect, delay);
}

// Start typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if(words.length) setTimeout(typeEffect, newWordDelay);
});

// ==========================================
// 5. Scroll Reveal Animation
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            // observer.unobserve(entry.target); // Uncomment to reveal only once
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ==========================================
// 6. Progress Bar Animation
// ==========================================
const progressBars = document.querySelectorAll('.progress');

const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width;
        } else {
            // Reset width if you want it to animate again when scrolled out and back in
            entry.target.style.width = '0';
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ==========================================
// 7. Contact Form Handling (Prevent Default)
// ==========================================
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally handle the form submission (e.g., fetch API to a backend)
        
        // Simple success feedback
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    });
}
