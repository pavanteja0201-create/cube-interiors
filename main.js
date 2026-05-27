document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. STICKY HEADER Scroll Toggle
       ========================================== */
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;

    function handleHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Run on load to set initial state


    /* ==========================================
       2. MOBILE MENU Toggle
       ========================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            // Toggle scroll lock on body when menu is open
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }


    /* ==========================================
       3. PORTFOLIO Filter Logic
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    // Add a tiny animation delay for natural staggered reveal
                    item.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                    item.style.animation = 'none';
                }
            });
        });
    });


    /* ==========================================
       4. LEAD FORM Submission Handler
       ========================================== */
    const quoteForm = document.getElementById('quoteForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    if (quoteForm && formSuccessMessage) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform basic validation checks (HTML5 validation runs first)
            const userName = document.getElementById('userName').value.trim();
            const userPhone = document.getElementById('userPhone').value.trim();
            const userCity = document.getElementById('userCity').value;

            if (!userName || !userPhone || !userCity) {
                alert('Please fill out all required fields.');
                return;
            }

            // Simulate form submission to server / webhook
            // In a real application, you would use fetch() to submit form data
            
            // Show Success Message Dialog
            formSuccessMessage.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling when modal is active

            // Reset form fields
            quoteForm.reset();
        });

        // Close Success Message Dialog
        closeSuccessBtn.addEventListener('click', () => {
            formSuccessMessage.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
        });

        // Close on overlay click outside card
        formSuccessMessage.addEventListener('click', (e) => {
            if (e.target === formSuccessMessage) {
                formSuccessMessage.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }


    /* ==========================================
       5. SCROLL REVEAL (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // Viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-revealed');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('scroll-revealed');
        });
    }


    /* ==========================================
       6. ACTIVE LINK HIGHLIGHTING on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 200; // Offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });

        // Highlight Home if at the top
        if (window.scrollY < 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', highlightNavOnScroll);
});
