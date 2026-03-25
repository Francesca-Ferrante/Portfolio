document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');


    // 1. Creative Custom Cursor
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 600, fill: "forwards" });

        // 1b. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    });

    // 2. Lightbox Click Logic
    window.openLightbox = (element) => {
        const modal = document.getElementById("lightbox");
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");
        const img = element.querySelector('img');
        
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt || "Opera artistica";
        
        document.body.style.overflow = "hidden"; // Disable scroll when lightbox open
    };

    window.closeLightbox = () => {
        const modal = document.getElementById("lightbox");
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    // Handle Escape key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeLightbox();
    });

    // 3. Simple Reveal Animations for Gallery
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.art-card, .about-text, .section-header').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 1s cubic-bezier(0.23, 1, 0.32, 1)";
        revealObserver.observe(el);
    });

    // 4. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Animate hamburger icon
            mobileMenu.classList.toggle('toggle-active');
        });

        // Close menu when a link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    // 5. Paint Tube Click Animation (New Photo-real implementation)
    document.querySelectorAll('.tube-photo-item').forEach(tube => {
        tube.addEventListener('click', function(e) {
            // Prevent default click / scroll behavior
            e.preventDefault();

            // If already squished, don't trigger again
            if(this.classList.contains('squished')) return;

            const targetAttr = this.getAttribute('data-target');
            const href = this.getAttribute('href');
            const isExternal = this.getAttribute('target') === '_blank';

            // Trigger animation
            this.classList.add('squished');

            // Wait for paint squirt to finish before navigation
            setTimeout(() => {
                if (isExternal && href) {
                    window.open(href, '_blank');
                    this.classList.remove('squished');
                } else if (targetAttr && targetAttr.startsWith('#')) {
                    const targetEl = document.querySelector(targetAttr);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                    setTimeout(() => this.classList.remove('squished'), 600);
                } else if (href) {
                    window.location.href = href;
                }
            }, 750); // Matches CSS animation time
        });
    });

    console.log("Atelier Digitale ottimizzato anche per Mobile!");
});
