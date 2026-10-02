async function loadProfile() {
  try {
    const response = await fetch('data/profile.json');

    if (!response.ok) {
      throw new Error('Gagal memuat data profil');
    }

    const profile = await response.json();
    applyProfile(profile);
  } catch (error) {
    console.error(error);
    const fallback = {
      name: 'Shaktar Delima',
      role: 'Developer & Programmer',
      tagline: 'Menciptakan pengalaman digital yang indah dan fungsional',
      heroTitle: 'Nama Saya.',
      heroAccent: 'Shaktar Delima',
      aboutTitle: 'Saya membangun pengalaman digital yang terasa premium.',
      bio: 'Saya adalah seorang developer dan programmer yang tertarik pada produk digital yang tidak hanya terlihat bagus, tetapi juga mudah dipahami, cepat, dan berdampak nyata bagi pengguna.',
      story: 'Dari desain interface hingga implementasi front-end, saya membantu brand dan bisnis menghadirkan solusi digital yang modern, user-friendly, dan scalable untuk kebutuhan nyata.',
      email: 'shaktar.delima@example.com',
      availability: 'For freelance work',
      socials: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com' },
        { name: 'GitHub', url: 'https://www.github.com' },
        { name: 'Instagram', url: 'https://www.instagram.com' }
      ],
      images: {
        hero: 'tre.jpeg',
        profile: 'tre.jpeg'
      },
      stats: [
        { value: '5+', label: 'Tahun pengalaman' },
        { value: '28', label: 'Proyek selesai' }
      ]
    };
    applyProfile(fallback);
  }
}

function applyProfile(profile) {
  const name = document.querySelector('#profileName');
  const role = document.querySelector('#profileRole');
  const title = document.querySelector('#heroTitle');
  const tagline = document.querySelector('#profileTagline');
  const availability = document.querySelector('#profileAvailability');
  const email = document.querySelector('#profileEmail');
  const aboutTitle = document.querySelector('#aboutTitle');
  const aboutBio = document.querySelector('#aboutBio');
  const aboutStory = document.querySelector('#aboutStory');
  const heroImage = document.querySelector('#heroImage');
  const profileImage = document.querySelector('#profileImage');
  const footerText = document.querySelector('#footerText');
  const socialLinks = document.querySelector('#socialLinks');
  const statsWrap = document.querySelector('#profileStats');

  if (name) name.textContent = profile.name;
  if (role) role.textContent = profile.role;
  if (title) title.textContent = profile.heroTitle;
  if (tagline) tagline.textContent = profile.tagline;
  if (availability) availability.textContent = profile.availability;
  if (email) {
    email.textContent = profile.email;
    email.href = `mailto:${profile.email}`;
  }
  if (aboutTitle) aboutTitle.textContent = profile.aboutTitle;
  if (aboutBio) aboutBio.textContent = profile.bio;
  if (aboutStory) aboutStory.textContent = profile.story;
  if (heroImage) heroImage.src = profile.images.hero;
  if (profileImage) profileImage.src = profile.images.profile;
  if (footerText) footerText.textContent = `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`;

  if (socialLinks && profile.socials) {
    socialLinks.innerHTML = profile.socials
      .map(
        (social) => `
          <a href="${social.url}" target="_blank" rel="noreferrer" aria-label="${social.name}" class="transition hover:text-apple-black">${social.name}</a>
        `
      )
      .join('');
  }

  if (statsWrap && profile.stats) {
    statsWrap.innerHTML = profile.stats
      .map(
        (stat) => `
          <div>
            <div class="text-2xl font-semibold text-apple-black">${stat.value}</div>
            <div>${stat.label}</div>
          </div>
        `
      )
      .join('');
  }
}

// Data proyek diambil dari file JSON agar mudah dikelola dan diperbarui.
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');

    if (!response.ok) {
      throw new Error('Gagal memuat data proyek');
    }

    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error(error);
    const fallback = [
      {
        title: 'Asteria Commerce',
        category: 'E-Commerce Platform',
        description: 'Desain produk dan front-end untuk pengalaman belanja premium.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        url: '#'
      }
    ];
    renderProjects(fallback);
  }
}

function renderProjects(projects) {
  const grid = document.querySelector('#projectsGrid');

  if (!grid) {
    return;
  }

  const safeProjects = Array.isArray(projects) ? projects : [];

  grid.innerHTML = `
    <div class="project-slider-viewport">
      <div class="project-slider-track">
        ${safeProjects
          .map(
            (project) => `
              <article class="project-slide reveal">
                <div class="project-card h-full">
                  <a href="${project.url || '#'}" aria-label="Open project ${project.title}" class="block h-full">
                    <div class="overflow-hidden">
                      <img src="${project.image}" alt="${project.title} preview" loading="lazy" />
                    </div>
                    <div class="project-meta flex items-start justify-between gap-4">
                      <div>
                        <p class="project-category">${project.category}</p>
                        <h3 class="mt-3 text-2xl font-semibold tracking-[-0.05em] text-apple-black">${project.title}</h3>
                        <p class="mt-3 text-base leading-7 text-apple-muted">${project.description}</p>
                      </div>
                      <span class="project-arrow" aria-hidden="true">→</span>
                    </div>
                  </a>
                </div>
              </article>
            `
          )
          .join('')}
      </div>
    </div>

    <div class="project-slider-controls mt-8 flex items-center justify-between">
      <div class="project-dots flex items-center gap-2" aria-label="Project pagination">
        ${safeProjects
          .map(
            (_, index) => `
              <button class="project-dot h-2.5 w-2.5 rounded-full bg-apple-black/30 transition-all ${index === 0 ? 'is-active' : ''}" data-index="${index}" aria-label="Go to project ${index + 1}"></button>
            `
          )
          .join('')}
      </div>

      <div class="flex items-center gap-3">
        <button id="projectPrev" class="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-apple-black transition hover:bg-[#f5f5f7]" aria-label="Previous project">←</button>
        <button id="projectNext" class="flex h-11 w-11 items-center justify-center rounded-full bg-apple-black text-lg text-white transition hover:bg-[#2d2d31]" aria-label="Next project">→</button>
      </div>
    </div>
  `;

  initProjectSlider();
  revealOnScroll();
}

