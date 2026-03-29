interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

export function renderSectionHeader({
  eyebrow,
  title,
  description,
  centered = true
}: SectionHeaderProps): string {
  return `
    <div class="${centered ? 'text-center' : ''} mb-5">
      <p class="text-uppercase text-info fw-semibold mb-2">${eyebrow}</p>
      <h2 class="display-5 fw-bold text-white">${title}</h2>
      <p class="lead text-light ${centered ? 'mx-auto' : ''}" style="max-width: 900px;">
        ${description}
      </p>
    </div>
  `;
}