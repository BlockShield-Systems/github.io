import { contactHighlights, contactTopics, projectStages } from '../data/contact';
import { renderSectionHeader } from '../components/SectionHeader';

function renderOptions(
  items: Array<{ label: string; value: string }>
): string {
  return items
    .map((item) => `<option value="${item.value}">${item.label}</option>`)
    .join('');
}

export function renderContactSection(): string {
  return `
    <section id="contact" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'Contact',
    title: 'Let’s turn a good idea into a structured solution',
    description:
      'Start a conversation about your AI workflow, digital product or collaboration and get a clear, structured response.'
  })}

        <div class="row justify-content-center mb-4">
          <div class="col-xl-9">
            <p class="text-secondary text-center fs-5 mb-0">
              If you are planning an AI workflow, a modern digital product, a creative AI concept or a technically meaningful collaboration, this is the right place to start.
            </p>
          </div>
        </div>

        <div class="row g-4 align-items-stretch">
          <div class="col-lg-7">
            <div class="contact-panel h-100">
              <form id="contact-form" class="contact-form" novalidate>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="contact-name" class="form-label">Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      class="form-control contact-input"
                      placeholder="Your name"
                      autocomplete="name"
                      required
                    />
                    <div class="invalid-feedback">Please enter your name.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="contact-email" class="form-label">E-mail</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      class="form-control contact-input"
                      placeholder="your@email.com"
                      autocomplete="email"
                      required
                    />
                    <div class="invalid-feedback">Please enter a valid e-mail address.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="contact-topic" class="form-label">Inquiry type</label>
                    <select
                      id="contact-topic"
                      name="topic"
                      class="form-select contact-input"
                      required
                    >
                      ${renderOptions(contactTopics)}
                    </select>
                    <div class="invalid-feedback">Please select an inquiry type.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="contact-stage" class="form-label">Project stage</label>
                    <select
                      id="contact-stage"
                      name="stage"
                      class="form-select contact-input"
                      required
                    >
                      ${renderOptions(projectStages)}
                    </select>
                    <div class="invalid-feedback">Please select a project stage.</div>
                  </div>

                  <div class="col-12">
                    <label for="contact-message" class="form-label">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      class="form-control contact-input contact-textarea"
                      rows="7"
                      placeholder="Tell me about your project, challenge or idea."
                      required
                    ></textarea>
                    <div class="invalid-feedback">Please enter a message.</div>
                  </div>

                  <div class="col-12">
                    <div class="form-check contact-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="accepted"
                        id="contact-privacy"
                        name="privacy"
                        required
                      />
                      <label class="form-check-label" for="contact-privacy">
                        I understand that my information will be used to process this inquiry and for follow-up communication regarding my request.
                      </label>
                      <div class="invalid-feedback d-block contact-check-feedback">
                        Please confirm the privacy notice before submitting.
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="contact-actions d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
                      <button type="submit" class="btn btn-primary btn-lg px-4">
                        Send project inquiry
                      </button>
                      <div id="contact-form-status" class="contact-form-status" aria-live="polite"></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="contact-side-panel h-100">
              <div class="contact-side-block">
                <h3 class="h5 text-white mb-3">What I can help with</h3>
                <ul class="contact-highlights-list">
                  ${contactHighlights
      .map(
        (item) => `
                        <li>
                          <span class="contact-highlight-dot"></span>
                          <span>${item}</span>
                        </li>
                      `
      )
      .join('')}
                </ul>
              </div>

              <div class="contact-side-block">
                <h3 class="h5 text-white mb-3">Best use of this form</h3>
                <p class="text-secondary mb-0">
                  Use this form if you already have a project idea, a business need, a workflow concept or a collaboration request. Clear context helps me evaluate faster and respond more precisely.
                </p>
              </div>

              <div class="contact-side-block">
                <h3 class="h5 text-white mb-3">Alternative channel</h3>
                <p class="text-secondary mb-3">
                  If you prefer a profile-first approach, you can also connect with me on LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/in/ai-techart-demian/"
                  class="btn btn-outline-light"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit LinkedIn Profile
                </a>
              </div>

              <div class="contact-side-note">
                No anonymous newsletter funnel. No bloated sales flow. Just a direct, structured project entry point.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}