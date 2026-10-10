/**
 * Cleaning Ladies – Website Interactions
 * Plain vanilla JS · No frameworks · GitHub Pages ready
 */

(function () {
  'use strict';

  // ---------- Current year ----------
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Sticky header active link ----------
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  function closeMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mainNav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) closeMenu();
      else openMenu();
    });

    // Close when a nav link is clicked
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) closeMenu();
    });
  }

  // ---------- Smooth scroll for internal links (fallback) ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Scroll-triggered fade-in ----------
  const animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add('visible'));
  }

  // ---------- Service card → pre-select form ----------
  document.querySelectorAll('.service-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const service = btn.getAttribute('data-service');
      const select = document.getElementById('service');
      if (select && service) {
        select.value = service;
      }
    });
  });

  // ---------- Gallery lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-full');
      const alt = item.querySelector('img')?.alt || '';
      if (lightbox && lightboxImg && src) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        lightboxClose?.focus();
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  // ---------- Quote form + WhatsApp ----------
  const form = document.getElementById('quote-form');
  const feedback = document.getElementById('form-feedback');

  // Demo WhatsApp number (Cynthia) – confirm with owner before launch
  const WHATSAPP_NUMBER = '27710455286'; // 071 045 5286 without leading 0, with country code

  function clearErrors() {
    form.querySelectorAll('.error-msg').forEach((el) => (el.textContent = ''));
    form.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
  }

  function showError(id, message) {
    const field = document.getElementById(id);
    const errorEl = document.getElementById('error-' + id);
    if (field) field.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const suburb = document.getElementById('suburb').value.trim();
    const consent = document.getElementById('consent').checked;

    if (!fullName) {
      showError('full-name', 'Please enter your full name.');
      valid = false;
    }
    if (!phone) {
      showError('phone', 'Please enter a phone number.');
      valid = false;
    } else if (!/^[\d\s+\-()]{7,20}$/.test(phone)) {
      showError('phone', 'Please enter a valid phone number.');
      valid = false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!service) {
      showError('service', 'Please select a cleaning service.');
      valid = false;
    }
    if (!suburb) {
      showError('suburb', 'Please enter your suburb or area.');
      valid = false;
    }
    if (!consent) {
      showError('consent', 'Please confirm you agree to share your details.');
      valid = false;
    }

    return valid;
  }

  function buildWhatsAppMessage() {
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const suburb = document.getElementById('suburb').value.trim();
    const preferredDate = document.getElementById('preferred-date').value;
    const propertyType = document.getElementById('property-type').value;
    const size = document.getElementById('size').value.trim();
    const instructions = document.getElementById('instructions').value.trim();

    let msg = 'Hello Cleaning Ladies!%0A%0A';
    msg += '*Quote Request*%0A';
    msg += '——————————%0A';
    msg += '*Name:* ' + encodeURIComponent(fullName) + '%0A';
    msg += '*Phone:* ' + encodeURIComponent(phone) + '%0A';
    if (email) msg += '*Email:* ' + encodeURIComponent(email) + '%0A';
    msg += '*Service:* ' + encodeURIComponent(service) + '%0A';
    msg += '*Area:* ' + encodeURIComponent(suburb) + '%0A';
    if (preferredDate) msg += '*Preferred date:* ' + encodeURIComponent(preferredDate) + '%0A';
    if (propertyType) msg += '*Property / Event type:* ' + encodeURIComponent(propertyType) + '%0A';
    if (size) msg += '*Size / Rooms:* ' + encodeURIComponent(size) + '%0A';
    if (instructions) msg += '*Additional notes:*%0A' + encodeURIComponent(instructions) + '%0A';
    msg += '%0APlease could you provide a quote? Thank you!';

    return msg;
  }

  function plainTextMessage() {
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const suburb = document.getElementById('suburb').value.trim();
    const preferredDate = document.getElementById('preferred-date').value;
    const propertyType = document.getElementById('property-type').value;
    const size = document.getElementById('size').value.trim();
    const instructions = document.getElementById('instructions').value.trim();

    let msg = 'Hello Cleaning Ladies!\n\nQuote Request\n——————————\n';
    msg += 'Name: ' + fullName + '\n';
    msg += 'Phone: ' + phone + '\n';
    if (email) msg += 'Email: ' + email + '\n';
    msg += 'Service: ' + service + '\n';
    msg += 'Area: ' + suburb + '\n';
    if (preferredDate) msg += 'Preferred date: ' + preferredDate + '\n';
    if (propertyType) msg += 'Property / Event type: ' + propertyType + '\n';
    if (size) msg += 'Size / Rooms: ' + size + '\n';
    if (instructions) msg += 'Additional notes:\n' + instructions + '\n';
    msg += '\nPlease could you provide a quote? Thank you!';
    return msg;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (feedback) {
        feedback.textContent = '';
        feedback.className = 'form-disclaimer';
      }

      if (!validateForm()) {
        if (feedback) {
          feedback.textContent = 'Please fix the highlighted fields and try again.';
          feedback.classList.add('error');
        }
        // Focus first error field
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      const message = buildWhatsAppMessage();
      const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message;

      // Attempt to open WhatsApp
      const newWindow = window.open(waUrl, '_blank');

      if (newWindow) {
        if (feedback) {
          feedback.innerHTML =
            'WhatsApp should now open with your quote request ready to send. ' +
            'If it did not open, <button type="button" id="copy-msg-btn" style="background:none;border:none;color:#E91E8C;text-decoration:underline;cursor:pointer;font:inherit;padding:0;">copy the message</button> and paste it into WhatsApp yourself.';
          feedback.classList.add('success');

          document.getElementById('copy-msg-btn')?.addEventListener('click', () => {
            navigator.clipboard.writeText(plainTextMessage()).then(() => {
              feedback.textContent = 'Message copied! Open WhatsApp and paste it to send.';
            }).catch(() => {
              feedback.textContent = 'Could not copy automatically. Please open WhatsApp and type your request.';
            });
          });
        }
      } else {
        // Popup blocked or failed
        if (feedback) {
          feedback.innerHTML =
            'Could not open WhatsApp automatically. ' +
            '<button type="button" id="copy-msg-btn" style="background:none;border:none;color:#E91E8C;text-decoration:underline;cursor:pointer;font:inherit;padding:0;">Copy the message</button> ' +
            'and paste it into WhatsApp (071 045 5286), or call us directly.';
          feedback.classList.add('error');

          document.getElementById('copy-msg-btn')?.addEventListener('click', () => {
            navigator.clipboard.writeText(plainTextMessage()).then(() => {
              feedback.textContent = 'Message copied! Open WhatsApp and paste it to send.';
              feedback.classList.remove('error');
              feedback.classList.add('success');
            }).catch(() => {
              feedback.textContent = 'Could not copy. Please call 071 045 5286 or email cleaningladies012@gmail.com.';
            });
          });
        }
      }
    });
  }

  // ---------- Hide floating WA when form is in view (optional polish) ----------
  const floatingWa = document.getElementById('floating-wa');
  const quoteSection = document.getElementById('quote');
  if (floatingWa && quoteSection && 'IntersectionObserver' in window) {
    const waObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          floatingWa.style.opacity = entry.isIntersecting ? '0' : '1';
          floatingWa.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
      },
      { threshold: 0.2 }
    );
    waObserver.observe(quoteSection);
  }
})();
