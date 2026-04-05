export function renderContactSection(): string {
  return `
    <section id="contact" class="py-5">
      <div class="container">
        <div class="contact-card p-4 p-lg-5">
          <div class="row align-items-center g-4">
            <div class="col-12 col-lg-8">
              <p class="text-uppercase text-info fw-semibold mb-2 letter-spacing">Contact</p>
              <h2 class="display-6 fw-bold text-white mb-3">Let’s Build Something Meaningful</h2>
              <p class="lead text-light mb-0">
                If you are looking for structured AI workflows, visually distinctive creative concepts,
                modern technical execution or a hybrid profile between enterprise depth and AI innovation,
                let’s connect and discuss the right direction.
              </p>
            </div>

            <div class="col-12 col-lg-4">
              <div class="d-grid gap-3">
                <a
                  href="mailto:contact@ai-techart.com"
                  class="btn btn-primary btn-lg"
                >
                  <i class="bi bi-envelope-fill me-2"></i>
                  Email Me
                </a>

                <a
                  href="https://www.linkedin.com/in/ai-techart-demian/"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-outline-light btn-lg"
                >
                  <i class="bi bi-linkedin me-2"></i>
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