'use strict';
document.addEventListener('DOMContentLoaded', () => {
  function enhance(container = document) {
    container.querySelectorAll('input:not([type=file]), select, [contenteditable=true]').forEach(el => {
      if (el.getAttribute('aria-label') || (el.id && document.querySelector(`label[for="${el.id}"]`))) return;
      const row = el.closest('tr');
      const title = row?.querySelector('[contenteditable]')?.textContent.trim() || row?.textContent.trim().slice(0, 90) || '';
      const label = el.type === 'date' ? 'Срок этапа' : el.id.includes('_q') ? 'Количество оплаченных слотов' : el.id.includes('_p') ? 'Тариф за слот' : el.type === 'number' ? 'Значение в расчёте' : el.tagName === 'SELECT' ? 'Выбор условия' : 'Текстовое поле';
      el.setAttribute('aria-label', label + (title ? ': ' + title : el.id ? ': ' + el.id : ''));
      if (el.hasAttribute('contenteditable')) el.setAttribute('role', 'textbox');
    });
    container.querySelectorAll('div[onclick*="openPhotoModal"],g[id^="pin_zone_"]').forEach(el => {
      el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', el.querySelector('img')?.alt || el.textContent.trim() || 'Открыть зону');
      if (!el.dataset.keyboardReady) {
        el.dataset.keyboardReady = 'true';
        el.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); el.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
        });
      }
    });
    container.querySelectorAll('input[type=file].hidden').forEach(el => {
      el.classList.remove('hidden'); el.classList.add('sr-only');
      el.setAttribute('aria-label', el.parentElement.textContent.trim() || 'Импорт JSON');
    });
    container.querySelectorAll('a[target="_blank"]').forEach(el => el.rel = 'noopener noreferrer');
  }
  enhance();
  for (const id of ['interactive-map', 'stadium-spaces']) {
    const section = document.getElementById(id);
    const drawing = section && [...section.querySelectorAll('svg[viewBox]')].find(el => Number(el.getAttribute('viewBox').split(/\s+/)[2]) > 500);
    if (!drawing) continue;
    const viewport = document.createElement('div'); viewport.className = 'map-viewport'; viewport.tabIndex = 0;
    viewport.setAttribute('aria-label', 'Схема; при увеличении прокручивайте по горизонтали');
    drawing.before(viewport); viewport.append(drawing); drawing.style.maxWidth = 'none'; drawing.style.maxHeight = 'none';
    const controls = document.createElement('div'); controls.className = 'map-controls no-print';
    const label = document.createElement('span'); label.setAttribute('aria-live', 'polite');
    let zoom = 1;
    function resize() { drawing.style.width = Math.round(viewport.clientWidth * zoom) + 'px'; drawing.style.height = 'auto'; label.textContent = Math.round(zoom * 100) + '%'; }
    for (const [text, action, aria] of [['−', () => zoom = Math.max(1, zoom - .5), 'Уменьшить схему'], ['+', () => zoom = Math.min(4, zoom + .5), 'Увеличить схему'], ['Вся схема', () => zoom = 1, 'Показать всю схему']]) {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = text; button.setAttribute('aria-label', aria);
      button.addEventListener('click', () => { action(); resize(); }); controls.append(button);
    }
    controls.append(label); viewport.before(controls); resize(); window.addEventListener('resize', resize);
    if (id === 'stadium-spaces') {
      const select = document.createElement('select'); select.id = 'stadium-zone-select'; select.setAttribute('aria-label', 'Выберите зону стадиона');
      for (const [key, zone] of Object.entries(stadiumZonesData)) { const option = document.createElement('option'); option.value = key; option.textContent = zone.badge; select.append(option); }
      select.addEventListener('change', () => selectStadiumZone(Number(select.value))); controls.append(select);
    }
  }
  for (const id of ['tableBody29', 'roadmapTableBody', 'budgetTableBody']) {
    const target = document.getElementById(id);
    if (target) new MutationObserver(() => enhance(target)).observe(target, { childList: true, subtree: true });
  }
  const menuButton = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (menuButton && menu) new MutationObserver(() => menuButton.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')))).observe(menu, { attributes: true, attributeFilter: ['class'] });
  const modal = document.getElementById('photoModal');
  if (modal) {
    new MutationObserver(() => modal.setAttribute('aria-hidden', String(!modal.classList.contains('active')))).observe(modal, { attributes: true, attributeFilter: ['class'] });
    modal.addEventListener('click', event => { if (event.target === modal) closePhotoModal(); });
    modal.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...modal.querySelectorAll('button,a[href],[tabindex="0"]')];
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === modal)) { event.preventDefault(); first.focus(); }
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (modal?.classList.contains('active')) closePhotoModal();
    else if (menu && !menu.classList.contains('hidden')) { closeMobileMenu(); menuButton.focus(); }
  });
  window.addEventListener('afterprint', () => delete document.body.dataset.printScope);
});
