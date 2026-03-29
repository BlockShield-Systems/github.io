import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/main.css';

import { renderHeroSection } from './sections/HeroSection';
import { renderWorkflowsSection } from './sections/WorkflowsSection';
import { renderSkillsSection } from './sections/SkillsSection';
import { renderProjectsSection } from './sections/ProjectsSection';
import { renderServicesSection } from './sections/ServicesSection';
import { renderGallerySection } from './sections/GallerySection';
import { renderAboutSection } from './sections/AboutSection';
import { renderContactSection } from './sections/ContactSection';

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('dark');

  const app = document.getElementById('app');
  if (!app) {
    console.error('❌ #app not found');
    return;
  }

  app.innerHTML = `
    ${renderHeroSection()}
    ${renderWorkflowsSection()}
    ${renderSkillsSection()}
    ${renderProjectsSection()}
    ${renderServicesSection()}
    ${renderGallerySection()}
    ${renderAboutSection()}
    ${renderContactSection()}
  `;

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  attachTransformationHoverEffects();
});

function attachTransformationHoverEffects(): void {
  document.querySelectorAll<HTMLElement>('.transformation-card').forEach(card => {
    const beforeImg = card.querySelector<HTMLImageElement>('.before-img');
    const afterImg = card.querySelector<HTMLImageElement>('.after-img');

    if (!beforeImg || !afterImg) return;

    card.addEventListener('mouseenter', () => {
      beforeImg.style.opacity = '0';
      afterImg.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      beforeImg.style.opacity = '1';
      afterImg.style.opacity = '0';
    });

    card.addEventListener('click', () => {
      const isVisible = afterImg.style.opacity === '1';
      beforeImg.style.opacity = isVisible ? '1' : '0';
      afterImg.style.opacity = isVisible ? '0' : '1';
    });
  });
}