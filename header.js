document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('header nav');
  if (!nav) return;
  nav.querySelectorAll('.submenu-toggle').forEach(button => button.remove());
  const list = nav.querySelector('ul');
  if (!list) return;
  list.id = 'site-navigation';
  nav.setAttribute('aria-label', 'Hlavní navigace');
  const toggle = document.createElement('button');
  toggle.type = 'button'; toggle.className = 'nav-toggle';
  toggle.innerHTML = '<span aria-hidden="true">☰</span> Menu';
  toggle.setAttribute('aria-controls', list.id); toggle.setAttribute('aria-expanded', 'false');
  nav.prepend(toggle); nav.classList.add('nav-ready');
  toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(nav.classList.toggle('menu-open'))));
  const dismiss = () => {
    nav.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false');
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.contains(document.activeElement)) {
      if (matchMedia('(max-width: 1100px)').matches) { dismiss(); toggle.focus(); }
      else {
        const parent = document.activeElement.closest('.dropdown');
        if (parent) {
          parent.classList.add('submenu-dismissed');
          parent.querySelector('a').focus();
        }
      }
    }
  });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) dismiss(); });
  matchMedia('(min-width: 1101px)').addEventListener('change', dismiss);
  nav.querySelectorAll('.dropdown').forEach(item => {
    item.addEventListener('mouseenter', () => item.classList.remove('submenu-dismissed'));
    item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) item.classList.remove('submenu-dismissed'); });
  });
});
