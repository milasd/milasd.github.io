// Configuration
const CONFIG = {
    backgroundIcons: {
        count: 20,
        maxAnimationDelay: 25,
        maxFontSize: 1.5
    },
    modal: {
        fadeInDelay: 10,
        closeAnimationDuration: 300
    },
    swipe: {
        minDistance: 50,
        maxTime: 300,
        restraintDistance: 100
    }
};

// State management
let menuState = { isOpen: false };
let modalState = { 
    isOpen: false, 
    currentIndex: 0, 
    sources: [], 
    isSingleImage: false 
};
let abstractState = { isExpanded: false };

// Swipe Detection Utility
function addSwipeDetection(element, onSwipeLeft, onSwipeRight) {
    if (!('ontouchstart' in window)) return;

    let startX, startY, startTime;
    let isMoving = false;

    element.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = new Date().getTime();
        isMoving = false;
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
        isMoving = true;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        if (!isMoving) return;

        const touch = e.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const endTime = new Date().getTime();

        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const elapsedTime = endTime - startTime;

        // Check if it's a valid swipe
        if (elapsedTime <= CONFIG.swipe.maxTime &&
            Math.abs(distanceX) >= CONFIG.swipe.minDistance &&
            Math.abs(distanceY) <= CONFIG.swipe.restraintDistance) {
            
            if (distanceX > 0) {
                onSwipeRight && onSwipeRight();
            } else {
                onSwipeLeft && onSwipeLeft();
            }
        }
    }, { passive: true });
}

// Background Icons
function initBackgroundIcons() {
    const wrapper = document.getElementById('background-wrapper');
    if (!wrapper) return;

    const icons = [
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4H8V8H4V4ZM8 8H12V12H8V8ZM12 12H16V16H12V12ZM16 8H20V12H16V8ZM12 4H16V8H12V4ZM8 0H12V4H8V0ZM16 4H20V8H16V4ZM8 12H12V16H8V12ZM4 8H8V12H4V8Z"/></svg>`,
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 13.5V7.914a1 1 0 00-.293-.707l-4.214-4.214A1 1 0 0014.786 3H5a1 1 0 00-1 1v16a1 1 0 001 1h8.5"/><path d="M16 3v5h5M7 14h6M7 18h4"/></svg>`,
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21a5 5 0 01-5-5V8a5 5 0 0110 0v8a5 5 0 01-5 5z"/><path d="M12 21V19M9 3h6M10 11h4M10 14h.01M14 14h.01"/></svg>`,
        `&#10022;`,
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 20.5v-7.5h4v7.5"/><path d="M12 13V8"/><path d="M10 8H4.5v12.5"/><path d="M14 8h5.5V20.5"/><path d="M12 8a2 2 0 100-4 2 2 0 000 4z"/></svg>`
    ];

    for (let i = 0; i < CONFIG.backgroundIcons.count; i++) {
        const icon = document.createElement('div');
        icon.classList.add('bg-icon');
        icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = `${Math.random() * 100}vw`;
        icon.style.animationDelay = `${Math.random() * CONFIG.backgroundIcons.maxAnimationDelay}s`;
        icon.style.fontSize = `${1 + Math.random() * CONFIG.backgroundIcons.maxFontSize}rem`;
        wrapper.appendChild(icon);
    }
}

// Menu System
function toggleMenu() {
    menuState.isOpen = !menuState.isOpen;
    const menuArea = document.getElementById('menu-hover-area');
    
    if (menuState.isOpen) {
        menuArea.classList.add('menu-open');
    } else {
        menuArea.classList.remove('menu-open');
    }
}

function closeMenu() {
    menuState.isOpen = false;
    document.getElementById('menu-hover-area')?.classList.remove('menu-open');
}

function initMenuSystem() {
    const menuArea = document.getElementById('menu-hover-area');
    const menuIcon = document.querySelector('.lotus-icon');
    const menuButton = document.querySelector('.menu-button');

    if (!menuArea) return;

    const toggleHandler = (e) => {
        e.stopPropagation();
        toggleMenu();
    };

    menuIcon?.addEventListener('click', toggleHandler);
    menuButton?.addEventListener('click', toggleHandler);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuArea.contains(e.target) && menuState.isOpen) {
            closeMenu();
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuState.isOpen) {
                closeMenu();
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Touch Interactions
function initTouchInteractions() {
    if (!('ontouchstart' in window)) return;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let touchMoved = false;
        let touchStartY = 0;

        card.addEventListener('touchstart', (e) => {
            touchMoved = false;
            touchStartY = e.touches[0].clientY;
            card.classList.add('touch-highlight');
        });

        card.addEventListener('touchmove', (e) => {
            const touchCurrentY = e.touches[0].clientY;
            const moveDistance = Math.abs(touchCurrentY - touchStartY);
            
            if (moveDistance > 5) {
                touchMoved = true;
            }
        });

        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('touch-highlight');
            }, touchMoved ? 200 : 100);
        });

        card.addEventListener('touchcancel', () => {
            card.classList.remove('touch-highlight');
        });
    });
}

// Project Cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.card[data-url]');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return;
            
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
}

