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
  const app = document.getElementById('app');

  if (!app) {
    console.error('App root #app not found.');
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

  attachSmoothScrolling();
  attachTransformationHoverEffects();
  initializeContactForm();
});

function attachSmoothScrolling(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');

      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function attachTransformationHoverEffects(): void {
  document.querySelectorAll<HTMLElement>('.transformation-card').forEach((card) => {
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

async function initializeContactForm(): Promise<void> {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  const statusElement = document.querySelector<HTMLDivElement>('#contact-form-status');

  if (!form || !statusElement) return;

  const nameInput = form.querySelector<HTMLInputElement>('#contact-name');
  const emailInput = form.querySelector<HTMLInputElement>('#contact-email');
  const topicInput = form.querySelector<HTMLSelectElement>('#contact-topic');
  const stageInput = form.querySelector<HTMLSelectElement>('#contact-stage');
  const messageInput = form.querySelector<HTMLTextAreaElement>('#contact-message');
  const privacyCheckbox = form.querySelector<HTMLInputElement>('#contact-privacy');
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  if (!nameInput || !emailInput || !topicInput || !stageInput || !messageInput || !privacyCheckbox || !submitButton) {
    console.error('Contact form fields are incomplete.');
    return;
  }

  const fields = [nameInput, emailInput, topicInput, stageInput, messageInput];

  fields.forEach((field) => {
    field.addEventListener('input', () => clearFieldState(field));
    field.addEventListener('change', () => clearFieldState(field));
  });

  privacyCheckbox.addEventListener('change', () => {
    clearPrivacyState(privacyCheckbox);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let isValid = true;

    clearStatus(statusElement);
    fields.forEach((field) => clearFieldState(field));
    clearPrivacyState(privacyCheckbox);

    if (!nameInput.value.trim()) {
      markInvalid(nameInput);
      isValid = false;
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      markInvalid(emailInput);
      isValid = false;
    }

    if (!topicInput.value.trim()) {
      markInvalid(topicInput);
      isValid = false;
    }

    if (!stageInput.value.trim()) {
      markInvalid(stageInput);
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      markInvalid(messageInput);
      isValid = false;
    }

    if (!privacyCheckbox.checked) {
      markPrivacyInvalid(privacyCheckbox);
      isValid = false;
    }

    if (!isValid) {
      statusElement.textContent = 'Please complete all required fields correctly.';
      statusElement.className = 'contact-form-status error';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    statusElement.textContent = 'Submitting your inquiry...';
    statusElement.className = 'contact-form-status';

    try {
      const response = await fetch('https://ai-techart-contact-worker.contact-541.workers.dev/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          topic: topicInput.value.trim(),
          stage: stageInput.value.trim(),
          message: messageInput.value.trim(),
          privacyAccepted: privacyCheckbox.checked
        })
      });

      const result = (await response.json()) as { ok: boolean; error?: string; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Submission failed.');
      }

      statusElement.textContent =
        'Your inquiry was sent successfully. Thank you — I will review it and respond as appropriate.';
      statusElement.className = 'contact-form-status success';

      form.reset();
      clearPrivacyState(privacyCheckbox);
    } catch (error) {
      console.error(error);

      statusElement.textContent =
        'The inquiry could not be sent right now. Please try again later or use LinkedIn as fallback.';
      statusElement.className = 'contact-form-status error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send project inquiry';
    }
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function markInvalid(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
  element.classList.add('is-invalid');
}

function clearFieldState(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
  element.classList.remove('is-invalid');
}

function markPrivacyInvalid(checkbox: HTMLInputElement): void {
  checkbox.classList.add('is-invalid');

  const feedback = document.querySelector<HTMLElement>('.contact-check-feedback');
  if (feedback) {
    feedback.style.visibility = 'visible';
  }
}

function clearPrivacyState(checkbox: HTMLInputElement): void {
  checkbox.classList.remove('is-invalid');

  const feedback = document.querySelector<HTMLElement>('.contact-check-feedback');
  if (feedback) {
    feedback.style.visibility = 'hidden';
  }
}

function clearStatus(statusElement: HTMLDivElement): void {
  statusElement.textContent = '';
  statusElement.className = 'contact-form-status';
}