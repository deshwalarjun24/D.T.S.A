// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change the icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').split('?')[0]; // Get the target without params
            if (targetId === '#') return;
            
            // Check if this is a program link
            let programParam = '';
            if (this.getAttribute('href').includes('?program=')) {
                programParam = this.getAttribute('href').split('?program=')[1];
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // If this was a program link, select the appropriate program in the dropdown
                if (programParam && targetId === '#contact') {
                    const programSelect = document.getElementById('program');
                    if (programSelect) {
                        // Find the option with matching value and select it
                        for (let i = 0; i < programSelect.options.length; i++) {
                            if (programSelect.options[i].value === programParam) {
                                programSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
            }
        });
    });

    // Check URL on page load for program parameter
    function setInitialProgramFromURL() {
        if (window.location.hash.includes('contact') && window.location.hash.includes('program=')) {
            const programParam = window.location.hash.split('program=')[1];
            const programSelect = document.getElementById('program');
            
            if (programSelect && programParam) {
                // Find the option with matching value and select it
                for (let i = 0; i < programSelect.options.length; i++) {
                    if (programSelect.options[i].value === programParam) {
                        programSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    }
    
    // Run on page load
    setInitialProgramFromURL();

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const program = document.getElementById('program');
            const programText = program.options[program.selectedIndex].text;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation (only if provided)
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
            }
            
            // Phone validation (basic)
            const phoneRegex = /^\d{10,}$/;
            if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
                alert('Please enter a valid phone number (at least 10 digits).');
                return;
            }
            
            // Create WhatsApp message
            let whatsappMessage = "Hello, I'm interested in D.T.S.A.\n\n";
            whatsappMessage += `Name: ${name}\n`;
            whatsappMessage += `Email: ${email}\n`;
            whatsappMessage += `Phone: ${phone}\n`;
            whatsappMessage += `Program: ${programText}\n`;
            whatsappMessage += `Message: ${message}\n`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp link (using the provided number)
            const whatsappLink = `https://wa.me/919599506071?text=${encodedMessage}`;
            
            // Redirect to WhatsApp
            window.open(whatsappLink, '_blank');
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-header, .about-content, .program-card, .instructor-card, .gallery-item, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Create directory for image uploads
    function createImageDirectory() {
        // This is just a placeholder - in a real application,
        // directory creation would happen on the server side
        console.log('Image directory would be created on server');
    }
    
    createImageDirectory();
});

// Add a sticky header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
}); 