// Abstract Toggle
function initAbstractToggle() {
    const toggle = document.querySelector('.abstract-toggle');
    const container = document.querySelector('.abstract-container');
    const preview = document.querySelector('.abstract-preview');
    const full = document.querySelector('.abstract-full');

    if (!toggle || !container || !preview || !full) return;

    function toggleAbstract() {
        abstractState.isExpanded = !abstractState.isExpanded;

        if (abstractState.isExpanded) {
            container.classList.add('expanded');
            preview.style.display = 'none';
            full.style.display = 'block';
            toggle.textContent = 'Hide Full Abstract';
        } else {
            container.classList.remove('expanded');
            preview.style.display = 'block';
            full.style.display = 'none';
            toggle.textContent = 'Read Full Abstract';
        }
    }

    toggle.addEventListener('click', toggleAbstract);
    preview.addEventListener('click', toggleAbstract);
    full.addEventListener('click', toggleAbstract);
}

// Volunteer Galleries
function initVolunteerGalleries() {
    const imageArrays = {
        'pre-tecnico': [
            { src: 'images/volunteering/pre_cruzada/precr1.jpg', alt: 'Teaching at Pre-técnico da Cruzada' },
            { src: 'images/volunteering/pre_cruzada/precr2.jpg', alt: 'Mathematics class at Pre-técnico da Cruzada' }
        ],
        'sopao': [
            { src: 'images/volunteering/sopao/sopb1.jpeg', alt: 'Sopão do Bem volunteering' },
            { src: 'images/volunteering/sopao/sopb2.jpeg', alt: 'Food preparation for homeless' },
            { src: 'images/volunteering/sopao/sopb3.jpeg', alt: 'Distribution of meals at Sopão do Bem' }
        ]
    };

    const galleries = document.querySelectorAll('.volunteer-gallery');
    galleries.forEach(gallery => {
        const galleryType = gallery.getAttribute('data-gallery');
        const images = imageArrays[galleryType] || [];
        
        if (images.length <= 1) return;

        const imageWrapper = gallery.querySelector('.volunteer-image-wrapper');
        const image = gallery.querySelector('.volunteer-image');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');

        // Setup gallery
        gallery.setAttribute('data-count', 'multiple');
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        
        let currentIndex = 0;

        function showImage(index) {
            // Fade out current image
            image.style.opacity = '0';
            
            // Wait for fade out, then change image and fade in
            setTimeout(() => {
                image.src = images[index].src;
                image.alt = images[index].alt;
                currentIndex = index;
                
                // Fade in new image
                setTimeout(() => {
                    image.style.opacity = '1';
                }, 50);
            }, 200);
        }

        function nextImage() {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        }

        function prevImage() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(prevIndex);
        }

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });

        imageWrapper.addEventListener('click', (e) => {
            if (e.target === prevBtn || e.target === nextBtn || 
                prevBtn.contains(e.target) || nextBtn.contains(e.target)) {
                return;
            }
            openGalleryModal(images, currentIndex);
        });

        // Add swipe detection for mobile
        addSwipeDetection(imageWrapper, nextImage, prevImage);
    });
}

// Modal System
function openImageModal(imageSrc) {
    modalState = {
        isOpen: true,
        currentIndex: 0,
        sources: [imageSrc],
        isSingleImage: true
    };
    displayModal(imageSrc);
}

function openGalleryModal(images, startIndex) {
    const sources = images.map(img => typeof img === 'string' ? img : img.src);
    
    modalState = {
        isOpen: true,
        currentIndex: startIndex,
        sources: sources,
        isSingleImage: false
    };
    displayModal(sources[startIndex]);
}

function displayModal(imageSrc) {
    const modal = document.getElementById('artwork-modal');
    const image = document.getElementById('modal-artwork');

    image.src = imageSrc;
    image.style.opacity = '0';
    modal.classList.remove('hidden', 'closing');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        image.style.opacity = '1';
    }, CONFIG.modal.fadeInDelay);
}

function navigateModal(direction) {
    if (modalState.isSingleImage || modalState.sources.length <= 1) return;

    let newIndex;
    const sources = modalState.sources;
    const currentIndex = modalState.currentIndex;

    if (direction === 'next') {
        newIndex = (currentIndex + 1) % sources.length;
    } else {
        newIndex = (currentIndex - 1 + sources.length) % sources.length;
    }

    modalState.currentIndex = newIndex;
    document.getElementById('modal-artwork').src = sources[newIndex];
}

function closeModal() {
    const modal = document.getElementById('artwork-modal');
    
    modal.classList.add('closing');
    modalState.isOpen = false;

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'closing');
        document.body.style.overflow = 'auto';
    }, CONFIG.modal.closeAnimationDuration);
}

function initModalSystem() {
    const modal = document.getElementById('artwork-modal');
    const closeBtn = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-artwork');
    const nextBtn = document.getElementById('next-artwork');
    const artworkItems = document.querySelectorAll('.artwork-item');

    if (!modal || !closeBtn || !prevBtn || !nextBtn) return;

    // Artwork gallery
    const artworkSources = Array.from(artworkItems)
        .map(item => item.getAttribute('data-artwork'));

    artworkItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openGalleryModal(
                artworkSources.map(src => ({ src, alt: 'Artwork' })),
                index
            );
        });
    });

    // Modal controls
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateModal('next');
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateModal('prev');
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modalState.isOpen) return;

        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateModal('next');
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateModal('prev');
                break;
        }
    });

    // Add swipe detection to modal for mobile navigation
    addSwipeDetection(modal, 
        () => navigateModal('next'),  // Swipe left = next
        () => navigateModal('prev')   // Swipe right = previous
    );

    // Expose global functions
    window.openImageModal = openImageModal;
    window.openGalleryModal = openGalleryModal;
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundIcons();
    initMenuSystem();
    initSmoothScrolling();
    initTouchInteractions();
    initProjectCards();
    initAbstractToggle();
    initVolunteerGalleries();
    initModalSystem();
});