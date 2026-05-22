export function renderFeaturedProjectSection(): string {
  return `
    <section
      class="smd-showcase"
      id="swiss-market-dashboard"
      aria-labelledby="smd-title"
    >
      <div class="smd-showcase__inner">
        <figure class="smd-showcase__media">
          <video
            class="smd-showcase__video"
            data-smd-brand-video
            muted
            loop
            playsinline
            autoplay
            preload="auto"
            poster="/assets/images/ai-techart-blockshield-logo-poster.webp"
            aria-describedby="smd-video-caption"
          >
            <source
              src="/assets/videos/ai-techart-blockshield-logo-sequence.mp4"
              type="video/mp4"
            />
            Your browser does not support the video element.
          </video>

          <figcaption id="smd-video-caption" class="smd-sr-only">
            Brand animation from AI-Techart to BlockShield Systems.
          </figcaption>

          <button
            class="smd-showcase__video-toggle"
            type="button"
            data-smd-video-toggle
            aria-pressed="false"
          >
            Play animation
          </button>
        </figure>

        <div class="smd-showcase__content">
          <p class="smd-showcase__eyebrow">Featured Project</p>

          <h2 id="smd-title">Swiss Market Dashboard</h2>

          <p class="smd-showcase__lead">
            Standalone live demo of my Swiss Market Dashboard project,
            deployed with Vercel on a dedicated subdomain.
          </p>

          <p class="smd-showcase__text">
            The project intentionally separates the public brand presence from
            the actual dashboard application: the main website introduces the
            project, while the subdomain delivers the live demo.
          </p>

          <div
            class="smd-showcase__actions"
            aria-label="Swiss Market Dashboard project links"
          >
            <a
              class="smd-button smd-button--primary"
              href="https://dashboard.ai-techart.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Live Demo
            </a>

            <a
              class="smd-button smd-button--secondary"
              href="https://github.com/BlockShield-Systems/swiss-market-dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Project
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
