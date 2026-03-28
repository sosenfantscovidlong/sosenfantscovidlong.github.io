// ── MODULAR SECURE JAVASCRIPT FOR SOS ENFANTS COVID LONG ──
// This script is loaded from an external file for CSP compliance
// No inline event handlers or eval() usage

(function() {
  'use strict';

  // ── HAMBURGER MENU ──
  function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        mobileMenu.classList.toggle('open');
        e.preventDefault();
      }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.mm-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── ACTIVE NAV LINK ON SCROLL ──
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const allNavLinks = document.querySelectorAll('.nav-links a');
    
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          allNavLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    
    sections.forEach(s => io.observe(s));
  }

  // ── BACK TO TOP BUTTON ──
  function initBackToTop() {
    const backTop = document.getElementById('back-top');
    
    if (!backTop) return;
    
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    });
    
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── THEME TOGGLE ──
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!themeToggle) return;

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'orange' : 'light');
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('orange-theme') ? 'orange' : 'light';
      const newTheme = currentTheme === 'light' ? 'orange' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'orange') {
      document.body.classList.add('orange-theme');
      document.getElementById('theme-toggle').setAttribute('aria-label', 'Basculer vers le thème clair');
      document.getElementById('theme-toggle').setAttribute('title', 'Thème clair');
      document.getElementById('theme-toggle').textContent = '🌙';
    } else {
      document.body.classList.remove('orange-theme');
      document.getElementById('theme-toggle').setAttribute('aria-label', 'Basculer vers le thème orange');
      document.getElementById('theme-toggle').setAttribute('title', 'Thème orange');
      document.getElementById('theme-toggle').textContent = '🌞';
    }
  }

  // ── INITIALIZE ALL ──
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initHamburgerMenu();
        initActiveNavLink();
        initBackToTop();
        initThemeToggle();
      });
    } else {
      // DOM is already ready
      initHamburgerMenu();
      initActiveNavLink();
      initBackToTop();
      initThemeToggle();
    }
  }

  // Start initialization
  init();
})();
