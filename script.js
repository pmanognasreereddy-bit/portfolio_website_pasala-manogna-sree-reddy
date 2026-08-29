// 1. Check JS Connection
console.log("JavaScript connected successfully.");

// 2. Display Current Year in Footer
const footerYear = document.querySelector('.footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// 3. Dynamic Greeting (Safely targets element without breaking HTML)
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

const heroTitle = document.querySelector('.hero-section h1');
if (heroTitle) {
    heroTitle.innerHTML = `${getGreeting()}, I'm <span class="highlight">Pasala Manogna Sree Reddy</span> 👋`;
}

// 4. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
}

// 5. Optimized Header Shadow & Active Section Link Highlight
const header = document.querySelector('.site-header');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// Active section observer (Prevents scroll lag and stuttering)
const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// 6. Project Filter System
const projects = [
    { id: 1, name: "Weather App", category: "web", tech: ["React", "API"] },
    { id: 2, name: "Todo App", category: "web", tech: ["JavaScript"] },
    { id: 3, name: "Portfolio Website", category: "design", tech: ["HTML", "CSS"] },
    { id: 4, name: "Calculator", category: "web", tech: ["JavaScript"] }
];

const grid = document.querySelector('.projects-grid');

function renderProjects(filter = "all") {
    if (!grid) return;
    
    const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map(project => `
        <article class="project-card">
            <div class="project-card-body">
                <h3>${project.name}</h3>
                <div class="project-tags">
                    ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <a href="#" class="btn btn-primary">View Project</a>
            </div>
        </article>
    `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

renderProjects();

// 7. Form Validation
const form = document.querySelector('#contact-form');

function showError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    const existing = group.querySelector('.error-msg');
    if (!existing) {
        const errEl = document.createElement('span');
        errEl.className = 'error-msg';
        errEl.textContent = message;
        group.appendChild(errEl);
        input.classList.add('error');
    }
}

function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(e => e.remove());
    document.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const message = document.querySelector('#message');
        let valid = true;

        if (name && !name.value.trim()) {
            showError(name, 'Name is required!');
            valid = false;
        }

        if (email && !email.value.includes('@')) {
            showError(email, 'Enter a valid email!');
            valid = false;
        }

        if (message && message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters!');
            valid = false;
        }

        if (valid) {
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 1500));

            btn.textContent = 'Message Sent!';
            form.reset();

            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// 8. Dark Mode Toggle
const themeBtn = document.querySelector(".theme-toggle");

function updateThemeIcon(theme) {
    if (themeBtn) {
        themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
document.body.dataset.theme = savedTheme;
updateThemeIcon(savedTheme);

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        document.body.dataset.theme = nextTheme;
        localStorage.setItem("theme", nextTheme);
        updateThemeIcon(nextTheme);
    });
}