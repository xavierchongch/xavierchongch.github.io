document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealItems.forEach(item => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealItems.forEach(item => observer.observe(item));
  }

  const cards = Array.from(document.querySelectorAll('.project, .cycle-card, .tile'));
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const getDetail = card => card.querySelector('.project-detail, .cycle-detail, .tile-detail');

  const setDetailHeight = card => {
    const detail = getDetail(card);
    if (!detail || !card.classList.contains('is-open')) return;
    detail.style.height = `${detail.scrollHeight}px`;
  };

  const closeCard = card => {
    const detail = getDetail(card);
    if (!detail) return;
    detail.style.height = `${detail.scrollHeight}px`;
    card.classList.remove('is-open');
    card.setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => {
      detail.style.height = '0px';
    });
  };

  const openCard = card => {
    const detail = getDetail(card);
    if (!detail) return;
    const group = card.closest('.projects, .cycle-grid, .mosaic');
    if (group) {
      group.querySelectorAll('.is-open').forEach(openCardInGroup => {
        if (openCardInGroup !== card) closeCard(openCardInGroup);
      });
    }
    card.classList.add('is-open');
    card.setAttribute('aria-expanded', 'true');
    detail.style.height = `${detail.scrollHeight}px`;
  };

  const toggleCard = card => {
    if (card.classList.contains('is-open')) {
      closeCard(card);
    } else {
      openCard(card);
    }
  };

  cards.forEach((card, index) => {
    const detail = getDetail(card);
    if (!detail) return;

    const detailId = detail.id || `expandable-card-${index}`;
    detail.id = detailId;
    detail.style.height = '0px';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    card.setAttribute('aria-controls', detailId);

    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      toggleCard(card);
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard(card);
      }
    });

    if (canHover) {
      card.addEventListener('mouseenter', () => openCard(card));
      card.addEventListener('mouseleave', () => {
        if (!card.matches(':focus-within')) closeCard(card);
      });
      card.addEventListener('focusout', () => {
        requestAnimationFrame(() => {
          if (!card.matches(':focus-within') && !card.matches(':hover')) closeCard(card);
        });
      });
    }

    detail.querySelectorAll('img').forEach(image => {
      image.addEventListener('load', () => setDetailHeight(card));
    });

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => setDetailHeight(card));
      const inner = detail.firstElementChild || detail;
      resizeObserver.observe(inner);
    }
  });

  window.addEventListener('resize', () => {
    cards.forEach(setDetailHeight);
  }, { passive: true });
});
