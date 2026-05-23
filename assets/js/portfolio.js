/* ==========================================================================
   💼 PERFECT GULF LIMITED (PGL) - PORTFOLIO SYSTEM
   Advanced Case Study filters, metadata indexing, sort mechanics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioEngine();
});

/**
 * Handles category clicks, searches and scales matching project cards
 */
function initPortfolioEngine() {
  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle button states
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories') ? card.getAttribute('data-categories').split(' ') : [];
        
        const isMatch = (filterValue === 'all' || categories.includes(filterValue));

        if (isMatch) {
          card.style.display = 'block';
          // Smooth fade back in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          // Let animation end before hiding
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}
