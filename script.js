// ========================================
// HERO SLIDER - SWIPER INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.hero-slider', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            paginationBulletMessage: 'Go to slide {{index}}',
        },
    });
    
    // Pause autoplay on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });
        heroSection.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });
    }
    
    // ========================================
    // HAMBURGER MENU TOGGLE
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
});



// ========================================
// ABOUT SECTION - STATS COUNTER ANIMATION
// ========================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        stat.textContent = current;
                    }, duration / 60);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', animateStats);




// ========================================
// STUDENT CORNER - SHOW MORE FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const studentCards = document.querySelectorAll('.student-card');
    const cardsToShow = 3; // Show first 3 cards initially
    let isExpanded = false;
    
    // Hide cards beyond the first 3
    studentCards.forEach((card, index) => {
        if (index >= cardsToShow) {
            card.classList.add('hidden');
        }
    });
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            studentCards.forEach((card, index) => {
                if (index >= cardsToShow) {
                    if (isExpanded) {
                        card.classList.remove('hidden');
                        // Add animation
                        card.style.animation = 'fadeSlideUp 0.5s ease forwards';
                        card.style.animationDelay = `${(index - cardsToShow) * 0.1}s`;
                    } else {
                        card.classList.add('hidden');
                        card.style.animation = '';
                        card.style.animationDelay = '';
                    }
                }
            });
            
            // Update button text
            const btnText = this.querySelector('.btn-text');
            const btnIcon = this.querySelector('i');
            
            if (isExpanded) {
                btnText.textContent = 'Show Less Programs';
                this.classList.add('active');
            } else {
                btnText.textContent = 'Show More Programs';
                this.classList.remove('active');
                // Scroll to top of section
                document.querySelector('.student-corner').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
});


// ========================================
// CONTACT FORM - VALIDATION & WHATSAPP REDIRECT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalBtn = document.getElementById('modalBtn');
    const progressFill = document.getElementById('progressFill');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');
    
    // Phone number for WhatsApp
    const WHATSAPP_NUMBER = '2349069118912'; // Nigeria country code + phone
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
    
    // ===== Character Counter =====
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = 500;
            }
        });
    }
    
    // ===== Form Validation =====
    function validateField(field) {
        const value = field.value.trim();
        const errorEl = field.parentElement.querySelector('.error-message');
        let isValid = true;
        
        // Remove existing error/success classes
        field.classList.remove('error', 'success');
        
        if (field.id === 'fullName') {
            if (value.length < 2) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.add('success');
            }
        }
        
        if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.add('success');
            }
        }
        
        if (field.id === 'phone') {
            const phoneRegex = /^[\d\+\-\(\)\s]{8,15}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.add('success');
            }
        }
        
        if (field.id === 'subject') {
            if (value === '') {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.add('success');
            }
        }
        
        if (field.id === 'message') {
            if (value.length < 10) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.add('success');
            }
        }
        
        // Show/hide error message
        if (errorEl) {
            if (!isValid && value !== '') {
                errorEl.classList.add('show');
            } else {
                errorEl.classList.remove('show');
            }
        }
        
        return isValid;
    }
    
    // Real-time validation on blur
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // ===== Form Submission =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        document.querySelector('.btn-default').style.display = 'none';
        document.querySelector('.btn-loading').style.display = 'flex';
        
        // Simulate sending (1.5s delay for UX)
        setTimeout(() => {
            // Get form data
            const formData = {
                name: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Show success state
            document.querySelector('.btn-loading').style.display = 'none';
            document.querySelector('.btn-success').style.display = 'flex';
            
            // Open success modal after brief delay
            setTimeout(() => {
                openSuccessModal(formData);
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    formInputs.forEach(input => {
                        input.classList.remove('success', 'error');
                    });
                    if (charCount) charCount.textContent = '0';
                    
                    // Reset button
                    submitBtn.disabled = false;
                    document.querySelector('.btn-success').style.display = 'none';
                    document.querySelector('.btn-default').style.display = 'flex';
                }, 500);
                
            }, 600);
            
        }, 1500);
    });
    
    // ===== Success Modal =====
    function openSuccessModal(formData) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progress >= 100) {
                clearInterval(interval);
                // Auto redirect to WhatsApp after 5 seconds
                setTimeout(() => {
                    redirectToWhatsApp(formData);
                }, 500);
            }
            progressFill.style.width = progress + '%';
        }, 100);
    }
    
    function closeModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
        progressFill.style.width = '0%';
    }
    
    // ===== Redirect to WhatsApp =====
    function redirectToWhatsApp(formData) {
        // Build WhatsApp message
        const message = `Hello Blessing Emmanuel,%0A%0A` +
                       `I'm reaching out regarding: ${formData.subject}%0A%0A` +
                       `Name: ${formData.name}%0A` +
                       `Email: ${formData.email}%0A` +
                       `Phone: ${formData.phone}%0A%0A` +
                       `Message:%0A${formData.message}`;
        
        const whatsappLink = `${WHATSAPP_URL}?text=${message}`;
        
        // Open WhatsApp in new window
        window.open(whatsappLink, '_blank');
        
        // Close modal after redirect
        setTimeout(() => {
            closeModal();
        }, 1000);
    }
    
    // ===== Modal Event Listeners =====
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Open WhatsApp now button
    modalBtn.addEventListener('click', function() {
        // Get stored form data or use default
        const formData = {
            name: document.getElementById('fullName')?.value || 'Client',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            subject: document.getElementById('subject')?.value || 'Inquiry',
            message: document.getElementById('message')?.value || 'I would like to connect regarding your services.'
        };
        redirectToWhatsApp(formData);
    });
    
    // Close on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            closeModal();
        }
    });
});