function initProjectSlider() {
  const track = document.querySelector('.project-slider-track');
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.project-dot');
  const prevBtn = document.querySelector('#projectPrev');
  const nextBtn = document.querySelector('#projectNext');

  if (!track || !slides.length || !dots.length || !prevBtn || !nextBtn) {
    return;
  }

  const slider = document.querySelector('.project-slider-container');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const autoplayDelay = 5000;
  let index = 0;
  let autoplayTimer;

  const updateSlider = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('is-active', active);
      dot.style.width = active ? '2.2rem' : '0.625rem';
      dot.style.background = active ? '#1d1d1f' : 'rgba(29,29,31,0.3)';
    });
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  };

  const startAutoplay = () => {
    stopAutoplay();

    if (
      slides.length < 2 ||
      prefersReducedMotion.matches ||
      document.hidden ||
      slider.matches(':hover') ||
      slider.contains(document.activeElement)
    ) {
      return;
    }

    autoplayTimer = window.setInterval(() => updateSlider(index + 1), autoplayDelay);
  };

  prevBtn.addEventListener('click', () => {
    updateSlider(index - 1);
    startAutoplay();
  });
  nextBtn.addEventListener('click', () => {
    updateSlider(index + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      updateSlider(Number(dot.dataset.index));
      startAutoplay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', (event) => {
    if (!slider.contains(event.relatedTarget)) {
      startAutoplay();
    }
  });
  document.addEventListener('visibilitychange', startAutoplay);
  prefersReducedMotion.addEventListener('change', startAutoplay);

  updateSlider(0);
  startAutoplay();
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.querySelector('#themeToggle');
  const sunIcon = document.querySelector('#themeIconSun');
  const moonIcon = document.querySelector('#themeIconMoon');

  if (!toggle || !sunIcon || !moonIcon) {
    return;
  }

  const savedTheme = localStorage.getItem('theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (isDark) => {
    root.classList.toggle('dark', isDark);
    sunIcon.classList.toggle('hidden', isDark);
    moonIcon.classList.toggle('hidden', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const isDark = savedTheme ? savedTheme === 'dark' : preferredDark;
  applyTheme(isDark);

  toggle.addEventListener('click', () => {
    applyTheme(!root.classList.contains('dark'));
  });
}

function initMenuToggle() {
  const toggle = document.querySelector('#menuToggle');
  const mobileMenu = document.querySelector('#mobileMenu');

  if (!toggle || !mobileMenu) {
    return;
  }

  const setMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.inert = !isOpen;
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    toggle.title = isOpen ? 'Close navigation menu' : 'Open navigation menu';
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(!mobileMenu.classList.contains('is-open'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

function initActiveNavigation() {
  const links = document.querySelectorAll('#navMenu a[href^="#"], #mobileMenu a[href^="#"]');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter((section, index, allSections) => section && allSections.indexOf(section) === index);

  if (!links.length || !sections.length) {
    return;
  }

  const setActiveSection = (sectionId) => {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries.find((entry) => entry.isIntersecting);
      if (visibleSection) {
        setActiveSection(visibleSection.target.id);
      }
    },
    { rootMargin: '-25% 0px -65% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

function initTestimonials() {
  const track = document.querySelector('#testimonialTrack');
  const dots = document.querySelectorAll('.testimonial-dot');
  const nextBtn = document.querySelector('#nextTestimonial');
  const prevBtn = document.querySelector('#prevTestimonial');

  if (!track || !dots.length || !nextBtn || !prevBtn) {
    return;
  }

  let index = 0;
  const totalSlides = track.children.length;

  function renderSlide(currentIndex) {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentIndex);
      dot.classList.toggle('bg-apple-black/40', dotIndex !== currentIndex);
      dot.classList.toggle('bg-apple-black/20', dotIndex !== currentIndex);
    });
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    renderSlide(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    renderSlide(index);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = Number(dot.dataset.index);
      index = targetIndex;
      renderSlide(index);
    });
  });

  renderSlide(index);
}

function initParallax() {
  const items = document.querySelectorAll('[data-parallax]');

  if (!items.length || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    return;
  }

  const updateParallax = () => {
    items.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.08);
      const rect = item.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * speed;
      item.style.transform = `translateY(${offset * -0.06}px)`;
    });
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  loadProjects();
  initThemeToggle();
  initMenuToggle();
  initActiveNavigation();
  initTestimonials();
  initParallax();
});
