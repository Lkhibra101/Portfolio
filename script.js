// ===== MOBILE MENU FUNCTIONALITY =====
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // ===== HEADER SCROLL EFFECT =====
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // ===== TYPING EFFECT FOR HERO SUBTITLE =====
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';

        function typeWriter(text, element, speed = 100) {
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Start typing effect after a delay
        setTimeout(() => {
            typeWriter(originalText, heroSubtitle, 100);
        }, 1000);

        // ===== FORM SUBMISSION HANDLING =====
        const contactForm = document.querySelector('.contact-form');
        
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Since we're using Netlify forms, the form will be submitted automatically
            // We'll show a success message after a delay to simulate processing
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1000);
        });

        // ===== SCROLL PROGRESS INDICATOR =====
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #06b6d4, #3b82f6);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);

            window.addEventListener('scroll', () => {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }

        // Initialize scroll progress
        createScrollProgress();

        // ===== PARTICLE BACKGROUND EFFECT FOR HERO =====
        function createParticles() {
            const hero = document.querySelector('.hero');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(6, 182, 212, 0.3);
                    border-radius: 50%;
                    animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 5}s;
                `;
                
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                hero.appendChild(particle);
            }

            // Add CSS animation for particles
            if (!document.querySelector('#particle-style')) {
                const style = document.createElement('style');
                style.id = 'particle-style';
                style.textContent = `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        // Initialize particles
        createParticles();

        // ===== SKILL ITEMS HOVER EFFECT =====
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // ===== PROJECT CARD TILT EFFECT =====
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // ===== PERFORMANCE OPTIMIZATION =====
        // Lazy load images when they exist
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // ===== KEYBOARD NAVIGATION ENHANCEMENT =====
        document.addEventListener('keydown', function(e) {
            // Press 'h' to go to home
            if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Press 'Escape' to close mobile menu
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        

        // ===== CONSOLE EASTER EGG =====
        console.log(`
        🚀 Welcome to Ilyas Mardhi's Portfolio!
        
        Built with:
        - Vanilla HTML, CSS & JavaScript
        - Modern responsive design
        - Smooth animations & interactions
        - SEO optimized
        - Netlify ready
        
        Interested in the code? Check it out on GitHub!
        `);

        // ===== INITIALIZE ALL FEATURES =====
        window.addEventListener('load', function() {
            // Add loaded class to body for any additional animations
            document.body.classList.add('loaded');
            
            // Preload critical resources
            const criticalImages = [
                // Add any critical images here when you replace placeholders
            ];
            
            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        });

        // ===== CONTACT FORM SUBMISSION HANDLING =====


if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const data = new FormData(this);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    })
    .then(() => {
      alert('Thanks for your message! I will get back to you soon.');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      this.reset();
    })
    .catch(() => {
      alert('Oops! Something went wrong.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}
// ===== END OF SCRIPT =====