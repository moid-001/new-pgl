/* ==========================================================================
   🌐 PERFECT GULF LIMITED (PGL) - GLOBAL SCRIPTS
   Navbar, Footer Injection, Mobile Drawer, Reveal Triggers, Counter Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INJECT SHAREABLE LAYOUT ELEMENTS (HEADER & FOOTER)
  injectLayoutElements();

  // 2. STICKY HEADER SCROLL EVENT
  initStickyHeader();

  // 3. MOBILE MENU TOGGLE
  initMobileMenu();

  // 4. SCROLL REVEAL OBSERVER
  initScrollReveal();

  // 5. ANIMATED NUMBERS COUNTER
  initStatsCounters();

  // 6. ACTIVE NAVIGATION HIGHLIGHT
  highlightActiveLink();
});

/**
 * Dynamically injects Header Navbar and Footer into placeholders,
 * automatically resolving relative paths for subdirectories.
 */
function injectLayoutElements() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  // Determine path offset based on current file location
  const isSubpage = window.location.pathname.includes('/services/');
  const pathPrefix = isSubpage ? '../' : './';
  const servicesPrefix = isSubpage ? '' : 'services/';

  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = `
      <header id="main-header">
        <div class="container nav-container">
          <a href="${pathPrefix}index.html" class="nav-logo">
            <img src="${pathPrefix}assets/images/logo.png" alt="Perfect Gulf Limited Logo">
          </a>
          <nav class="nav-navigation">
            <ul class="nav-menu" id="nav-menu">
              <li class="nav-item"><a href="${pathPrefix}index.html" class="nav-link">Home</a></li>
              <li class="nav-item"><a href="${pathPrefix}about.html" class="nav-link">About Us</a></li>
              <li class="nav-item"><a href="${pathPrefix}services.html" class="nav-link">Services</a></li>
              <li class="nav-item"><a href="${pathPrefix}industries.html" class="nav-link">Industries</a></li>
              <li class="nav-item"><a href="${pathPrefix}portfolio.html" class="nav-link">Portfolio</a></li>
              <li class="nav-item"><a href="${pathPrefix}gallery.html" class="nav-link">Gallery</a></li>
              <li class="nav-item"><a href="${pathPrefix}team.html" class="nav-link">Team</a></li>
              <li class="nav-item"><a href="${pathPrefix}faq.html" class="nav-link">FAQ</a></li>
              <li class="nav-item mobile-only"><a href="${pathPrefix}contact.html" class="nav-link btn btn-primary text-white" style="padding: 8px 20px; font-size: 0.85rem;">Contact Us</a></li>
            </ul>
          </nav>
          <div class="nav-actions desktop-only">
            <a href="${pathPrefix}contact.html" class="btn btn-primary text-white" style="padding: 10px 22px; font-size: 0.85rem;">Contact Us</a>
          </div>
          <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    `;
  }

  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer>
        <div class="container footer-top">
          <div class="footer-about">
            <a href="${pathPrefix}index.html" class="footer-logo">
              <img src="${pathPrefix}assets/images/logo.png" alt="Perfect Gulf Limited Logo" style="width: 120px; height: 120px; object-fit: contain;">
            </a>
            <p>Where Innovation Meets Execution. Perfect Gulf Limited provides top-tier electromechanical engineering, HVAC systems, fire safety, low current automation, and white-space data center fit-out services.</p>
            <div class="social-icons">
              <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 class="footer-title">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="${pathPrefix}index.html">Home</a></li>
              <li><a href="${pathPrefix}about.html">About PGL</a></li>
              <li><a href="${pathPrefix}services.html">Our Services</a></li>
              <li><a href="${pathPrefix}industries.html">Industries Served</a></li>
              <li><a href="${pathPrefix}portfolio.html">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Our Services</h4>
            <ul class="footer-links">
              <li><a href="${pathPrefix}${servicesPrefix}electrical.html">Electrical Systems</a></li>
              <li><a href="${pathPrefix}${servicesPrefix}hvac.html">HVAC Solutions</a></li>
              <li><a href="${pathPrefix}${servicesPrefix}fire-alarm.html">Fire Protection</a></li>
              <li><a href="${pathPrefix}${servicesPrefix}data-center.html">Data Centers</a></li>
              <li><a href="${pathPrefix}${servicesPrefix}ups.html">UPS & Power Systems</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Contact Office</h4>
            <ul class="footer-contact">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span>Building No. 8182, King Abdullah Street, Ash Shati Ash Sharqi Dist, Dammam, KSA</span>
              </li>
              <li>
                <i class="fas fa-phone-alt"></i>
                <a href="tel:+966563151891">+966 563 151 891</a>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <a href="mailto:contact@perfectgulflimited.com">contact@perfectgulflimited.com</a>
              </li>
              <li>
                <i class="fab fa-whatsapp"></i>
                <a href="https://wa.me/966563151891" target="_blank">Chat on WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="container footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Perfect Gulf Limited. All Rights Reserved. Subsidiary of ARRHAM Group, Canada.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      <!-- Floating WhatsApp Quick Connect Button -->
      <a href="https://wa.me/966563151891" class="whatsapp-widget" target="_blank" title="Contact Us on WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </a>
    `;

    // Proactively load FontAwesome for high-quality icons if not loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }
}

/**
 * Controls sticky navigation styling when scrolling
 */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initially in case page is refreshed while scrolled
}

/**
 * Handles slide-out menu drawer on tablet/mobile screens
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu drawer if user clicks on a nav item
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/**
 * Monitors element exposure on scroll to apply fade-in classes
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Animates counting numbers when they scroll into the viewport
 */
function initStatsCounters() {
  const counterElements = document.querySelectorAll('.stat-number');
  if (counterElements.length === 0) return;

  const animate = (element) => {
    const target = +element.getAttribute('data-count');
    const duration = 2000; // Animation duration in milliseconds
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      if (current >= target) {
        element.textContent = target + (element.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        element.textContent = current + (element.getAttribute('data-suffix') || '');
      }
    }, Math.max(stepTime, 15));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(element => observer.observe(element));
}

/**
 * Dynamically highlights active navigation links matching current file pathname
 */
function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && page === '' && href.includes('index.html')) {
      link.classList.add('active');
    } else if (href && href.includes(page) && page !== '') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
