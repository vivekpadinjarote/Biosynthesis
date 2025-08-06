const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  let cardWidth;

  function updateCardWidth() {
    const firstCard = track.querySelector('.carousel-card');
    cardWidth = firstCard.offsetWidth;
  }

  updateCardWidth();
  window.addEventListener('resize', updateCardWidth);

  let isAnimating = false;

  // NEXT
  nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const firstCard = track.firstElementChild;
    firstCard.classList.add('fade-out');

    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${cardWidth}px)`;

    track.addEventListener('transitionend', function handler() {
      firstCard.classList.remove('fade-out');
      track.appendChild(firstCard); 
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      void track.offsetWidth;
      isAnimating = false;
      track.removeEventListener('transitionend', handler);
    });
  });

  // PREV
  prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const lastCard = track.lastElementChild;
    lastCard.classList.add('fade-out');

    setTimeout(() => {
      lastCard.classList.remove('fade-out');
      lastCard.classList.add('fade-in');
      track.style.transition = 'none';
      track.insertBefore(lastCard, track.firstElementChild);
      track.style.transform = `translateX(-${cardWidth}px)`;
      void track.offsetWidth;

      track.style.transition = 'transform 0.5s ease';
      track.style.transform = 'translateX(0)';

      track.addEventListener('transitionend', function handler() {
        lastCard.classList.remove('fade-in');
        isAnimating = false;
        track.removeEventListener('transitionend', handler);
      });
    }, 200);
  });