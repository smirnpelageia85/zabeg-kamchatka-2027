const C = window.ZabegCore;
let persistSlots = false;

    const INITIAL_DATA = [
      // РАЗДЕЛ 1. ТРУД И СУДЕЙСТВО
      { id: 1, sec: 1, secName: "1. Труд, судейство и волонтеры", name: "Главная судейская коллегия (ГСК)", unit: "чел.", baseQty: 12, basePrice: 17500, agranat: 280000, source: "Федерация легкой атлетики Камчатского края (1-я и всерос. кат.)" },
      { id: 2, sec: 1, secName: "1. Труд, судейство и волонтеры", name: "Судьи на дистанциях, хронометраже и разворотах", unit: "чел.", baseQty: 24, basePrice: 7000, agranat: 240000, source: "Тренеры-преподаватели ДЮСШ и СШОР ПКГО" },
      { id: 3, sec: 1, secName: "1. Труд, судейство и волонтеры", name: "Координаторы волонтерского корпуса и регистрации", unit: "чел.", baseQty: 6, basePrice: 8000, agranat: 90000, source: "КГАУ «Дворец молодежи» / Волонтеры Камчатки" },
      { id: 4, sec: 1, secName: "1. Труд, судейство и волонтеры", name: "Питание, вода и экипировка судей и волонтеров", unit: "компл.", baseQty: 150, basePrice: 800, agranat: 185000, source: "Камчатский комбинат питания / Бартер ланч-боксы" },
      { id: 5, sec: 1, secName: "1. Труд, судейство и волонтеры", name: "Технический и комендантский персонал стадиона", unit: "чел.", baseQty: 8, basePrice: 8000, agranat: 120000, source: "КГАУ «ЦСП ПК» (стадион «Спартак») в рамках окладов" },

      // РАЗДЕЛ 2. ТРАССА И БЕЗОПАСНОСТЬ
      { id: 6, sec: 2, secName: "2. Трасса, безопасность и ограждения", name: "Аренда барьеров ограждения фан-барьер", unit: "пог. м", baseQty: 800, basePrice: 237.5, agranat: 380000, source: "МУП «Спецдорремстрой» ПКГО — доставка и расстановка" },
      { id: 7, sec: 2, secName: "2. Трасса, безопасность и ограждения", name: "Тяжелая техника прикрытия перекрестков (КАМАЗ/КДМ)", unit: "маш.-смена", baseQty: 14, basePrice: 0, agranat: 320000, source: "Администрация ПКГО (МУП) — безвозмездно по регламенту МВД" },
      { id: 8, sec: 2, secName: "2. Трасса, безопасность и ограждения", name: "Дорожные знаки, водоналивные блоки, конусы", unit: "компл.", baseQty: 1, basePrice: 75000, agranat: 140000, source: "Служба автомобильных дорог ПКГО — инвентарь муниципалитета" },
      { id: 9, sec: 2, secName: "2. Трасса, безопасность и ограждения", name: "Дежурство скорой помощи и реанимации (3 бригады)", unit: "бригада", baseQty: 3, basePrice: 0, agranat: 210000, source: "Минздрав Камчатского края — распоряжение Правительства края" },
      { id: 10, sec: 2, secName: "2. Трасса, безопасность и ограждения", name: "Охрана ЧОП и рамки металлодетекторов", unit: "пост", baseQty: 10, basePrice: 14000, agranat: 260000, source: "ЧОП «Камчатский щит» — контрольно-пропускной режим" },
      { id: 11, sec: 2, secName: "2. Трасса, безопасность и ограждения", name: "Механизированная уборка и клининг трассы", unit: "услуга", baseQty: 1, basePrice: 65000, agranat: 160000, source: "МУП «Благоустройство ПКГО» — до и после забега" },

      // РАЗДЕЛ 3. СЦЕНА, ЗВУК, ЭКРАНЫ
      { id: 12, sec: 3, secName: "3. Сцена, звук, экраны и фан-зона", name: "Аренда главной сцены 10×8 м с порталами", unit: "компл.", baseQty: 1, basePrice: 240000, agranat: 390000, source: "КГАУ «Камчатское концертно-филармоническое объед.»" },
      { id: 13, sec: 3, secName: "3. Сцена, звук, экраны и фан-зона", name: "Светодиодный экран 6×4 м (Р10 уличный)", unit: "компл.", baseQty: 1, basePrice: 210000, agranat: 350000, source: "ООО «КамчатМедиаСервис» — прямая аренда оборудования" },
      { id: 14, sec: 3, secName: "3. Сцена, звук, экраны и фан-зона", name: "Звуковой комплекс 25 кВт, бэклайн, радиосистемы", unit: "компл.", baseQty: 1, basePrice: 160000, agranat: 270000, source: "Камчатский театр драмы и комедии — звукоусиление" },
      { id: 15, sec: 3, secName: "3. Сцена, звук, экраны и фан-зона", name: "Ведущие мероприятия, диджей, звукорежиссер", unit: "смена", baseQty: 1, basePrice: 110000, agranat: 190000, source: "Профессиональные спортивные дикторы Камчатки" },
      { id: 16, sec: 3, secName: "3. Сцена, звук, экраны и фан-зона", name: "Выступление творческих коллективов Камчатки", unit: "программа", baseQty: 1, basePrice: 90000, agranat: 180000, source: "Камчатские вокальные и хореографические коллективы (без оркестра и барабанов)" },
      { id: 17, sec: 3, secName: "3. Сцена, звук, экраны и фан-зона", name: "Генераторное автономное электроснабжение 60 кВт", unit: "компл.", baseQty: 1, basePrice: 85000, agranat: 170000, source: "ПАО «Камчатскэнерго» (резервный дизель-генератор)" },

      // РАЗДЕЛ 4. ЭКСПО И ЛОГИСТИКА
      { id: 18, sec: 4, secName: "4. Экспо, кейтеринг и логистика", name: "Аренда павильонов и шатров Экспо (5×5 м)", unit: "шт.", baseQty: 6, basePrice: 27500, agranat: 290000, source: "ООО «Камтент» — выдача номеров в ФОК «Звёздный», штаб" },
      { id: 19, sec: 4, secName: "4. Экспо, кейтеринг и логистика", name: "Мобильные туалетные кабины с обслуживанием", unit: "шт.", baseQty: 20, basePrice: 4750, agranat: 175000, source: "МУП «ЭкоТранс ПК» — доставка, откачка, дезинфекция" },
      { id: 20, sec: 4, secName: "4. Экспо, кейтеринг и логистика", name: "Пункты гидратации: бутилированная вода 0.5л", unit: "бутылок", baseQty: 5000, basePrice: 0, agranat: 150000, source: "Партнер ЗАО «Малкинское» — Бартер предложен; соглашение не подтверждено" },
      { id: 21, sec: 4, secName: "4. Экспо, кейтеринг и логистика", name: "Полевая кухня: камчатская уха для участников", unit: "порций", baseQty: 2000, basePrice: 0, agranat: 220000, source: "Генеральный партнер АО «Океанрыбфлот»" },
      { id: 22, sec: 4, secName: "4. Экспо, кейтеринг и логистика", name: "Складская мебель, столы регистрации, стулья", unit: "компл.", baseQty: 80, basePrice: 625, agranat: 110000, source: "Складской фонд КГАУ «ЦСП ПК» — инвентарь спорта" },
      { id: 23, sec: 4, secName: "4. Экспо, кейтеринг и логистика", name: "Грузовая логистика, доставка барьеров и шатров", unit: "рейс", baseQty: 15, basePrice: 4800, agranat: 135000, source: "Транспортный цех учреждений Минспорта" },

      // РАЗДЕЛ 5. ХРОНОМЕТРАЖ И ТРАНСЛЯЦИЯ
      { id: 24, sec: 5, secName: "5. Хронометраж, трансляция и реклама", name: "Электронный чиповый хронометраж (2000 чел.)", unit: "участник", baseQty: 2000, basePrice: 130, agranat: 420048, source: "Официальный тайминг-оператор ЗаБег.РФ — дублирующий створ" },
      { id: 25, sec: 5, secName: "5. Хронометраж, трансляция и реклама", name: "ПТС и телемост с Москвой («Матч ТВ»)", unit: "смена", baseQty: 1, basePrice: 220000, agranat: 380000, source: "ГТРК «Камчатка» / Медиа-Центр — прямой телемост" },
      { id: 26, sec: 5, secName: "5. Хронометраж, трансляция и реклама", name: "Спутниковый канал связи и резервный интернет", unit: "канал", baseQty: 1, basePrice: 85000, agranat: 160000, source: "ПАО «Ростелеком» — оптический канал 1 Гбит/с" },
      { id: 27, sec: 5, secName: "5. Хронометраж, трансляция и реклама", name: "Фотостена героев с фамилиями участников (12×3 м)", unit: "шт.", baseQty: 1, basePrice: 78000, agranat: 140000, source: "Типография «КамчатПресс» — вирусный охват 150K" },
      { id: 28, sec: 5, secName: "5. Хронометраж, трансляция и реклама", name: "Стартово-финишная арка и брендинг стадиона", unit: "компл.", baseQty: 1, basePrice: 71300, agranat: 130000, source: "РПК «КамАрт» — брендинг ПАО «ПСБ» и ЗаБег.РФ" },
      { id: 29, sec: 5, secName: "5. Хронометраж, трансляция и реклама", name: "Операторская группа (4 камеры, дрон 4K)", unit: "смена", baseQty: 1, basePrice: 125000, agranat: 210000, source: "Студия «Камвидео» — видовые планы на фоне вулканов" }
    ];

    function loadEstimatorBudget() {
  return C.read('zabeg2027_estimator_budget', () => INITIAL_DATA.map(item => ({ ...item, userQty: item.baseQty, userPrice: item.basePrice })), value => C.budget(value, true));
}

    let itemsData = loadEstimatorBudget();

    function saveEstimatorBudget() {
  const saved = C.writeMany({ zabeg2027_estimator_budget: itemsData });
  if (saved) showSaveBadge('Сохранено в этом браузере');
  return saved;
}

    function showSaveBadge(message) {
  const el = document.getElementById('save_badge');
  if (el) el.textContent = message;
}

    function formatRub(value) { return C.rubles(value); }

    function renderTable() {
      const tbody = document.getElementById('budgetTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      let lastSec = 0;

      itemsData.forEach((item, idx) => {
        if (item.sec !== lastSec && item.secName) {
          lastSec = item.sec;
          const secRow = document.createElement('tr');
          secRow.className = 'bg-slate-100/90 text-slate-800 font-medium font-condensed uppercase tracking-wider text-[11px]';
          secRow.innerHTML = `<td colspan="12" class="p-2.5 pl-3 border-y border-slate-200 text-[#048bb1]">${C.escapeHTML(item.secName)}</td>`;
          tbody.appendChild(secRow);
        }

        const totalUser = C.money((item.userQty || 0) * (item.userPrice || 0));
        const agrTotal = item.agranat || 0;
        const savings = agrTotal - totalUser;
        const isCustom = !item.baseQty && item.baseQty !== 0;

        const tr = document.createElement('tr');
        tr.className = `hover:bg-slate-50/80 transition-colors border-b border-slate-100 ${isCustom ? 'bg-amber-50/20' : ''}`;

        tr.innerHTML = `
          <td class="p-2.5 text-center text-slate-400 font-condensed">${item.id}</td>
          <td class="p-2.5 font-normal text-slate-800">
            <div contenteditable="true" onblur="updateItemTitle(${idx}, this.innerText.trim())"
              class="outline-none hover:bg-slate-100 focus:bg-white rounded px-1 transition text-slate-800 cursor-text" title="Кликните для редактирования">
              ${C.escapeHTML(item.name)}
            </div>
          </td>
          <td class="p-2.5 text-center text-slate-500 font-condensed">${C.escapeHTML(item.unit || 'усл.')}</td>
          <td class="p-2.5 text-right text-slate-500 font-condensed">${item.baseQty !== undefined ? item.baseQty : '-'}</td>
          <td class="p-2.5 text-right text-slate-500 font-condensed">${item.basePrice !== undefined ? formatRub(item.basePrice) : '-'}</td>
          <td class="p-1.5 text-right w-24">
            <input type="number" step="any" min="0" value="${item.userQty}"
              oninput="updateUserVal(${idx}, 'userQty', this.value)"
              class="table-input">
          </td>
          <td class="p-1.5 text-right w-28">
            <input type="number" step="any" min="0" value="${item.userPrice}"
              oninput="updateUserVal(${idx}, 'userPrice', this.value)"
              class="table-input">
          </td>
          <td class="p-2.5 text-right font-medium font-condensed text-slate-900 bg-slate-50/50" id="row_tot_${idx}">
            ${formatRub(totalUser)}
          </td>
          <td class="p-2.5 text-right text-slate-500 font-condensed">${formatRub(agrTotal)}</td>
          <td class="p-2.5 text-right font-condensed font-medium ${savings >= 0 ? 'text-emerald-700' : 'text-rose-700'}" id="row_sav_${idx}">
            ${savings >= 0 ? '-' + formatRub(savings) : '+' + formatRub(Math.abs(savings))}
          </td>
          <td class="p-2.5 text-[11px] text-slate-600 max-w-xs truncate" title="${C.escapeHTML(item.source || '')}">
            ${C.escapeHTML(item.source || 'Прямой договор')}
          </td>
          <td class="p-2.5 text-center no-print">
            <button onclick="deleteRow(${idx})" class="p-1 text-slate-400 hover:text-rose-600 transition" title="Удалить строку">
              <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      calculateTotals();
    }

    function updateUserVal(index, key, value) {
  if (!itemsData[index] || !['userQty', 'userPrice'].includes(key)) return;
  if (document.activeElement?.tagName === 'INPUT' && Number(value) !== C.inputNumber(value)) document.activeElement.value = String(C.inputNumber(value));
  try {
    itemsData = C.budget(itemsData.map((item, idx) => idx === index ? { ...item, [key]: C.inputNumber(value) } : item), true);
    saveEstimatorBudget();
    const item = itemsData[index], total = C.money(item.userQty * item.userPrice);
    document.getElementById('row_tot_' + index).textContent = C.rubles(total);
    document.getElementById('row_sav_' + index).textContent = C.rubles(item.agranat - total);
    calculateTotals();
  } catch (error) { renderTable(); C.notify('Правка отклонена: ' + error.message); }
}

    function updateItemTitle(index, value) {
  if (!itemsData[index]) return;
  try {
    itemsData = C.budget(itemsData.map((item, idx) => idx === index ? { ...item, name: value } : item), true);
    saveEstimatorBudget();
  } catch (error) { renderTable(); C.notify('Правка отклонена: ' + error.message); }
}

    function addCustomRow() {
      if (itemsData.length >= 500) { C.notify('Достигнут предел 500 строк'); return; }
      const newId = C.nextId(itemsData);
      const newRow = {
        id: newId,
        sec: 4,
        secName: "4. Экспо, кейтеринг и логистика",
        name: "Новая статья расходов (кликните для изменения)",
        unit: "компл.",
        baseQty: 1,
        basePrice: 15000,
        userQty: 1,
        userPrice: 15000,
        agranat: 25000,
        source: "Прямой договор / Региональный поставщик"
      };

      itemsData.push(newRow);
      saveEstimatorBudget();
      renderTable();
      showSaveBadge(`Строка № ${newId} добавлена`);
    }

    function deleteRow(idx) {
      if (confirm(`Удалить строку № ${itemsData[idx].id} («${itemsData[idx].name}»)?`)) {
        itemsData.splice(idx, 1);
        saveEstimatorBudget();
        renderTable();
        showSaveBadge('Строка удалена');
      }
    }

    function saveEstimatorManual() {
  if (saveEstimatorBudget()) alert('Смета сохранена в этом браузере. Для передачи расчёта скачайте Excel.');
}

    function calculateTotals() {
      let directSum = 0;
      let agranatSum = 0;

      itemsData.forEach(item => {
        directSum += C.money((item.userQty || 0) * (item.userPrice || 0));
        agranatSum += (item.agranat || 0);
      });

      const reserve15 = C.money(directSum * 0.15);
      const totalWithRes = directSum + reserve15;
      const savings = agranatSum - totalWithRes;
      const savingsPct = agranatSum > 0 ? ((savings / agranatSum) * 100).toFixed(1) : "0.0";

      document.getElementById('kpiDirect').innerText = formatRub(directSum);
      document.getElementById('kpiReserve').innerText = formatRub(reserve15);
      document.getElementById('kpiTotalWithRes').innerText = formatRub(totalWithRes);
      document.getElementById('kpiAgranat').innerText = formatRub(agranatSum);
      document.getElementById('kpiSavings').innerText = (savings >= 0 ? '' : '+') + formatRub(savings);
      document.getElementById('kpiSavingsPct').innerText = `${savingsPct}% разницы сценариев`;

      updateSlotModel();
    }

    function setScenario(scen) {
      ['btn_minsport_2000', 'btn_minsport_1200', 'btn_agranat', 'btn_econom'].forEach(b => {
        const el = document.getElementById(b);
        if (el) el.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition';
      });
      const activeBtn = document.getElementById(`btn_${scen}`);
      if (activeBtn) activeBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-[#1caed7] text-white shadow transition';

      if (scen === 'minsport_2000') {
        itemsData = JSON.parse(JSON.stringify(INITIAL_DATA));
        itemsData.forEach(item => {
          item.userQty = item.baseQty;
          item.userPrice = item.basePrice;
        });
      } else if (scen === 'minsport_1200') {
        itemsData = JSON.parse(JSON.stringify(INITIAL_DATA));
        itemsData.forEach(item => {
          item.userQty = item.id === 4 ? 100 : item.id === 24 ? 1200 : item.baseQty;
          item.userPrice = item.basePrice;
        });
      } else if (scen === 'agranat') {
        itemsData = JSON.parse(JSON.stringify(INITIAL_DATA));
        itemsData.forEach(item => {
          item.userQty = 1;
          item.userPrice = item.agranat;
        });
      } else if (scen === 'econom') {
        itemsData = JSON.parse(JSON.stringify(INITIAL_DATA));
        itemsData.forEach(item => {
          item.userQty = Math.round(item.baseQty * 0.85) || 1;
          item.userPrice = Math.round(item.basePrice * 0.75);
        });
      }

      saveEstimatorBudget();
      renderTable();
    }

    function resetDefaults() {
  if (!confirm('Восстановить базовую смету и все количества и тарифы слотов?')) return;
  C.applySlots('slot_', { q1: 500, p1: 1500, q5: 800, p5: 2000, q10: 450, p10: 2500, q21: 250, p21: 3500 });
  setScenario('minsport_2000');
  setSlotTariffPreset('start');
}

    // ЛОГИКА СЛОТОВ
    function setSlotTariffPreset(preset) {
      ['btn_slot_start', 'btn_slot_mid', 'btn_slot_final'].forEach(b => {
        const el = document.getElementById(b);
        if (el) el.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition';
      });
      const act = document.getElementById(`btn_slot_${preset}`);
      if (act) act.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-[#1caed7] text-white shadow transition';

      if (preset === 'start') {
        document.getElementById('slot_p1').value = 1500;
        document.getElementById('slot_p5').value = 2000;
        document.getElementById('slot_p10').value = 2500;
        document.getElementById('slot_p21').value = 3500;
      } else if (preset === 'mid') {
        document.getElementById('slot_p1').value = 1750;
        document.getElementById('slot_p5').value = 2250;
        document.getElementById('slot_p10').value = 2750;
        document.getElementById('slot_p21').value = 3750;
      } else if (preset === 'final') {
        document.getElementById('slot_p1').value = 2000;
        document.getElementById('slot_p5').value = 2500;
        document.getElementById('slot_p10').value = 3000;
        document.getElementById('slot_p21').value = 4000;
      }
      updateSlotModel(true);
    }

    function updateSlotModel(save = false) {
  const values = C.slotInputs('slot_');
  const model = C.slotFinance(values);
  for (const row of model.entries) {
    const el = document.getElementById('slot_net' + row.key);
    if (el) el.textContent = C.rubles(row.net);
  }
  document.getElementById('slots_total_runners').textContent = model.runners.toLocaleString('ru-RU') + ' чел.';
  document.getElementById('slots_total_gross').textContent = C.rubles(model.gross);
  document.getElementById('slots_total_net').textContent = C.rubles(model.net);
  const direct = itemsData.reduce((sum, row) => sum + C.money(row.userQty * row.userPrice), 0);
  const budget = C.money(direct + C.money(direct * 0.15));
  const surplus = C.money(model.net - budget);
  const el = document.getElementById('slots_surplus');
  el.textContent = (surplus >= 0 ? '+' : '') + C.rubles(surplus);
  el.className = 'text-lg font-medium font-condensed ' + (surplus >= 0 ? 'text-sky-400' : 'text-rose-400');
  if (save && persistSlots) C.writeMany({ zabeg2027_estimator_slots: values });
}

    function loadSavedSlots() {
  const slots = C.read('zabeg2027_estimator_slots', () => C.slotInputs('slot_'), C.slots);
  C.applySlots('slot_', slots);
}

    function downloadExcelFile() {
      if (typeof XLSX === 'undefined') {
        alert('Библиотека Excel загружается, повторите попытку через секунду...');
        return;
      }

      const rowsBudget = [
        ["№", "Раздел сметы", "Наименование статьи расходов", "Ед. изм.", "Базовое кол-во", "Базовая цена, ₽", "Ваше кол-во", "Ваша цена, ₽", "Итого по вашей цене, ₽", "Смета Агранат, ₽", "Разница, ₽", "Поставщик / Обоснование"]
      ];

      let totalDirect = 0;
      let totalAgranat = 0;

      itemsData.forEach(item => {
        const itemTot = C.money((item.userQty || 0) * (item.userPrice || 0));
        const itemSav = (item.agranat || 0) - itemTot;
        totalDirect += itemTot;
        totalAgranat += (item.agranat || 0);

        rowsBudget.push([
          item.id,
          item.secName,
          item.name,
          item.unit,
          item.baseQty,
          item.basePrice,
          item.userQty,
          item.userPrice,
          itemTot,
          item.agranat,
          itemSav,
          item.source
        ]);
      });

      const res15 = C.money(totalDirect * 0.15);
      const totalBudget = totalDirect + res15;
      const totalSavings = totalAgranat - totalBudget;

      rowsBudget.push([]);
      rowsBudget.push(["", "", "ПРЯМЫЕ РАСХОДЫ ИТОГО", "", "", "", "", "", totalDirect, totalAgranat, totalAgranat - totalDirect, "Сумма статей"]);
      rowsBudget.push(["", "", "НЕПРЕДВИДЕННЫЙ И ПОГОДНЫЙ РЕЗЕРВ (15%)", "", "", "", "", "", res15, 0, -res15, "Резерв на форс-мажор"]);
      rowsBudget.push(["", "", "ЦЕЛЕВОЙ БЮДЖЕТ С РЕЗЕРВОМ 15% (ИТОГО)", "", "", "", "", "", totalBudget, totalAgranat, totalSavings, "ИТОГОВЫЙ ОРИЕНТИР"]);
      rowsBudget.push(["", "", "РАЗНИЦА С БАЗОЙ СРАВНЕНИЯ", "", "", "", "", "", totalSavings, "", (totalAgranat ? ((totalSavings/totalAgranat)*100).toFixed(1) : "0.0") + "%", "Прямое сбережение средств"]);

      const wb = XLSX.utils.book_new();
      const wsBudget = XLSX.utils.aoa_to_sheet(rowsBudget);
      XLSX.utils.book_append_sheet(wb, wsBudget, "Смета 29 статей");

      // Лист 2: Выручка от слотов
      const q1 = parseFloat(document.getElementById('slot_q1')?.value) || 0;
      const p1 = parseFloat(document.getElementById('slot_p1')?.value) || 0;
      const q5 = parseFloat(document.getElementById('slot_q5')?.value) || 0;
      const p5 = parseFloat(document.getElementById('slot_p5')?.value) || 0;
      const q10 = parseFloat(document.getElementById('slot_q10')?.value) || 0;
      const p10 = parseFloat(document.getElementById('slot_p10')?.value) || 0;
      const q21 = parseFloat(document.getElementById('slot_q21')?.value) || 0;
      const p21 = parseFloat(document.getElementById('slot_p21')?.value) || 0;

      const model = C.slotFinance(C.slotInputs('slot_'));
      const rowsSlots = [['Дистанция', 'Оплаченных слотов', 'Тариф', 'Валовая выручка', 'Комиссия 5%', 'Чистая выручка'],
        ...model.entries.map(row => [row.key === '21' ? '21,1 км' : row.key + ' км', row.q, row.p, row.gross, row.fee, row.net]),
        ['ИТОГО', model.runners, '', model.gross, model.fee, model.net],
        ['БЮДЖЕТ С РЕЗЕРВОМ', '', '', totalBudget],
        ['БАЛАНС СЦЕНАРИЯ', '', '', C.money(model.net - totalBudget)],
        ['Допущения', 'Получатель дохода, тарифы и комиссия требуют согласования. Комиссия округляется до копеек по каждой дистанции.']];

      const wsSlots = XLSX.utils.aoa_to_sheet(rowsSlots);
      XLSX.utils.book_append_sheet(wb, wsSlots, "Выручка от слотов 2000");

      XLSX.writeFile(wb, "Смета_и_Выручка_ЗаБегРФ_Камчатка_2027.xlsx");
    }

    // Инициализация при загрузке
    window.addEventListener('DOMContentLoaded', () => {
      loadSavedSlots();
      renderTable();
      updateSlotModel();
      persistSlots = true;
    });
