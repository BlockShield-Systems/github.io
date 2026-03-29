import { renderSectionHeader } from '../components/SectionHeader';

export function renderAboutSection(): string {
  return `
    <section id="about" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'About Me',
    title: 'Enterprise Roots, Modern AI Direction',
    description:
      'I am a certified Swiss Informatics Specialist EFZ with a modern professional foundation in systems engineering and platform-oriented IT. Beyond the formal path, my technical profile has been shaped by more than 25 years of intensive self-driven work across administration, networking, programming, Linux, automation, AI, web development and digital creation.'
  })}

        <div class="row g-4 align-items-start">
          <div class="col-lg-7">
            <div class="about-card p-4 h-100">
              <p class="text-light">
                My background spans enterprise IT, structured engineering and platform-oriented thinking.
                Today, I bring that depth into AI-powered workflows, creative visual systems and intelligent digital solutions.
              </p>
              <p class="text-light">
                What makes my profile different is the combination of three normally separate worlds:
                technical depth, security-oriented thinking and creative AI execution.
              </p>
              <p class="text-light mb-0">
                I am especially interested in systems that are not only impressive on the surface,
                but architecturally meaningful, operationally useful and visually memorable.
              </p>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="about-card p-4 h-100">
              <h3 class="h5 text-white fw-bold mb-3">Profiles & External References</h3>
              <ul class="list-unstyled d-flex flex-column gap-3 mb-0">
                <li>
                  <a class="text-info text-decoration-none" href="https://www.linkedin.com/in/ai-techart-demian/" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a class="text-info text-decoration-none" href="https://www.artstation.com/twisted_4_chaos" target="_blank" rel="noreferrer">
                    ArtStation
                  </a>
                </li>
                <li>
                  <a class="text-info text-decoration-none" href="https://github.com/BlockShield-Systems" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a class="text-info text-decoration-none" href="https://x.com/BlockShield_SYS" target="_blank" rel="noreferrer">
                    X / BlockShield_SYS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}