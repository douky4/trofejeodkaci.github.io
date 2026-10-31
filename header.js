document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('header nav');
  if (!nav) return;
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
  const close = item => { item.classList.remove('open'); item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false'); };
  nav.querySelectorAll('.dropdown').forEach((item, index) => {
    const submenu = item.querySelector('.dropdown-menu');
    if (!submenu) return;
    submenu.id = 'site-submenu-' + index;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'submenu-toggle'; button.textContent = '⌄';
    button.setAttribute('aria-label', 'Podnabídka: ' + item.querySelector('a').textContent.trim());
    button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', submenu.id);
    item.insertBefore(button, submenu);
    button.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      nav.querySelectorAll('.dropdown.open').forEach(close);
      item.classList.toggle('open', open); button.setAttribute('aria-expanded', String(open));
    });
  });
  const dismiss = () => {
    nav.querySelectorAll('.dropdown.open').forEach(close);
    nav.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false');
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.contains(document.activeElement)) {
      const parent = document.activeElement.closest('.dropdown.open');
      if (parent) { close(parent); parent.querySelector('.submenu-toggle').focus(); }
      else { dismiss(); if (matchMedia('(max-width: 1100px)').matches) toggle.focus(); }
    }
  });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) dismiss(); });
  matchMedia('(min-width: 1101px)').addEventListener('change', dismiss);
});
