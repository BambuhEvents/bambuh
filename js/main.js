/* BAMBÜH — interacciones y animaciones (vanilla JS, sin dependencias) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrada del hero
  const start = () => requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  setTimeout(start, 1200); // por si alguna imagen tarda demasiado

  // Año del footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Cabecera: fondo al hacer scroll y se oculta al bajar
  const header = document.getElementById('header');
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    const menuOpen = document.body.classList.contains('menu-open');
    header.classList.toggle('is-hidden', !menuOpen && y > lastY && y > window.innerHeight * 0.8);
    lastY = y;
    parallax();
    updateBar();
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // Parallax sutil (solo transform)
  const parallaxEls = reduceMotion ? [] : [...document.querySelectorAll('[data-parallax]')];
  function parallax() {
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const rect = el.parentElement.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1 aprox.
      el.style.transform = `translate3d(0, ${progress * -12}%, 0)`;
    });
  }
  // Barra inferior en móvil: visible tras el hero, oculta al llegar a contacto
  const bar = document.getElementById('mobileBar');
  const heroEl = document.getElementById('inicio');
  const contactEl = document.getElementById('contacto');
  let barShown = false;
  function updateBar() {
    if (!bar) return;
    const vh = window.innerHeight;
    const show = heroEl.getBoundingClientRect().bottom < vh * 0.4 && contactEl.getBoundingClientRect().top > vh * 0.85;
    if (show === barShown) return;
    barShown = show;
    bar.classList.toggle('is-visible', show);
    bar.setAttribute('aria-hidden', String(!show));
    bar.querySelectorAll('a').forEach(a => { a.tabIndex = show ? 0 : -1; });
  }

  onScroll();

  // Menú móvil
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) header.classList.remove('is-hidden');
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });

  // Revelado al entrar en pantalla, con escalonado entre hermanos
  const targets = document.querySelectorAll('.reveal, .reveal-img, .step');
  const groups = new Map();
  targets.forEach(el => {
    const parent = el.parentElement;
    const i = groups.get(parent) || 0;
    el.style.setProperty('--delay', `${Math.min(i, 5) * 0.09}s`);
    groups.set(parent, i + 1);
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }

  // Enlace activo en la navegación
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navIo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navIo.observe(s));
  }

  // Formulario → envío directo vía Web3Forms (la access key es pública por diseño)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const MAIL_TO = 'hola@bambuh.es';
  const WEB3FORMS_KEY = '3bd2ec9d-8da0-4c8a-b2d6-c206a8f6ea7b';
  const submitBtn = form.querySelector('.form__submit');
  const submitLabel = submitBtn.querySelector('.form__submit-label');
  const setStatus = (msg, isError = false) => {
    status.textContent = msg;
    status.classList.toggle('is-error', isError);
  };
  const setError = (input, msg) => {
    const field = input.closest('.field');
    field.classList.toggle('has-error', Boolean(msg));
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    document.getElementById(input.getAttribute('aria-describedby')).textContent = msg;
  };
  const validate = input => {
    const v = input.value.trim();
    if (input.required && !v) return setError(input, 'Este campo es obligatorio.'), false;
    if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setError(input, 'Revisa el email, parece incompleto (ej. nombre@correo.com).'), false;
    setError(input, '');
    return true;
  };
  form.querySelectorAll('[required]').forEach(i => i.addEventListener('blur', () => validate(i)));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    const required = [...form.querySelectorAll('[required]')];
    const invalid = required.filter(i => !validate(i));
    if (invalid.length) { invalid[0].focus(); return; }

    const d = Object.fromEntries(new FormData(form));
    const fecha = d.fecha ? new Date(d.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Por definir';
    const subject = `Solicitud de dossier · ${d.tipo} · ${d.nombre}`;
    const body = [
      'Hola Bambüh,',
      '',
      'Me gustaría recibir vuestro dossier. Estos son los datos de mi evento:',
      '',
      `· Nombre: ${d.nombre}`,
      `· Email: ${d.email}`,
      `· Tipo de evento: ${d.tipo}`,
      `· Fecha aproximada: ${fecha}`,
      `· Lugar: ${d.lugar || 'Por definir'}`,
      `· Invitados: ${d.invitados || 'Por definir'}`,
      '',
      d.mensaje ? d.mensaje : '',
      '',
      '¡Gracias!'
    ].join('\n');

    const mailto = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    submitBtn.disabled = true;
    submitLabel.textContent = 'Enviando…';
    setStatus('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: 'Web Bambüh',
          replyto: d.email,
          botcheck: Boolean(d.botcheck),
          message: body
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || res.statusText);
      form.reset();
      setStatus(`¡Gracias, ${d.nombre}! Hemos recibido tu solicitud y te escribiremos muy pronto a ${d.email}.`);
    } catch {
      setStatus(`No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos a ${MAIL_TO}.`, true);
      status.innerHTML = status.textContent.replace(MAIL_TO, `<a href="${mailto}">${MAIL_TO}</a>`);
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Solicitar dossier';
    }
  });
})();
