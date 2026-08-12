(() => {
  function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px' });
    elements.forEach((element) => observer.observe(element));
  }

  function startCountdown() {
    const label = [...document.querySelectorAll('span')].find((element) => /La oferta termina en/i.test(element.textContent));
    const output = label?.parentElement?.querySelector('span:last-child');
    if (!output) return;

    const endTime = Date.now() + (38 * 60 * 1000);
    const render = () => {
      const remaining = Math.max(0, endTime - Date.now());
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      output.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min`;
    };
    render();
    window.setInterval(render, 1000);
  }

  function setupFaq() {
    document.querySelectorAll('button').forEach((button) => {
      const panel = button.nextElementSibling;
      if (!panel || !panel.classList.contains('grid-rows-[0fr]')) return;
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
        panel.classList.toggle('grid-rows-[0fr]', isOpen);
        panel.classList.toggle('grid-rows-[1fr]', !isOpen);
        panel.classList.toggle('opacity-0', isOpen);
        panel.classList.toggle('opacity-100', !isOpen);
        const icon = button.querySelector('svg');
        icon?.classList.toggle('rotate-180', !isOpen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    startCountdown();
    setupFaq();
  });
})();
