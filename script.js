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

        // Hover functionality removed - menu now only opens on click

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

    // Make project cards clickable
    const projectCards = document.querySelectorAll('.card[data-url]');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the actual link
            if (e.target.tagName === 'A') return;
            
            const url = card.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // Abstract toggle functionality
    const abstractToggle = document.querySelector('.abstract-toggle');
    const abstractContainer = document.querySelector('.abstract-container');
    const abstractPreview = document.querySelector('.abstract-preview');
    const abstractFull = document.querySelector('.abstract-full');

    if (abstractToggle && abstractContainer && abstractPreview && abstractFull) {
        let isExpanded = false;

        const toggleAbstract = () => {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                abstractContainer.classList.add('expanded');
                abstractPreview.style.display = 'none';
                abstractFull.style.display = 'block';
                abstractToggle.textContent = 'Hide Full Abstract';
            } else {
                abstractContainer.classList.remove('expanded');
                abstractPreview.style.display = 'block';
                abstractFull.style.display = 'none';
                abstractToggle.textContent = 'Read Full Abstract';
            }
        };

        // Toggle on button click
        abstractToggle.addEventListener('click', toggleAbstract);
        
        // Toggle on preview text click
        abstractPreview.addEventListener('click', toggleAbstract);
        
        // Toggle on full text click
        abstractFull.addEventListener('click', toggleAbstract);
    }

    // Volunteer gallery functionality
    const volunteerGalleries = document.querySelectorAll('.volunteer-gallery');
    
    volunteerGalleries.forEach(gallery => {
        const galleryType = gallery.getAttribute('data-gallery');
        const imageWrapper = gallery.querySelector('.volunteer-image-wrapper');
        const image = gallery.querySelector('.volunteer-image');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        
        // Define image arrays for each gallery
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
        
        const images = imageArrays[galleryType] || [];
        let currentIndex = 0;
        
        // Show arrows only if there are multiple images
        if (images.length > 1) {
            gallery.setAttribute('data-count', 'multiple');
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }
        
        // Navigation functions
        const showImage = (index) => {
            if (images.length > 0) {
                image.src = images[index].src;
                image.alt = images[index].alt;
                currentIndex = index;
            }
        };
        
        const nextImage = () => {
            if (images.length > 1) {
                const nextIndex = (currentIndex + 1) % images.length;
                showImage(nextIndex);
            }
        };
        
        const prevImage = () => {
            if (images.length > 1) {
                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(prevIndex);
            }
        };
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextImage();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevImage();
            });
        }
        
        // Make image clickable to open in modal
        if (imageWrapper) {
            imageWrapper.addEventListener('click', (e) => {
                // Prevent gallery navigation when clicking on image
                if (e.target === prevBtn || e.target === nextBtn || 
                    prevBtn.contains(e.target) || nextBtn.contains(e.target)) {
                    return;
                }
                
                // Open gallery in modal with navigation
                if (images.length > 0) {
                    openGalleryModal(images, currentIndex);
                }
            });
        }
    });

    // Shared image modal functionality
    const artworkModal = document.getElementById('artwork-modal');
    const modalArtwork = document.getElementById('modal-artwork');
    const closeModalBtn = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-artwork');
    const nextBtn = document.getElementById('next-artwork');
    const artworkItems = document.querySelectorAll('.artwork-item');
    
    let currentArtworkIndex = 0;
    let currentImageSources = [];
    let isSingleImageMode = false;
    
    // Function to open any image in modal
    window.openImageModal = (imageSrc) => {
        currentImageSources = [imageSrc];
        currentArtworkIndex = 0;
        isSingleImageMode = true;
        modalArtwork.src = imageSrc;
        modalArtwork.style.opacity = '0';
        artworkModal.classList.remove('hidden', 'closing');
        artworkModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modalArtwork.style.opacity = '1';
        }, 10);
    };
    
    // Function to open gallery with navigation in modal
    window.openGalleryModal = (images, startIndex) => {
        currentImageSources = images.map(img => img.src);
        currentArtworkIndex = startIndex;
        isSingleImageMode = false;
        modalArtwork.src = images[startIndex].src;
        modalArtwork.style.opacity = '0';
        artworkModal.classList.remove('hidden', 'closing');
        artworkModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modalArtwork.style.opacity = '1';
        }, 10);
    };
    
    const artworkSources = Array.from(artworkItems).map(item => item.getAttribute('data-artwork'));

    if (artworkModal && modalArtwork && closeModalBtn && prevBtn && nextBtn) {
        // Function to update modal artwork
        const updateModalArtwork = (index) => {
            modalArtwork.src = currentImageSources[index];
            currentArtworkIndex = index;
        };

        // Function to show next artwork
        const showNextArtwork = () => {
            if (isSingleImageMode) return; // No navigation for single images
            const sources = currentImageSources;
            const nextIndex = (currentArtworkIndex + 1) % sources.length;
            updateModalArtwork(nextIndex);
        };

        // Function to show previous artwork
        const showPrevArtwork = () => {
            if (isSingleImageMode) return; // No navigation for single images
            const sources = currentImageSources;
            const prevIndex = (currentArtworkIndex - 1 + sources.length) % sources.length;
            updateModalArtwork(prevIndex);
        };

        // Function to close modal with smooth animation
        const closeModal = () => {
            artworkModal.classList.add('closing');
            setTimeout(() => {
                artworkModal.classList.add('hidden');
                artworkModal.classList.remove('flex', 'closing');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 300); // Match the animation duration
        };

        // Open modal when clicking on artwork
        artworkItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageSources = artworkSources;
                currentArtworkIndex = index;
                isSingleImageMode = false;
                modalArtwork.src = artworkSources[index];
                modalArtwork.style.opacity = '0';
                artworkModal.classList.remove('hidden', 'closing');
                artworkModal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                // Trigger fade-in after modal is displayed
                setTimeout(() => {
                    modalArtwork.style.opacity = '1';
                }, 10);
            });
        });

        // Navigation button events
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextArtwork();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevArtwork();
        });

        // Close modal when clicking the close button
        closeModalBtn.addEventListener('click', () => {
            closeModal();
        });

        // Close modal when clicking outside the image
        artworkModal.addEventListener('click', (e) => {
            if (e.target === artworkModal) {
                closeModal();
            }
        });

        // Keyboard navigation and close modal
        document.addEventListener('keydown', (e) => {
            if (!artworkModal.classList.contains('hidden')) {
                switch(e.key) {
                    case 'Escape':
                        closeModal();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        showNextArtwork();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        showPrevArtwork();
                        break;
                }
            }
        });
    }
});