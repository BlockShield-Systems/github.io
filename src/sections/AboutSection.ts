import { renderSectionHeader } from '../components/SectionHeader';
import { renderTrustBadge } from '../components/TrustBadge';
import { renderTimelineItem } from '../components/TimelineItem';
import { profileLinks, timelineEntries, trustPoints } from '../data/profile';

export function renderAboutSection(): string {
  return `
    <section id="about" class="py-5">
      <div class="container">
        ${renderSectionHeader({
    eyebrow: 'About Me',
    title: 'Enterprise roots, modern AI direction and deep hands-on technical range',
    description: 'My profile combines formal systems-oriented training, long-term private technical depth and a current focus on AI workflows, modern digital delivery and creative technology.'
  })}

        <div class="row g-4 align-items-start mb-5">
          <div class="col-12 col-lg-7">
            <div class="about-card h-100 p-4 p-lg-5">
              <h3 class="h3 text-white fw-bold mb-4">Demian Lienert</h3>

              <p class="text-light mb-4">
                I am a certified Swiss Informatics Specialist EFZ with a modern professional foundation in systems engineering and platform-oriented IT.
                Beyond the formal path, my technical profile has been shaped by more than 25 years of intensive self-driven work across administration,
                networking, programming, Linux, automation, AI, web development and digital creation.
              </p>

              <p class="text-light mb-4">
                My background spans enterprise-rooted thinking, structured engineering and broad technical curiosity. Today, I bring that depth into
                AI-powered workflows, creative visual systems, modern frontend implementation and technically meaningful digital solutions.
              </p>

              <p class="text-light mb-0">
                What makes my profile different is the combination of three normally separate worlds: technical depth, security-oriented thinking and creative AI execution.
                I am especially interested in systems that are not only impressive on the surface, but architecturally meaningful, operationally useful and visually memorable.
              </p>
            </div>
          </div>

          <div class="col-12 col-lg-5">
            <div class="about-card h-100 p-4 p-lg-5">
              <h3 class="h4 text-white fw-bold mb-4">Profiles & Presence</h3>
              <div class="d-flex flex-column gap-3">
                ${profileLinks
      .map(
        (link) => `
                      <a
                        href="${link.url}"
                        target="_blank"
                        rel="noreferrer"
                        class="profile-link d-flex align-items-center justify-content-between text-decoration-none"
                      >
                        <span class="d-flex align-items-center gap-3">
                          <i class="bi ${link.icon}"></i>
                          <span>${link.label}</span>
                        </span>
                        <i class="bi bi-arrow-up-right"></i>
                      </a>
                    `
      )
      .join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="row g-4 mb-5">
          ${trustPoints.map(renderTrustBadge).join('')}
        </div>

        <div class="about-card p-4 p-lg-5">
          <h3 class="h4 text-white fw-bold mb-4">Compact Background Timeline</h3>
          <div class="timeline-wrapper">
            ${timelineEntries.map(renderTimelineItem).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}