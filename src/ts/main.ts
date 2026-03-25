import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/main.css';

// Dark Mode + Smooth Scroll + einfache Animationen
document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode (standardmäßig aktiv)
  document.documentElement.classList.add('dark');

  // Smooth Scroll für alle Anker-Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href')!);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Einfache Fade-In Animation für Hero
  const hero = document.querySelector('.hero') as HTMLElement;
  if (hero) {
    hero.style.opacity = '0';
    setTimeout(() => {
      hero.style.transition = 'opacity 1.2s ease-out';
      hero.style.opacity = '1';
    }, 100);
  }

  console.log('🚀 AI-Techart Portfolio – TypeScript ready');
});