/* ==========================================================================
   📸 PERFECT GULF LIMITED (PGL) - GALLERY INTERACTIVE ENGINE
   Filter grid, dynamic lightbox window with controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initLightbox();
});

/**
 * Handles category selection and filters matching gallery items
 */
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length === 0 || galleryItems.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active states on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          // Force a tiny reflow for fade-in animations to re-trigger
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          // Delay display:none to let fade animation complete
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * Creates, controls, and opens the Lightbox modal view for gallery items
 */
function initLightbox() {
  const galleryLinks = document.querySelectorAll('.gallery-link');
  if (galleryLinks.length === 0) return;

  // 1. Create Lightbox Markup and Inject into Body
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox-modal';
  lightbox.className = 'lightbox-modal';
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <span class="lightbox-close">&times;</span>
    <button class="lightbox-arrow lightbox-prev" aria-label="Previous Image">&#10094;</button>
    <div class="lightbox-content-wrapper">
      <img class="lightbox-img" src="" alt="Enlarged Project Photo">
      <div class="lightbox-caption"></div>
    </div>
    <button class="lightbox-arrow lightbox-next" aria-label="Next Image">&#10095;</button>
  `;
  document.body.appendChild(lightbox);

  const imgElement = lightbox.querySelector('.lightbox-img');
  const captionElement = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const overlay = lightbox.querySelector('.lightbox-overlay');

  let activeIndex = -1;
  const visibleImages = [];

  // Function to get current visible list of images based on active filters
  const updateVisibleImages = () => {
    visibleImages.length = 0; // Clear
    galleryLinks.forEach(link => {
      const parentItem = link.closest('.gallery-item');
      if (parentItem && parentItem.style.display !== 'none') {
        visibleImages.push(link);
      }
    });
  };

  // Opens lightbox and displays the item at index
  const openLightbox = (index) => {
    updateVisibleImages();
    if (index < 0 || index >= visibleImages.length) return;
    
    activeIndex = index;
    const targetLink = visibleImages[activeIndex];
    const imgSrc = targetLink.getAttribute('href');
    const imgCaption = targetLink.getAttribute('data-caption') || targetLink.querySelector('img')?.getAttribute('alt') || 'Perfect Gulf Limited Installation';

    imgElement.style.opacity = '0';
    imgElement.src = imgSrc;
    captionElement.textContent = imgCaption;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolls

    imgElement.onload = () => {
      imgElement.style.opacity = '1';
    };
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Resume scrolling
  };

  const showNext = () => {
    updateVisibleImages();
    let nextIndex = activeIndex + 1;
    if (nextIndex >= visibleImages.length) nextIndex = 0; // Loop back
    openLightbox(nextIndex);
  };

  const showPrev = () => {
    updateVisibleImages();
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) prevIndex = visibleImages.length - 1; // Loop back
    openLightbox(prevIndex);
  };

  // Add click listeners to gallery elements
  galleryLinks.forEach((link, idx) => {
    // Intercept clicks to stay in app rather than navigating to image file
    link.addEventListener('click', (e) => {
      e.preventDefault();
      updateVisibleImages();
      const currentFilteredIndex = visibleImages.indexOf(link);
      openLightbox(currentFilteredIndex);
    });
  });

  // Modal Closures
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  // Direction Navigations
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

// 2. STYLES FOR LIGHTBOX MODAL (appended dynamically if not in CSS)
const style = document.createElement('style');
style.textContent = `
  .lightbox-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: 'Inter', sans-serif;
  }
  .lightbox-modal.active {
    display: flex;
  }
  .lightbox-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(6, 30, 56, 0.95); /* Deep PGL Brand Blue Overlay */
    backdrop-filter: blur(8px);
  }
  .lightbox-content-wrapper {
    position: relative;
    z-index: 10001;
    max-width: 85%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  .lightbox-img {
    max-width: 100%;
    max-height: 75vh;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    transition: opacity 0.3s ease-in-out;
  }
  .lightbox-caption {
    font-size: 1.05rem;
    font-weight: 500;
    text-align: center;
    background: rgba(2, 11, 21, 0.7);
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    max-width: 90%;
  }
  .lightbox-close {
    position: absolute;
    top: 30px;
    right: 40px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10002;
    transition: transform 0.2s;
  }
  .lightbox-close:hover {
    transform: scale(1.2) rotate(90deg);
  }
  .lightbox-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.15);
    color: white;
    font-size: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10002;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  .lightbox-arrow:hover {
    background: var(--light-blue, #138adc);
    transform: translateY(-50%) scale(1.1);
    border-color: transparent;
  }
  .lightbox-prev { left: 40px; }
  .lightbox-next { right: 40px; }
  
  @media (max-width: 768px) {
    .lightbox-arrow {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
    .lightbox-prev { left: 15px; }
    .lightbox-next { right: 15px; }
    .lightbox-close {
      top: 15px;
      right: 20px;
      font-size: 35px;
    }
  }
`;
document.head.appendChild(style);
