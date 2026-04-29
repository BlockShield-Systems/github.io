import { renderLogoCard } from '../components/LogoCard';

export function renderHeroSection(): string {
  return `
    <header id="top" class="hero min-vh-100 d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-xl-10">
            <p class="text-uppercase text-info fw-semibold letter-spacing mb-3">
              AI-Techart & Dynamics
            </p>

            <h1 class="display-2 fw-bold mb-4 text-white">
              From Legacy to Intelligent
            </h1>

            <h2 class="hero-app-title text-white fw-semibold mb-3">
              n8n Automation Platform
            </h2>

            <p class="hero-app-description lead text-light mb-4">
              AI-Techart & Dynamics provides a self-hosted n8n-based automation environment
              via <strong>n8n.ai-techart.com</strong>. It is used to build and operate
              workflow automation, document processing, connected service integrations,
              and intelligent process orchestration through authorized APIs and external tools.
            </p>

            <p class="lead text-light mb-4">
              Built on 25+ years of deep hands-on involvement across IT, software, automation, AI and creative technology. I design production-ready workflows, modern digital solutions and visually distinctive AI-driven systems.
            </p>

            <p class="fs-5 text-secondary mb-5">
              Demian Lienert
            </p>

            <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
              <a href="#workflows" class="btn btn-primary btn-lg px-5">
                Explore My Agentic Workflows
              </a>
              <a href="#transformations" class="btn btn-outline-light btn-lg px-5">
                View Transformations
              </a>
            </div>

            <div class="row g-4 justify-content-center">
              ${renderLogoCard({
    image: '/images/logos/twisted4chaos.jpg',
    title: 'Twisted_4_Chaos',
    description: 'Creative AI visuals, cyberpunk aesthetics, and generative art pipelines.'
  })}
              ${renderLogoCard({
    image: '/images/logos/ai-techart.webp',
    title: 'AI-Techart & Dynamics',
    description: 'Production-ready AI workflows, modern development, and intelligent digital solutions.'
  })}
              ${renderLogoCard({
    image: '/images/logos/blockshield.webp',
    title: 'BlockShield Systems',
    description: 'Secure smart-tech thinking, resilient system design, and technical depth with enterprise roots.'
  })}
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}
