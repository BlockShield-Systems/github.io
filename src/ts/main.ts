import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode
  document.documentElement.classList.add('dark');

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href')!);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==================== TRANSFORMATIONS GALLERY (DEBUG) ====================
  console.log('✅ Gallery Script started');

  interface Transformation {
    title: string;
    before: string;
    after: string;
  }

  const transformations: Transformation[] = [ /* deine 12 Einträge bleiben gleich */];

  const grid = document.getElementById('transformations-grid') as HTMLDivElement;

  console.log('Grid Element gefunden:', grid ? 'JA' : 'NEIN');

  if (grid) {
    console.log('Fülle Gallery mit', transformations.length, 'Bildern...');
    grid.innerHTML = transformations.map(t => `
    <div class="col-md-6 col-lg-4">
      <div class="card bg-dark border-0 h-100 transformation-card overflow-hidden">
        <div class="position-relative">
          <img src="/assets/images/transformations/${t.before}" class="before-img w-100 h-100 object-fit-cover" alt="${t.title} Before" style="transition: opacity 0.5s ease;">
          <img src="/assets/images/transformations/${t.after}" class="after-img w-100 h-100 object-fit-cover position-absolute top-0 start-0" alt="${t.title} After" style="opacity: 0; transition: opacity 0.5s ease;">
          <div class="card-img-overlay d-flex flex-column justify-content-end p-4 bg-gradient">
            <h5 class="text-white fw-bold mb-1">${t.title}</h5>
            <small class="text-light opacity-75">Hover für den Wow-Effekt</small>
          </div>
        </div>
      </div>
    </div>
  `).join('');
    console.log('✅ Gallery HTML wurde eingefügt');
  } else {
    console.error('❌ Grid Element NICHT gefunden!');
  }

  // Hover-Effekt bleibt gleich
  document.querySelectorAll('.transformation-card').forEach(card => {
    const beforeImg = card.querySelector('.before-img') as HTMLImageElement;
    const afterImg = card.querySelector('.after-img') as HTMLImageElement;

    card.addEventListener('mouseenter', () => {
      beforeImg.style.opacity = '0';
      afterImg.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      beforeImg.style.opacity = '1';
      afterImg.style.opacity = '0';
    });
  });
});