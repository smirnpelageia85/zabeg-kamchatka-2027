(function () {
  'use strict';
  const SLOT_KEYS = ['q1', 'p1', 'q5', 'p5', 'q10', 'p10', 'q21', 'p21'];
  const snapshots = new Map();
  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  }
  function number(value, max = 1000000000) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > max) throw new Error('Недопустимое число в файле');
    return value;
  }
  function inputNumber(value, integer = false) {
    const parsed = Number(value);
    const bounded = Number.isFinite(parsed) ? Math.min(1000000000, Math.max(0, parsed)) : 0;
    return integer ? Math.floor(bounded) : bounded;
  }
  function text(value, max = 2000) {
    if (typeof value !== 'string' || value.length > max) throw new Error('Недопустимое текстовое поле в файле');
    return value;
  }
  function rows(value, validate) {
    if (!Array.isArray(value) || value.length > 500) throw new Error('Ожидается список не более 500 строк');
    const ids = new Set();
    return value.map(item => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) throw new Error('Некорректная строка');
      if (!Number.isSafeInteger(item.id) || item.id < 1 || ids.has(item.id)) throw new Error('Неверный или повторяющийся номер строки');
      ids.add(item.id);
      return validate(item);
    });
  }
  function budget(value, estimator = false) {
    return rows(value, item => {
      const result = { id: item.id };
      const strings = estimator ? ['name', 'unit', 'secName', 'source'] : ['sec', 'title', 'unit', 'src', 'note'];
      strings.forEach(key => { result[key] = text(item[key] ?? ''); });
      const numbers = estimator ? ['userQty', 'userPrice', 'agranat'] : ['qty', 'price', 'agr'];
      numbers.forEach(key => { result[key] = number(item[key], /Qty|qty/.test(key) ? 1000000 : 1000000000); });
      ['baseQty', 'basePrice'].forEach(key => { if (item[key] !== undefined) result[key] = number(item[key]); });
      if (estimator) result.sec = number(item.sec, 100);
      if ((result.qty ?? result.userQty) * (result.price ?? result.userPrice) > 1e11) throw new Error('Сумма строки превышает допустимый предел');
      return result;
    });
  }
  function roadmap(value) {
    return rows(value, item => {
      const date = text(item.date, 10);
      if (date && (!/^20\d{2}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) throw new Error('Некорректная дата');
      if (!['planned', 'in_progress', 'critical', 'done'].includes(item.status)) throw new Error('Некорректный статус');
      return { id: item.id, date, action: text(item.action), org: text(item.org), result: text(item.result), status: item.status };
    });
  }
  function slots(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Некорректная модель слотов');
    return Object.fromEntries(SLOT_KEYS.map(key => {
      const v = number(value[key], 1000000);
      if (key.startsWith('q') && !Number.isInteger(v)) throw new Error('Количество слотов должно быть целым');
      return [key, v];
    }));
  }
  function notify(message) {
    const show = () => {
      let el = document.getElementById('model-notice');
      if (!el) {
        el = document.createElement('div'); el.id = 'model-notice'; el.className = 'model-notice no-print'; el.setAttribute('role', 'alert');
        document.body.prepend(el);
      }
      el.textContent = message;
    };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show, { once: true });
  }
  function read(key, fallback, validate) {
    try {
      const raw = localStorage.getItem(key);
      snapshots.set(key, raw);
      return raw === null ? fallback() : validate(JSON.parse(raw));
    } catch (error) {
      notify('Сохранённые данные не прочитаны. Исходная запись сохранена; показаны базовые значения. ' + error.message);
      return fallback();
    }
  }
  function writeMany(entries) {
    const previous = new Map();
    try {
      for (const key of Object.keys(entries)) {
        const current = localStorage.getItem(key);
        if (snapshots.has(key) && current !== snapshots.get(key)) throw new Error('Данные изменились в другой вкладке. Экспортируйте текущую модель и обновите страницу для загрузки последних правок.');
        previous.set(key, current);
      }
      for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, JSON.stringify(value));
      for (const [key, value] of Object.entries(entries)) snapshots.set(key, JSON.stringify(value));
      return true;
    } catch (error) {
      for (const [key, value] of previous) {
        try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch { /* The persistent alert below remains visible. */ }
      }
      notify('Не удалось сохранить изменения в браузере. Выгрузите JSON перед закрытием страницы. ' + error.message);
      return false;
    }
  }
  function slotInputs(prefix) {
    return Object.fromEntries(SLOT_KEYS.map(key => {
      const el = document.getElementById(prefix + key);
      const value = Math.min(1000000, inputNumber(el?.value, key.startsWith('q')));
      if (el && Number(el.value) !== value) el.value = value;
      return [key, value];
    }));
  }
  function applySlots(prefix, values) { Object.entries(values).forEach(([key, value]) => { const el = document.getElementById(prefix + key); if (el) el.value = value; }); }
  function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kamchatka', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
  function csvCell(value) {
    const str = typeof value === 'string' && /^[\s]*[=+\-@\t\r]/.test(value) ? "'" + value : String(value ?? '');
    return '"' + str.replace(/"/g, '""') + '"';
  }
  async function readJSONFile(input) {
    const file = input.files[0];
    if (!file) return undefined;
    try {
      if (file.size > 50000000) throw new Error('Файл больше 50 МБ');
      return JSON.parse(await file.text());
    } finally { input.value = ''; }
  }
  function money(value) { return Math.round((value + Number.EPSILON) * 100) / 100; }
  function nextId(items) { let id = 1; const used = new Set(items.map(item => item.id)); while (used.has(id)) id++; return id; }
  function slotFinance(values) {
    const checked = slots(values);
    const entries = ['1', '5', '10', '21'].map(key => {
      const q = checked['q' + key], p = checked['p' + key];
      const gross = money(q * p), fee = money(gross * 0.05);
      return { key, q, p, gross, fee, net: money(gross - fee) };
    });
    const total = key => money(entries.reduce((sum, row) => sum + row[key], 0));
    return { entries, runners: total('q'), gross: total('gross'), fee: total('fee'), net: total('net') };
  }
  function rubles(value) { return value.toLocaleString('ru-RU', { maximumFractionDigits: 2 }) + ' ₽'; }
  window.ZabegCore = { escapeHTML, inputNumber, budget, roadmap, slots, notify, read, writeMany, slotInputs, applySlots, today, csvCell, readJSONFile, money, slotFinance, rubles, nextId };
})();
