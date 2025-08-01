document.addEventListener('DOMContentLoaded', () => {
    // JS for cute background icons
    const wrapper = document.getElementById('background-wrapper');
    if (wrapper) {
        const icons = [
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4H8V8H4V4ZM8 8H12V12H8V8ZM12 12H16V16H12V12ZM16 8H20V12H16V8ZM12 4H16V8H12V4ZM8 0H12V4H8V0ZM16 4H20V8H16V4ZM8 12H12V16H8V12ZM4 8H8V12H4V8Z"/></svg>`,
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 13.5V7.914a1 1 0 00-.293-.707l-4.214-4.214A1 1 0 0014.786 3H5a1 1 0 00-1 1v16a1 1 0 001 1h8.5"/><path d="M16 3v5h5M7 14h6M7 18h4"/></svg>`,
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21a5 5 0 01-5-5V8a5 5 0 0110 0v8a5 5 0 01-5 5z"/><path d="M12 21V19M9 3h6M10 11h4M10 14h.01M14 14h.01"/></svg>`,
            `&#10022;`,
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 20.5v-7.5h4v7.5"/><path d="M12 13V8"/><path d="M10 8H4.5v12.5"/><path d="M14 8h5.5V20.5"/><path d="M12 8a2 2 0 100-4 2 2 0 000 4z"/></svg>`
        ];
        const numIcons = 20;
        for (let i = 0; i < numIcons; i++) {
            const icon = document.createElement('div');
            icon.classList.add('bg-icon');
            icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.animationDelay = `${Math.random() * 25}s`;
            icon.style.fontSize = `${1 + Math.random() * 1.5}rem`;
            wrapper.appendChild(icon);
        }
    }

    // Menu functionality for both hover and click/tap
    const menuArea = document.getElementById('menu-hover-area');
    const topMenu = document.getElementById('top-right-menu');
    const menuIcon = document.querySelector('.lotus-icon');

    if (menuArea && topMenu) {
        let leaveTimeout;
        let isMenuOpen = false;

        // Function to toggle menu
        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                menuArea.classList.add('menu-open');
            } else {
                menuArea.classList.remove('menu-open');
            }
        };

        // Click/tap functionality for mobile and menu button
        if (menuIcon) {
            menuIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });
        }

        // Click on menu button text also toggles menu
        const menuButton = document.querySelector('.menu-button');
        if (menuButton) {
            menuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });
        }

        // Hover functionality for desktop (only on non-touch devices)
        if (window.matchMedia && !window.matchMedia('(hover: none)').matches) {
            topMenu.addEventListener('mouseenter', () => {
                clearTimeout(leaveTimeout);
                if (!isMenuOpen) {
                    menuArea.classList.add('menu-open');
                }
            });

            menuArea.addEventListener('mouseleave', () => {
                leaveTimeout = setTimeout(() => {
                    if (!isMenuOpen) {
                        menuArea.classList.remove('menu-open');
                    }
                }, 300);
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuArea.contains(e.target) && isMenuOpen) {
                isMenuOpen = false;
                menuArea.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    menuArea.classList.remove('menu-open');
                }
            });
        });
    }

    // JS to fix page refresh and ensure smooth scrolling
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

    // Mobile touch interaction for cards
    if ('ontouchstart' in window) {
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
                
                // If user is scrolling/sliding, keep the highlight
                if (moveDistance > 5) {
                    touchMoved = true;
                }
            });
            
            card.addEventListener('touchend', () => {
                // Remove highlight after a delay to show the effect
                setTimeout(() => {
                    card.classList.remove('touch-highlight');
                }, touchMoved ? 200 : 100);
            });
            
            card.addEventListener('touchcancel', () => {
                card.classList.remove('touch-highlight');
            });
        });
    }
});