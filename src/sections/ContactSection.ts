import { renderSectionHeader } from '../components/SectionHeader';

export function renderContactSection(): string {
  return `
    <section id="contact" class="py-5 bg-dark">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Contact',
    title: 'Let’s Build Something Meaningful',
    description:
      'If you are looking for creative AI visuals, structured workflow intelligence, modern technical execution or a strong hybrid profile between enterprise depth and AI innovation, let’s connect.'
  })}

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="contact-card p-4 text-center">
              <p class="text-light mb-4">
                The easiest way to reach me right now is via email or LinkedIn.
              </p>

              <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <a href="mailto:contact@ai-techart.com" class="btn btn-primary btn-lg">
                  contact@ai-techart.com
                </a>
                <a
                  href="https://www.linkedin.com/in/ai-techart-demian/"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-outline-light btn-lg"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}