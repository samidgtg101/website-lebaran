/**
 * main.js — Global UI Interactions, Lightbox & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Announcement Banner & Session Storage
  const banner = document.getElementById('top-announcement-banner');
  const closeBannerBtn = document.getElementById('btn-close-banner');
  
  if (banner && sessionStorage.getItem('lb_announcement_closed') === 'true') {
    banner.style.display = 'none';
  }

  if (closeBannerBtn && banner) {
    closeBannerBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      sessionStorage.setItem('lb_announcement_closed', 'true');
    });
  }

  // 2. Sticky Navbar Shadow on Scroll
  const navbar = document.querySelector('.navbar-lebaran');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Portfolio Filter System
  const filterBtns = document.querySelectorAll('.lb-filter-btn');
  const portfolioItems = document.querySelectorAll('.lb-portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; }, 10);
          } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  // 5. Native <dialog> Lightbox for Portfolio & Photos
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.lb-open-lightbox').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const title = trigger.getAttribute('data-title') || 'Detail Proyek';
        const desc = trigger.getAttribute('data-desc') || '';
        const imgSource = trigger.getAttribute('data-img') || '';

        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        if (lightboxImg && imgSource) {
          lightboxImg.src = imgSource;
          lightboxImg.alt = title;
        }

        lightbox.showModal();
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.close();
      });
    }

    // Close when clicking outside modal backdrop
    lightbox.addEventListener('click', (e) => {
      const rect = lightbox.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        lightbox.close();
      }
    });
  }

  // 6. Smooth Scroll for Table of Contents Links
  document.querySelectorAll('.lb-toc a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
