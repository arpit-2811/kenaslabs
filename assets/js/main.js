/**
 * Kenas Labs & Mangovita™ — Core Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration: Update this WhatsApp phone number for live client orders
  const WHATSAPP_PHONE_NUMBER = '919876543210'; 

  // --- Sticky Header Scroll Effect ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  // --- Mobile Hamburger Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        
        // Optional: close other accordions
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('is-open', !isOpen);
        questionBtn.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  // --- Contact Form WhatsApp Submission ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const city = document.getElementById('contactCity')?.value.trim() || '';
      const product = document.getElementById('contactProduct')?.value || 'General Enquiry';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const textMessage = `*New Website Enquiry - Kenas Labs*
----------------------------
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Product Interested:* ${product}
*Message:* ${message}
----------------------------
Sent via kenaslabs.com`;

      const encodedText = encodeURIComponent(textMessage);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;
      
      window.open(waUrl, '_blank');
    });
  }

  // --- Direct WhatsApp Order Buttons ---
  const orderButtons = document.querySelectorAll('[data-wa-order]');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const variant = btn.getAttribute('data-wa-order') || 'Mangovita';
      const textMessage = `Hello Kenas Labs! I would like to inquire about ordering *${variant}*. Please share availability, pricing, and delivery details.`;
      const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(textMessage)}`;
      window.open(waUrl, '_blank');
    });
  });

  // --- Image Gallery Switcher (Product Pages) ---
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  const mainImage = document.getElementById('mainProductImage');
  if (galleryThumbs.length > 0 && mainImage) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        galleryThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const newSrc = thumb.getAttribute('data-img-src');
        if (newSrc) {
          mainImage.src = newSrc;
        }
      });
    });
  }
});
