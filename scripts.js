// DOM Elements
const body = document.body;
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');
const cursor = document.querySelector('.cursor');
const yearSpan = document.getElementById('current-year');

// Set current year
yearSpan.textContent = new Date().getFullYear();

// Custom cursor
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });

    const links = document.querySelectorAll('a, button, .btn, .gallery-item, .work-item');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .work-item, .about-content, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Skill progress animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const percentage = skill.getAttribute('data-percentage');
        skill.style.width = percentage;
    });
}

// Photography page functionality
if (document.querySelector('.photography-main')) {
    const collections = document.querySelectorAll('.collection-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryTitle = document.querySelector('.gallery-header h2');
    const galleryDescription = document.querySelector('.gallery-header p');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxImageWrapper = document.querySelector('.lightbox-image-wrapper');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const zoomResetBtn = document.querySelector('.zoom-reset');

    let currentIndex = 0;
    let currentCollection = 'featured';

    // Photography collections data
    const collectionsData = {
        'featured': {
            title: 'My Favourite Works',
            description: '',
            images: [
                { src: 'assets/photography/IMG-2946.jpg', title: '' },
                { src: 'assets/photography/IMG-2948.jpg', title: '' },
                { src: 'assets/photography/IMG-0111.jpg', title: '' },
                { src: 'assets/photography/IMG-2.jpg', title: '' }
            ]
        },
        'time': {
            title: 'The Suspended Decay of Now',
            description: 'The central theme of this body of work is time. The perception of it, how it can be distorted, the evidence of time passing. The theme may not be obvious in some of my works because the photographs may not be about the passage of time itself but rather the experience of it. Several of my works are a reflection of the places I feel drawn to, specifically the unique quality of certain places where conventional time seems to be challenged. What makes these places so interesting to me is that the relationship between the individual’s experience of the place, and the place itself is often what creates the sense of liminality. Often the individual’s relationships with their environment can also reflect their own emotions; like how I try to convey a sense of being stuck in repetitive time in my stretching shots featuring figures in dark tunnels. I find the experiential existence of seemingly non-linear time spaces so fascinating because often in life, time feels like a constant, marching forward to its steadfast pace, and the abstraction of such universals can cause a surreal feeling.',
            images: [
                { src: 'assets/photography/IMG-2946.jpg', title: '' },
                { src: 'assets/photography/IMG-2948.jpg', title: '' },
                { src: 'assets/photography/IMG-3079.jpg', title: '' },
                { src: 'assets/photography/IMG-3095.jpg', title: '' },
                { src: 'assets/photography/IMG-3023.jpg', title: '' },
                { src: 'assets/photography/IMG-3022.jpg', title: '' },
                { src: 'assets/photography/IMG-2961.jpg', title: '' },
                { src: 'assets/photography/IMG-2048.jpg', title: '' },
                { src: 'assets/photography/IMG-1551.jpg', title: '' },
                { src: 'assets/photography/IMG-2906.jpg', title: '' },
                { src: 'assets/photography/IMG-1004.jpg', title: '' },
                { src: 'assets/photography/IMG-1066.jpg', title: '' },
                { src: 'assets/photography/IMG-1088.jpg', title: '' },
                { src: 'assets/photography/IMG-1461.jpg', title: '' },
                { src: 'assets/photography/IMG-1551.jpg', title: '' },
                { src: 'assets/photography/IMG-2911.jpg', title: '' },
                { src: 'assets/photography/IMG-2945.jpg', title: '' },
                { src: 'assets/photography/IMG-2230.jpg', title: '' },
                { src: 'assets/photography/IMG-2927.jpg', title: '' },
                { src: 'assets/photography/IMG-3099.jpg', title: '' },
                { src: 'assets/photography/IMG-2975.jpg', title: '' },
                { src: 'assets/photography/IMG-2888.jpg', title: '' },
                { src: 'assets/photography/IMG-2957.jpg', title: '' },
            ]
        }
    };

    function loadGallery(collection) {
        const data = collectionsData[collection];
        galleryTitle.textContent = data.title;
        galleryDescription.textContent = data.description;

        galleryGrid.innerHTML = '';

        data.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-index', index);
        
            item.innerHTML = `
                <img src="${image.src}" alt="${image.title || 'Untitled'}" class="gallery-image">
            `;
            galleryGrid.appendChild(item);
        });

        setupGalleryItems();
    }

    function setupGalleryItems() {
        document.querySelectorAll('.gallery-item').forEach((item) => {
            item.addEventListener('click', () => {
                currentIndex = parseInt(item.getAttribute('data-index'));
                openLightbox(currentIndex);
            });
        });
    }

    function openLightbox(index) {
        const image = collectionsData[currentCollection].images[index];
        lightboxImage.src = image.src;
        lightboxTitle.textContent = image.title || '';
        lightboxTitle.style.display = image.title ? 'block' : 'none';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        showTitle();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showTitle() {
        lightboxTitle.classList.add('active');
        setTimeout(() => {
            lightboxTitle.classList.remove('active');
        }, 3000);
    }

    function navigateLightbox(direction) {
        const images = collectionsData[currentCollection].images;
        currentIndex = (currentIndex + direction + images.length) % images.length;
        openLightbox(currentIndex);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightboxImage.addEventListener('mouseenter', () => {
        lightboxTitle.classList.add('active');
    });
    
    lightboxImage.addEventListener('mouseleave', () => {
        lightboxTitle.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    collections.forEach((btn) => {
        btn.addEventListener('click', () => {
            collections.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            currentCollection = btn.getAttribute('data-collection');
            loadGallery(currentCollection);
        });
    });

    // Initial gallery load
    if (collections.length > 0) {
        collections[0].classList.add('active');
        loadGallery(collections[0].getAttribute('data-collection'));
    }
}

// Development page functionality
if (document.querySelector('.development-main')) {
    // Initialize skill animations
    window.addEventListener('load', animateSkills);
    
    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Contact form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            isValid = false;
            showError(nameInput, 'Name is required');
        } else {
            removeError(nameInput);
        }
        
        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'Email is required');
        } else if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Please enter a valid email');
        } else {
            removeError(emailInput);
        }
        
        if (messageInput.value.trim() === '') {
            isValid = false;
            showError(messageInput, 'Message is required');
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just simulate a successful submission
            contactForm.reset();
            alert('Thank you for your message! I\'ll get back to you soon.');
        }
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}