/* ==========================================================================
   📡 PERFECT GULF LIMITED (PGL) - BLOG AND INSIGHTS ENGINE
   Live search indexer, Category filters, Newsletter subscription simulation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBlogSearchAndFilter();
  initNewsletterForm();
});

/**
 * Handles text-based search and tag filter buttons on the Blog listing page
 */
function initBlogSearchAndFilter() {
  const searchInput = document.getElementById('blog-search');
  const tagButtons = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogCards.length === 0) return;

  let activeCategory = 'all';
  let searchQuery = '';

  const applySearchAndFilters = () => {
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category').toLowerCase();
      const titleText = card.querySelector('.blog-title').textContent.toLowerCase();
      const excerptText = card.querySelector('.blog-excerpt').textContent.toLowerCase();
      const tagsText = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : '';

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (
        titleText.includes(searchQuery) || 
        excerptText.includes(searchQuery) ||
        tagsText.includes(searchQuery)
      );

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  };

  // 1. Text Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applySearchAndFilters();
    });
  }

  // 2. Tag Filter Buttons Listener
  if (tagButtons.length > 0) {
    tagButtons.forEach(button => {
      button.addEventListener('click', () => {
        tagButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        activeCategory = button.getAttribute('data-filter').toLowerCase();
        applySearchAndFilters();
      });
    });
  }
}

/**
 * Validates and simulates a subscription API call for the newsletter form
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  if (forms.length === 0) return;

  forms.forEach(form => {
    const input = form.querySelector('.newsletter-email');
    const button = form.querySelector('.btn-newsletter');
    
    if (!input || !button) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (!validateEmail(email)) {
        showFeedback(input, 'Please enter a valid email address.', 'error');
        return;
      }

      // Simulate API Submission
      button.disabled = true;
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalHTML;
        input.value = '';
        
        // Render detailed success message
        const container = form.parentElement;
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-alert';
        successDiv.innerHTML = `
          <i class="fas fa-check-circle" style="color: #25d366; font-size: 1.5rem; margin-bottom: 10px;"></i>
          <p style="color: #fff; font-weight: 600; margin: 0;">Subscription Confirmed!</p>
          <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-top: 5px;">Thank you for joining our monthly industry newsletter.</p>
        `;
        
        form.style.display = 'none';
        container.appendChild(successDiv);

        // Hide notice after 5 seconds
        setTimeout(() => {
          successDiv.remove();
          form.style.display = 'flex';
        }, 5000);
      }, 1500);
    });
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showFeedback = (inputField, msg, type) => {
    // Remove existing feedbacks
    const existing = inputField.parentElement.querySelector('.form-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('span');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = msg;
    feedback.style.cssText = `
      font-size: 0.8rem;
      margin-top: 8px;
      display: block;
      color: ${type === 'error' ? '#ff3838' : '#25d366'};
      font-weight: 500;
    `;
    inputField.parentElement.appendChild(feedback);

    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => feedback.remove(), 300);
    }, 4000);
  };
}
