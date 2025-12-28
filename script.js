document.addEventListener('DOMContentLoaded', () => {
  // header background on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // hero slider
  const slides = document.querySelector('.hero-slides');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides && dots.length) {
    let index = 0;
    const total = slides.children.length;
    const goTo = (i) => {
      index = (i + total) % total;
      slides.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
    };
    let timer = setInterval(() => goTo(index + 1), 5500);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        goTo(i);
        timer = setInterval(() => goTo(index + 1), 5500);
      });
    });
  }

  // project filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  if (filterButtons.length && projectItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        projectItems.forEach(item => {
          const itemCat = item.dataset.cat;
          item.style.display = (cat === 'all' || itemCat === cat) ? '' : 'none';
        });
      });
    });
  }

  // lightbox
  const galleryImgs = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightbox = document.querySelector('.lightbox');
  if (lightbox && galleryImgs.length) {
    const imgEl = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-btn');
    const left = lightbox.querySelector('.arrow.left');
    const right = lightbox.querySelector('.arrow.right');
    let current = 0;

    const open = (idx) => {
      current = idx;
      const src = galleryImgs[current].dataset.src || galleryImgs[current].getAttribute('src');
      imgEl.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    const showNext = (dir) => {
      current = (current + dir + galleryImgs.length) % galleryImgs.length;
      open(current);
    };

    galleryImgs.forEach((img, idx) => {
      img.addEventListener('click', () => open(idx));
    });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    left.addEventListener('click', () => showNext(-1));
    right.addEventListener('click', () => showNext(1));
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    });
  }

  // Gallery Slider Logic
  const galleryContainer = document.querySelector('.gallery-slider-container');
  if (galleryContainer) {
    const track = galleryContainer.querySelector('.gallery-slider-track');
    const slides = Array.from(track.children);
    const nextBtn = galleryContainer.querySelector('.slider-arrow.next');
    const prevBtn = galleryContainer.querySelector('.slider-arrow.prev');

    let currentIndex = 0;

    const updateSlidePosition = () => {
      const gap = 20; // Must match CSS gap

      if (slides.length === 0) return;

      // Get the width of the first slide to calculate movement
      const slideWidth = slides[0].getBoundingClientRect().width;
      const moveAmount = slideWidth + gap;

      track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      // UPDATED: Allow scrolling until the very last item is the first one on the left
      nextBtn.disabled = currentIndex >= slides.length - 1;
    };

    nextBtn.addEventListener('click', () => {
      // UPDATED: Condition matches the disabled logic above
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlidePosition();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
      }
    });

    // Recalculate on resize to keep alignment correct
    window.addEventListener('resize', () => {
        currentIndex = 0; // Reset to start to avoid calculation errors
        updateSlidePosition();
    });

    // Initial calculation after a short delay to ensure layout is ready
    setTimeout(updateSlidePosition, 100);
  }
});