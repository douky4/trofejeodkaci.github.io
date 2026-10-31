document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    const list = nav.querySelector('ul'); list.id = 'main-navigation';
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'menu-toggle'; toggle.textContent = 'Menu ☰'; toggle.setAttribute('aria-controls', list.id); toggle.setAttribute('aria-expanded', 'false'); nav.prepend(toggle);
    toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(nav.classList.toggle('menu-open'))));
    nav.querySelectorAll('.dropdown').forEach((item, i) => {
      const submenu = item.querySelector('ul'); submenu.id = 'submenu-' + i;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'dropdown-toggle'; button.textContent = '⌄'; button.setAttribute('aria-label', 'Rozbalit: ' + item.querySelector('a').textContent.trim()); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', submenu.id); item.insertBefore(button, submenu);
      button.addEventListener('click', () => button.setAttribute('aria-expanded', String(item.classList.toggle('open'))));
    });
    document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; nav.querySelectorAll('.open').forEach(item => { item.classList.remove('open'); item.querySelector('button').setAttribute('aria-expanded', 'false'); }); nav.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); if (nav.contains(document.activeElement)) toggle.focus(); });
    const current = location.pathname.split('/').pop() || 'index.html'; nav.querySelectorAll('a').forEach(a => { if (a.getAttribute('href') === current) a.setAttribute('aria-current', 'page'); });
  }
  const carousel = document.querySelector('.carousel'); const images = [...document.querySelectorAll('.carousel-container > img')];
  if (carousel && images.length > 1) {
    let index = 0, timer = null, paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = value => { index = (value + images.length) % images.length; images.forEach((img, i) => { img.classList.toggle('is-active', i === index); img.classList.toggle('is-inactive', i !== index); img.setAttribute('aria-hidden', String(i !== index)); }); };
    const stop = () => { clearInterval(timer); timer = null; }; const start = () => { stop(); if (!paused && !document.hidden) timer = setInterval(() => show(index + 1), 6000); };
    ['prev', 'next'].forEach((id, i) => { const b = document.getElementById(id); if (b) { b.setAttribute('aria-label', i ? 'Další fotografie' : 'Předchozí fotografie'); b.addEventListener('click', () => { show(index + (i ? 1 : -1)); start(); }); } });
    const pause = document.createElement('button'); pause.type = 'button'; pause.className = 'carousel-pause'; const label = () => { pause.textContent = paused ? 'Spustit střídání' : 'Pozastavit'; pause.setAttribute('aria-pressed', String(paused)); }; pause.addEventListener('click', () => { paused = !paused; label(); start(); }); carousel.querySelector('.carousel-controls')?.append(pause);
    carousel.addEventListener('mouseenter', stop); carousel.addEventListener('mouseleave', start); carousel.addEventListener('focusin', stop); carousel.addEventListener('focusout', e => { if (!carousel.contains(e.relatedTarget)) start(); }); document.addEventListener('visibilitychange', () => document.hidden ? stop() : start()); label(); show(0); start();
  }
  const form = document.getElementById('contact-form'); if (!form) return;
  const status = document.createElement('p'); status.className = 'form-status'; status.setAttribute('role', 'status'); form.append(status);
  let ready = false, sending = false; try { if (window.emailjs) { window.emailjs.init('IFOtmBtku_1mu_vYD'); ready = true; } } catch (_) {}
  if (!ready) status.textContent = 'Formulář není dostupný. Napište na trofejeodkaci@seznam.cz nebo zavolejte +420 720 208 418.';
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (sending || !form.reportValidity()) return;
    if (!ready) { status.textContent = 'Odesílání není dostupné. Napište na trofejeodkaci@seznam.cz. Vyplněné údaje zůstávají zachované.'; return; }
    const button = form.querySelector('[type="submit"]'); sending = true; button.disabled = true; status.textContent = 'Odesíláme poptávku…';
    try { await window.emailjs.sendForm('service_088u03w', 'template_8c9nd5s', form); form.reset(); status.textContent = 'Děkujeme, vaše poptávka byla odeslána.'; }
    catch (_) { status.textContent = 'Poptávku se nepodařilo odeslat. Zkuste to znovu nebo napište na trofejeodkaci@seznam.cz. Vyplněné údaje zůstávají zachované.'; }
    finally { sending = false; button.disabled = false; }
  });
});
