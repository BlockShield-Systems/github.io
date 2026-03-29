interface LogoCardProps {
  image: string;
  title: string;
  description: string;
}

export function renderLogoCard({ image, title, description }: LogoCardProps): string {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="logo-card p-4 h-100 text-center">
        <img
          src="${image}"
          alt="${title} logo"
          class="img-fluid brand-logo mb-3"
          loading="lazy"
          decoding="async"
        />
        <h2 class="h5 text-white fw-bold">${title}</h2>
        <p class="text-light mb-0">${description}</p>
      </article>
    </div>
  `;
}
