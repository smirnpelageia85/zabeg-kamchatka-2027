const C = window.ZabegCore;
let persistSlots = false;

    // 29 СТАТЕЙ СМЕТЫ
    const rawItems29 = [
      // 1. Оплата труда и судейство
      { id: 1, sec: "1. Труд и судейство", title: "Главная судейская коллегия (ГСК)", unit: "чел.", baseQty: 12, basePrice: 17500, agr: 280000, src: "Федерация легкой атлетики Камчатского края", note: "1-я и всероссийская категория" },
      { id: 2, sec: "1. Труд и судейство", title: "Судьи на дистанциях и разворотах", unit: "чел.", baseQty: 24, basePrice: 7000, agr: 240000, src: "Тренеры-преподаватели ДЮСШ и СШОР ПКГО", note: "Работа на трассе 22 мая 2027 г." },
      { id: 3, sec: "1. Труд и судейство", title: "Координаторы волонтерского корпуса", unit: "чел.", baseQty: 6, basePrice: 8000, agr: 90000, src: "КГАУ «Дворец молодежи» / Волонтеры Камчатки", note: "Координация 120 волонтеров" },
      { id: 4, sec: "1. Труд и судейство", title: "Питание и экипировка волонтеров/судей", unit: "компл.", baseQty: 150, basePrice: 800, agr: 185000, src: "Камчатский комбинат питания / Бартер", note: "Ланч-боксы, горячий чай, накидки" },
      { id: 5, sec: "1. Труд и судейство", title: "Технический и комендантский персонал", unit: "чел.", baseQty: 8, basePrice: 8000, agr: 120000, src: "КГАУ «ЦСП ПК» (стадион «Спартак»)", note: "В рамках должностных окладов" },

      // 2. Трасса и безопасность
      { id: 6, sec: "2. Трасса и безопасность", title: "Аренда барьеров ограждения фан-барьер", unit: "пог. м", baseQty: 800, basePrice: 237.5, agr: 380000, src: "МУП «Спецдорремстрой» ПКГО", note: "Доставка, расстановка и сбор" },
      { id: 7, sec: "2. Трасса и безопасность", title: "Тяжелая техника прикрытия перекрестков", unit: "маш.-смена", baseQty: 14, basePrice: 0, agr: 320000, src: "Администрация ПКГО (МУП)", note: "Нулевая цена — допущение; требуется письменное подтверждение" },
      { id: 8, sec: "2. Трасса и безопасность", title: "Дорожные знаки, водоналивные блоки", unit: "компл.", baseQty: 1, basePrice: 75000, agr: 140000, src: "Служба автомобильных дорог ПКГО", note: "Использование инвентаря муниципалитета" },
      { id: 9, sec: "2. Трасса и безопасность", title: "Дежурство скорой помощи и реанимации", unit: "бригада", baseQty: 3, basePrice: 0, agr: 210000, src: "Минздрав Камчатского края", note: "Требуется подтверждение предоставления и оплаты" },
      { id: 10, sec: "2. Трасса и безопасность", title: "Охрана ЧОП и рамки металлодетекторов", unit: "пост", baseQty: 10, basePrice: 14000, agr: 260000, src: "ЧОП «Камчатский щит»", note: "Контрольно-пропускной режим чаши" },
      { id: 11, sec: "2. Трасса и безопасность", title: "Механизированная уборка трассы", unit: "услуга", baseQty: 1, basePrice: 65000, agr: 160000, src: "МУП «Благоустройство ПКГО»", note: "До и после забега" },

      // 3. Сцена и фан-зона
      { id: 12, sec: "3. Сцена и фан-зона", title: "Аренда главной сцены 10×8 м с порталами", unit: "компл.", baseQty: 1, basePrice: 240000, agr: 390000, src: "КГАУ «Камчатское концертно-филармоническое объед.»", note: "Стационарная сцена стадиона «Спартак»" },
      { id: 13, sec: "3. Сцена и фан-зона", title: "Светодиодный экран 6×4 м (Р10)", unit: "компл.", baseQty: 1, basePrice: 210000, agr: 350000, src: "ООО «КамчатМедиаСервис»", note: "Прямая аренда у оператора" },
      { id: 14, sec: "3. Сцена и фан-зона", title: "Звуковой комплекс 25 кВт, бэклайн", unit: "компл.", baseQty: 1, basePrice: 160000, agr: 270000, src: "Камчатский театр драмы и комедии", note: "Звукоусиление чаши стадиона" },
      { id: 15, sec: "3. Сцена и фан-зона", title: "Ведущие мероприятия, диджей", unit: "смена", baseQty: 1, basePrice: 110000, agr: 190000, src: "Профессиональные спортивные дикторы ПК", note: "Утренние старты и телемост" },
      { id: 16, sec: "3. Сцена и фан-зона", title: "Выступление творческих коллективов Камчатки", unit: "программа", baseQty: 1, basePrice: 90000, agr: 180000, src: "Камчатские вокальные и хореографические коллективы", note: "Праздничная культурная программа (без оркестра и барабанов)" },
      { id: 17, sec: "3. Сцена и фан-зона", title: "Генераторное автономное электроснабжение", unit: "компл.", baseQty: 1, basePrice: 85000, agr: 170000, src: "ПАО «Камчатскэнерго» (резерв)", note: "Дизель-генератор 60 кВт" },

      // 4. Экспо и логистика
      { id: 18, sec: "4. Экспо и логистика", title: "Аренда павильонов и шатров Экспо (5×5 м)", unit: "шт.", baseQty: 6, basePrice: 27500, agr: 290000, src: "ООО «Камтент»", note: "Выдача номеров, раздевалки, штаб" },
      { id: 19, sec: "4. Экспо и логистика", title: "Мобильные туалетные кабины с обслуживанием", unit: "шт.", baseQty: 20, basePrice: 4750, agr: 175000, src: "МУП «ЭкоТранс ПК»", note: "Установка, 2-кратная санитарная откачка" },
      { id: 20, sec: "4. Экспо и логистика", title: "Пункты гидратации: бутилированная вода 0.5л", unit: "бутылок", baseQty: 5000, basePrice: 0, agr: 150000, src: "Партнер ЗАО «Малкинское»", note: "Бартер предложен; соглашение не подтверждено" },
      { id: 21, sec: "4. Экспо и логистика", title: "Полевая кухня: камчатская уха", unit: "порций", baseQty: 2000, basePrice: 0, agr: 220000, src: "Генеральный партнер АО «Океанрыбфлот»", note: "Предложение партнёру; требуется подтверждение" },
      { id: 22, sec: "4. Экспо и логистика", title: "Складская мебель, столы регистрации, стулья", unit: "компл.", baseQty: 80, basePrice: 625, agr: 110000, src: "Складской фонд КГАУ «ЦСП ПК»", note: "Инвентарь подведомственных учреждений" },
      { id: 23, sec: "4. Экспо и логистика", title: "Грузовая логистика, доставка оборудования", unit: "рейс", baseQty: 15, basePrice: 4800, agr: 135000, src: "Транспортный цех Минспорта ПК", note: "Топливо и оплата водителей" },

      // 5. Хронометраж и трансляция
      { id: 24, sec: "5. Хронометраж и трансляция", title: "Электронный чиповый хронометраж", unit: "участник", baseQty: 2000, basePrice: 130, agr: 420048, src: "Официальный тайминг-оператор ЗаБег.РФ", note: "Дублирующие створы, онлайн-протокол" },
      { id: 25, sec: "5. Хронометраж и трансляция", title: "ПТС и телемост с Москвой («Матч ТВ»)", unit: "смена", baseQty: 1, basePrice: 220000, agr: 380000, src: "ГТРК «Камчатка» / Медиа-Центр", note: "Прямой телемост на 11 часовых поясов" },
      { id: 26, sec: "5. Хронометраж и трансляция", title: "Спутниковый канал связи и интернет", unit: "канал", baseQty: 1, basePrice: 85000, agr: 160000, src: "ПАО «Ростелеком»", note: "Гарантированный канал 1 Гбит/с" },
      { id: 27, sec: "5. Хронометраж и трансляция", title: "Фотостена героев с фамилиями участников", unit: "шт.", baseQty: 1, basePrice: 78000, agr: 140000, src: "Типография «КамчатПресс»", note: "Баннер 12×3 м, 150K просмотров" },
      { id: 28, sec: "5. Хронометраж и трансляция", title: "Стартово-финишная арка и брендинг стадиона", unit: "компл.", baseQty: 1, basePrice: 71300, agr: 130000, src: "РПК «КамАрт»", note: "Брендинг ПАО «ПСБ Банк» и ЗаБег.РФ" },
      { id: 29, sec: "5. Хронометраж и трансляция", title: "Операторская группа (4 камеры, дрон 4K)", unit: "смена", baseQty: 1, basePrice: 125000, agr: 210000, src: "Студия «Камвидео»", note: "Видовые планы на фоне вулканов" }
    ];

    // Инициализация сметы с поддержкой LocalStorage
    function loadBudgetFromStorage() {
  return C.read('zabeg2027_budget29', () => rawItems29.map(item => ({ ...item, qty: item.baseQty, price: item.basePrice })), value => C.budget(value));
}

    let currentItems = loadBudgetFromStorage();

    // СПИСОК 26 СПОНСОРОВ
    const sponsorsData = [
      { id: 1, name: "ПАО «Промсвязьбанк» (ПСБ)", cat: "Финансы и банкинг", pkg: "Титульный спонсор 5 км", sum: "850 000 ₽", contact: "Управляющий Камчатским ДО", status: "Потенциальный партнёр; требуется согласование" },
      { id: 2, name: "АО «Океанрыбфлот»", cat: "Рыбопромышленность", pkg: "Генеральный партнер «Флагманы» (10 км)", sum: "750 000 ₽", contact: "Генеральный директор / PR", status: "Ключевые переговоры" },
      { id: 3, name: "ПАО «Камчатскэнерго»", cat: "Энергетика", pkg: "Корпоративный кубок (30 слотов)", sum: "500 000 ₽", contact: "Директор по связям с общественностью", status: "В обработке" },
      { id: 4, name: "АО «Золото Камчатки»", cat: "Горнодобыча / Недра", pkg: "Эко-Партнер «Чистая Камчатка»", sum: "300 000 ₽", contact: "Дирекция устойчивого развития", status: "В обработке" },
      { id: 5, name: "ЗАО «Малкинское»", cat: "Пищевая промышленность", pkg: "Продуктовое партнерство (Вода)", sum: "400 000 ₽ (бартер)", contact: "Отдел маркетинга и сбыта", status: "Предложение: 5 000 бутылок по 0,5 л" },
      { id: 6, name: "Рыболовецкий колхоз им. Ленина", cat: "Рыбопромышленность", pkg: "Генеральный партнер (Уха)", sum: "450 000 ₽", contact: "Председатель правления", status: "Ключевые переговоры" },
      { id: 7, name: "ПАО «Ростелеком»", cat: "Телеком и IT", pkg: "Цифровой партнер и фотосервис", sum: "300 000 ₽", contact: "Директор филиала в Камчатском крае", status: "Техническое согласование" },
      { id: 8, name: "Спа-отель «Лагуна» (Паратунка)", cat: "Туризм и рекреация", pkg: "Партнер восстановления «Паратунка»", sum: "250 000 ₽", contact: "Управляющий комплексом", status: "В обработке" },
      { id: 9, name: "АО «Акрос»", cat: "Рыбопромышленность", pkg: "Корпоративный кубок", sum: "350 000 ₽", contact: "Зам. гендиректора по кадрам", status: "Первичный контакт" },
      { id: 10, name: "Тымлатский рыбокомбинат", cat: "Рыбопромышленность", pkg: "Продуктовый партнер (Омега-3)", sum: "350 000 ₽", contact: "Коммерческий отдел", status: "В обработке" },
      { id: 11, name: "АО «Камчатское авиапредприятие»", cat: "Транспорт и логистика", pkg: "Спортивный туризм", sum: "300 000 ₽", contact: "Коммерческий директор", status: "В обработке" },
      { id: 12, name: "Авиакомпания «Витязь-Аэро»", cat: "Туризм и авиация", pkg: "Спортивный туризм (Вертолеты)", sum: "450 000 ₽", contact: "Руководитель службы маркетинга", status: "Ключевые переговоры" },
      { id: 13, name: "ООО «Агротек»", cat: "Пищевая отрасль", pkg: "Продуктовое партнерство (Питание)", sum: "300 000 ₽", contact: "Директор по маркетингу", status: "В обработке" },
      { id: 14, name: "АО «Южные электрические сети»", cat: "Энергетика", pkg: "Корпоративный кубок", sum: "250 000 ₽", contact: "Профсоюзный комитет", status: "В обработке" },
      { id: 15, name: "ООО «Устой-М»", cat: "Дорожное строительство", pkg: "Партнер инфраструктуры трассы", sum: "400 000 ₽", contact: "Генеральный директор", status: "Первичный контакт" },
      { id: 16, name: "АО «Елизовский молокозавод»", cat: "Пищевая промышленность", pkg: "Детский забег 1 км", sum: "250 000 ₽", contact: "Отдел сбыта и рекламы", status: "В обработке" },
      { id: 17, name: "ПАО «МТС»", cat: "Телеком", pkg: "Цифровой партнер (СМС и Wi-Fi)", sum: "250 000 ₽", contact: "Руководитель корпоративного блока", status: "В обработке" },
      { id: 18, name: "АО «Корякэнерго»", cat: "Энергетика", pkg: "Корпоративный кубок", sum: "250 000 ₽", contact: "Управление делами", status: "В обработке" },
      { id: 19, name: "ООО «Шаде»", cat: "Ритейл / Торговля", pkg: "Продуктовый партнер", sum: "200 000 ₽", contact: "Коммерческая дирекция", status: "В обработке" },
      { id: 20, name: "Холдинг «Новая книга»", cat: "Культура и медиа", pkg: "Партнер детского забега 1 км", sum: "150 000 ₽", contact: "Генеральный директор", status: "В обработке" },
      { id: 21, name: "ООО «Камчаттралфлот»", cat: "Рыбопромышленность", pkg: "Корпоративный кубок", sum: "350 000 ₽", contact: "Служба персонала", status: "Первичный контакт" },
      { id: 22, name: "ПАО «Сбербанк» (Камчатское отд.)", cat: "Банкинг", pkg: "Партнер семейного спорта", sum: "500 000 ₽", contact: "Управление корпоративных клиентов", status: "В обработке" },
      { id: 23, name: "ТК «Шамса»", cat: "Ритейл и торговля", pkg: "Продуктовый партнер", sum: "350 000 ₽", contact: "Совет директоров / PR", status: "Ключевые переговоры" },
      { id: 24, name: "РПК «Дельта»", cat: "Рыбопромышленность", pkg: "Корпоративный кубок", sum: "250 000 ₽", contact: "Руководство компании", status: "В обработке" },
      { id: 25, name: "ООО «Поллукс»", cat: "Рыбопромышленность", pkg: "Партнер дистанции 10 км", sum: "300 000 ₽", contact: "Дирекция флота", status: "В обработке" },
      { id: 26, name: "База отдыха «Фламинго»", cat: "Туризм и Паратунка", pkg: "Партнер восстановления", sum: "150 000 ₽", contact: "Администрация базы отдыха", status: "В обработке" }
    ];

    sponsorsData.forEach(item => { item.status = "Кандидат; требуется подтверждение"; item.sum = "По индивидуальному предложению"; });
    // ФОТО-МОДАЛ (LIGHTBOX)
    function openPhotoModal(src, title, desc) {
  const modal = document.getElementById('photoModal');
  window.photoPreviousFocus = document.activeElement;
  document.getElementById('modalImg').src = src;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent = desc;
  modal.classList.add('active');
  modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-labelledby', 'modalTitle');
  modal.tabIndex = -1; modal.focus();
  document.body.style.overflow = 'hidden';
}

    function closePhotoModal() {
  document.getElementById('photoModal').classList.remove('active');
  document.body.style.overflow = '';
  window.photoPreviousFocus?.focus();
}

    // ПЕРЕКЛЮЧЕНИЕ СЛОЕВ КАРТЫ
    function toggleMapLayer(layer) {
      document.querySelectorAll('[id^="btnLayer"]').forEach(button => button.setAttribute('aria-pressed', String(button.id === (layer === 'all' ? 'btnLayerAll' : 'btnLayer' + layer))));
      const routes = ['route1km', 'route5km', 'route10km', 'route21km'];
      const btns = ['btnLayerAll', 'btnLayer1km', 'btnLayer5km', 'btnLayer10km', 'btnLayer21km'];

      btns.forEach(b => {
        const el = document.getElementById(b);
        if (el) {
          el.classList.remove('bg-white', 'shadow-sm', 'font-medium', 'ring-2', 'ring-[#1caed7]');
          el.classList.add('font-light');
        }
      });

      if (layer === 'all') {
        routes.forEach(r => {
          const el = document.getElementById(r);
          if (el) {
            el.style.opacity = '1';
            el.style.strokeWidth = r === 'route5km' ? '4.5' : (r === 'route1km' ? '4' : '3');
            el.style.filter = 'none';
          }
        });
        const b = document.getElementById('btnLayerAll');
        if (b) {
          b.classList.add('bg-white', 'shadow-sm', 'font-medium');
          b.classList.remove('font-light');
        }
      } else {
        routes.forEach(r => {
          const el = document.getElementById(r);
          if (el) {
            el.style.opacity = '0.12';
            el.style.filter = 'none';
          }
        });
        const target = document.getElementById('route' + layer);
        if (target) {
          target.style.opacity = '1';
          target.style.strokeWidth = '6';
          target.style.filter = 'drop-shadow(0 0 6px rgba(0, 159, 227, 0.9))';
        }
        const b = document.getElementById('btnLayer' + layer);
        if (b) {
          b.classList.add('bg-white', 'shadow-sm', 'font-medium', 'ring-2', 'ring-[#1caed7]');
          b.classList.remove('font-light');
        }
      }
    }

    // ВЫБОР ПАКЕТА ИЗ СЕТКИ КАРТОЧЕК
    function selectPackageInCalc(idx) {
      const select = document.getElementById('kpBasePackage');
      if (select && select.options[idx - 1]) {
        select.selectedIndex = idx - 1;
        updateSponsorCalc();
        const calcSection = document.getElementById('sponsor-calculator');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    // РАСЧЕТ И ОБНОВЛЕНИЕ КП
    function updateSponsorCalc() {
      const baseSelect = document.getElementById('kpBasePackage');
      const baseAmount = document.getElementById('kpBaseAmount');
      if (baseAmount.dataset.package !== String(baseSelect.selectedIndex)) {
        baseAmount.value = Number(baseSelect.value) > 0 ? baseSelect.value : '';
        baseAmount.dataset.package = String(baseSelect.selectedIndex);
      }
      const baseVal = C.money(C.inputNumber(baseAmount.value));
      if (baseAmount.value !== '' && Number(baseAmount.value) !== baseVal) baseAmount.value = String(baseVal);
      const sourceTerms = baseSelect.options[baseSelect.selectedIndex].getAttribute('data-terms');
      const pkgName = baseSelect.options[baseSelect.selectedIndex].getAttribute('data-name');

      let addonsVal = 0;
      let selectedAddons = [];

      const opts = [
        { id: 'optPhotowall', name: 'Логотип на легендарной Фотостене героев', price: 80000 },
        { id: 'optFlags', name: 'Флаговая линия стадиона «Спартак» (20 флагов)', price: 60000 },
        { id: 'optVideo', name: 'Трансляция промо-ролика на экране 6×4 м (20 раз)', price: 70000 },
        { id: 'optTent', name: 'Эксклюзивный шатер 5×5 м в VIP-городке', price: 90000 }
      ];

      opts.forEach(o => {
        const chk = document.getElementById(o.id);
        if (chk && chk.checked) {
          addonsVal += o.price;
          selectedAddons.push(o.name + ' (' + o.price.toLocaleString('ru-RU') + ' ₽)');
        }
      });

      const discSelect = document.getElementById('kpDiscount');
      const discPercent = parseInt(discSelect.value, 10);

      const subtotal = baseVal + addonsVal;
      const discountVal = Math.round(subtotal * (discPercent / 100));
      const total = subtotal - discountVal;

      const totalLabel = baseVal > 0 ? C.rubles(total) : 'Нужно задать денежную сумму';
      document.getElementById('kpTotalPrice').textContent = totalLabel;

      const company = document.getElementById('kpCompanyName').value || 'Уважаемый партнер';
      const contact = document.getElementById('kpContactName').value || 'Руководителю предприятия';

      document.getElementById('kpDateLabel').textContent = '22 мая 2027 года';

      let htmlOut = `
        <div class="font-medium text-white border-b border-slate-700 pb-2">
          КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ: ИНТЕГРАЦИЯ В «ЗАБЕГ.РФ — КАМЧАТКА 2027»
        </div>
        <div class="text-slate-300">
          <strong>Кому:</strong> ${C.escapeHTML(contact)}, ${C.escapeHTML(company)}<br>
          <strong>Дата события:</strong> 22 мая 2027 года • Стадион «Спартак» (г. Петропавловск-Камчатский)<br>
          <strong>Формат стартов:</strong> Время стартов и формат телемоста определяются после согласования региональной программы
        </div>
        <div class="text-slate-300">
          <strong>Выбранный пакет:</strong> <span class="text-[#1caed7] font-medium">${C.escapeHTML(pkgName)}</span><br>
          <strong>Условия исходного КП:</strong> ${C.escapeHTML(sourceTerms)}<br>
          <strong>Денежная сумма для расчёта:</strong> ${baseVal > 0 ? C.rubles(baseVal) : 'Не задана; требует согласования'}<br>
          <strong>Натуральный вклад:</strong> определяется отдельно; не включён в денежный итог
        </div>
      `;

      if (selectedAddons.length > 0) {
        htmlOut += `
          <div class="text-slate-300">
            <strong>Дополнительные опции:</strong>
            <ul class="list-disc list-inside text-[11px] text-slate-300 pl-1 pt-1 space-y-0.5">
              ${selectedAddons.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      if (discPercent > 0) {
        htmlOut += `
          <div class="text-emerald-400">
            <strong>Партнерская скидка:</strong> ${discPercent}% (-${discountVal.toLocaleString('ru-RU')} ₽)
          </div>
        `;
      }

      htmlOut += `
        <div class="pt-2 border-t border-slate-700 text-sm font-medium text-white flex justify-between items-center">
          <span>ИТОГО К СОГЛАСОВАНИЮ:</span>
          <span class="text-[#1caed7] text-lg font-condensed">${totalLabel}</span>
        </div>
        <p class="text-[11px] text-slate-400 pt-1 leading-snug">
          Предложение для обсуждения. Налоги, права, размещения, отчётность и состав интеграции закрепляются договором. Прогноз охвата не является гарантией.
        </p>
      `;

      document.getElementById('boxKPOutput').innerHTML = htmlOut;
    }

    function copyKPText() {
      const box = document.getElementById('boxKPOutput');
      if (!box) return;
      const text = box.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert('Текст коммерческого предложения успешно скопирован в буфер обмена!');
      }).catch(err => {
        console.error('Ошибка копирования:', err);
      });
    }

    function generateSponsorProposal() {
  document.body.dataset.printScope = 'proposal';
  window.print();
}

    // УПРАВЛЕНИЕ СМЕТОЙ 29 СТАТЕЙ С LOCALSTORAGE И ОНЛАЙН-ПРАВКАМИ

    function saveBudgetToStorage() {
  const saved = C.writeMany({ zabeg2027_budget29: currentItems });
  if (saved) showBudgetSaveStatus('Сохранено в этом браузере');
  return saved;
}

    function showBudgetSaveStatus(message) {
  const el = document.getElementById('budget_save_status');
  if (el) el.textContent = message;
}

    function renderTable29() {
      const tbody = document.getElementById('tableBody29');
      if (!tbody) return;
      tbody.innerHTML = '';

      let lastSec = "";
      currentItems.forEach(item => {
        if (item.sec !== lastSec) {
          lastSec = item.sec;
          const trSec = document.createElement('tr');
          trSec.className = "bg-slate-100 text-slate-900 font-medium text-xs";
          trSec.innerHTML = `<td colspan="10" class="p-2 pl-3 uppercase tracking-wider text-[#048bb1]">${C.escapeHTML(lastSec)}</td>`;
          tbody.appendChild(trSec);
        }

        const rowTotal = C.money((item.qty || 0) * (item.price || 0));
        const diff = (item.agr || 0) - rowTotal;
        const diffText = diff === 0 ? "0 ₽" : (diff > 0 ? "-" + diff.toLocaleString('ru-RU') + " ₽" : "+" + Math.abs(diff).toLocaleString('ru-RU') + " ₽");
        const diffClass = diff > 0 ? "text-emerald-700 font-medium" : (diff < 0 ? "text-rose-700 font-medium" : "text-slate-500");

        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition border-b border-slate-100";
        tr.innerHTML = `
          <td class="p-2 text-center text-slate-400 font-normal">${item.id}</td>
          <td class="p-2 font-normal text-slate-800">
            <div contenteditable="true" onblur="updateItemField(${item.id}, 'title', this.innerText.trim())"
              class="outline-none hover:bg-slate-100 focus:bg-white rounded px-1 transition text-slate-800 cursor-text" title="Нажмите для редактирования названия">
              ${C.escapeHTML(item.title)}
            </div>
            <div class="text-[10px] text-slate-500 sm:hidden mt-0.5">${C.escapeHTML(item.note || '')}</div>
          </td>
          <td class="p-2 text-center text-slate-500 font-condensed">${C.escapeHTML(item.unit || 'усл.')}</td>
          <td class="p-1.5 text-right">
            <input type="number" step="any" min="0" value="${item.qty}"
              oninput="updateItemField(${item.id}, 'qty', this.value)"
              class="w-16 text-right bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 text-xs text-emerald-900 font-medium focus:border-[#1caed7] focus:outline-none">
          </td>
          <td class="p-1.5 text-right">
            <input type="number" step="any" min="0" value="${item.price}"
              oninput="updateItemField(${item.id}, 'price', this.value)"
              class="w-24 text-right bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 text-xs text-emerald-900 font-medium focus:border-[#1caed7] focus:outline-none">
          </td>
          <td class="p-2 text-right font-medium font-condensed text-slate-900" id="row_tot_${item.id}">
            ${rowTotal.toLocaleString('ru-RU')} ₽
          </td>
          <td class="p-2 text-right text-slate-500 font-condensed">${(item.agr || 0).toLocaleString('ru-RU')} ₽</td>
          <td class="p-2 text-right ${diffClass} font-condensed" id="row_diff_${item.id}">${diffText}</td>
          <td class="p-2 text-[11px] text-slate-600">
            <div class="font-medium text-slate-800">${C.escapeHTML(item.src || '')}</div>
            <div class="text-slate-500 text-[10px] hidden sm:block">${C.escapeHTML(item.note || '')}</div>
          </td>
          <td class="p-2 text-center">
            <button onclick="deleteBudgetItem(${item.id})" class="p-1 text-slate-400 hover:text-rose-600 transition" title="Удалить статью">
              <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      calculateTotals29();
    }

    function updateItemField(id, field, value) {
  if (!['qty', 'price', 'title', 'unit'].includes(field)) return;
  if (['qty', 'price'].includes(field) && document.activeElement?.tagName === 'INPUT' && Number(value) !== C.inputNumber(value)) document.activeElement.value = String(C.inputNumber(value));
  try {
    const next = currentItems.map(item => item.id === id ? { ...item, [field]: ['qty', 'price'].includes(field) ? C.inputNumber(value) : value } : item);
    currentItems = C.budget(next);
    saveBudgetToStorage();
    const item = currentItems.find(row => row.id === id);
    if (item) {
      const total = C.money(item.qty * item.price);
      document.getElementById('row_tot_' + id).textContent = C.rubles(total);
      document.getElementById('row_diff_' + id).textContent = C.rubles(item.agr - total);
    }
    calculateTotals29();
  } catch (error) { renderTable29(); C.notify('Правка отклонена: ' + error.message); }
}

    function addBudgetItem() {
      if (currentItems.length >= 500) { C.notify('Достигнут предел 500 строк'); return; }
      const newId = C.nextId(currentItems);
      const newItem = {
        id: newId,
        sec: "4. Экспо и логистика",
        title: "Новая статья расходов (кликните для изменения)",
        unit: "компл.",
        baseQty: 1,
        basePrice: 15000,
        qty: 1,
        price: 15000,
        agr: 25000,
        src: "Прямой региональный поставщик",
        note: "Дополнительное расходное обязательство"
      };
      currentItems.push(newItem);
      saveBudgetToStorage();
      renderTable29();
      showBudgetSaveStatus(`Строка № ${newId} добавлена`);
    }

    function deleteBudgetItem(id) {
      if (confirm(`Удалить статью расходов № ${id} из расчета?`)) {
        currentItems = currentItems.filter(i => i.id !== id);
        saveBudgetToStorage();
        renderTable29();
        showBudgetSaveStatus(`Строка № ${id} удалена`);
      }
    }

    function saveBudgetManual() {
  if (saveBudgetToStorage()) alert('Смета сохранена в этом браузере. Для передачи коллегам выгрузите JSON общей модели.');
}

    function resetBudgetDefaults() {
  if (!confirm('Восстановить базовые 29 статей: 3 675 745 ₽ с резервом 15%?')) return;
  const next = C.budget(rawItems29.map(item => ({ ...item, qty: item.baseQty, price: item.basePrice })));
  if (!C.writeMany({ zabeg2027_budget29: next })) return;
  currentItems = next; renderTable29(); showBudgetSaveStatus('Восстановлена базовая смета');
}

    function applyFullPreset(preset) {
      ['btn_scen_minsport_2000', 'btn_scen_minsport_1200', 'btn_scen_agranat', 'btn_scen_econom'].forEach(b => {
        const el = document.getElementById(b);
        if (el) el.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition';
      });
      const activeBtn = document.getElementById(`btn_scen_${preset}`);
      if (activeBtn) activeBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-[#1caed7] text-white shadow transition';

      if (preset === 'agranat') {
        currentItems = rawItems29.map(item => ({ ...item, qty: 1, price: item.agr }));
      } else if (preset === 'minsport_1200') {
        currentItems = rawItems29.map(item => ({
          ...item,
          qty: (item.id === 4 ? 100 : (item.id === 24 ? 1200 : item.baseQty)),
          price: item.basePrice
        }));
      } else if (preset === 'econom') {
        currentItems = rawItems29.map(item => ({
          ...item,
          qty: Math.round(item.baseQty * 0.85) || 1,
          price: Math.round(item.basePrice * 0.75)
        }));
      } else {
        currentItems = rawItems29.map(item => ({ ...item, qty: item.baseQty, price: item.basePrice }));
      }

      saveBudgetToStorage();
      renderTable29();
      recalcSlotsApp();
    }

    function calculateTotals29() {
      const sumDirect = currentItems.reduce((acc, it) => acc + C.money((it.qty || 0) * (it.price || 0)), 0);
      const reserve = C.money(sumDirect * 0.15); // 15% непредвиденный резерв
      const sumTotal = sumDirect + reserve;
      const agranatTotal = currentItems.reduce((acc, it) => acc + (it.agr || 0), 0);
      const savings = agranatTotal - sumTotal;
      const savingsPct = agranatTotal > 0 ? ((savings / agranatTotal) * 100).toFixed(1) : "0.0";

      const elDirect = document.getElementById('sumDirectExp');
      const elReserve = document.getElementById('sumReserveExp');
      const elTotal = document.getElementById('sumTotalWithRes');
      const elSavings = document.getElementById('sumSavingsToAgranat');
      const elSavingsPct = document.getElementById('sumSavingsPct');

      if (elDirect) elDirect.textContent = sumDirect.toLocaleString('ru-RU') + ' ₽';
      if (elReserve) elReserve.textContent = reserve.toLocaleString('ru-RU') + ' ₽';
      if (elTotal) elTotal.textContent = sumTotal.toLocaleString('ru-RU') + ' ₽';
      if (elSavings) {
        elSavings.textContent = (savings >= 0 ? '' : '+') + savings.toLocaleString('ru-RU') + ' ₽';
        elSavings.className = savings >= 0 ? "text-xl sm:text-2xl font-medium font-condensed text-emerald-700 mt-0.5" : "text-xl sm:text-2xl font-medium font-condensed text-rose-700 mt-0.5";
      }
      if (elSavingsPct) elSavingsPct.textContent = `${savingsPct}% разницы сценариев`;
      recalcSlotsApp();
    }

    function exportBudget29Excel() {
      if (typeof XLSX === 'undefined') {
        exportToCSV();
        return;
      }

      const rows = [
        ["№", "Раздел сметы", "Наименование статьи расходов", "Ед. изм.", "Кол-во", "Цена за ед., ₽", "Итого стоимость, ₽", "Смета Агранат 2027, ₽", "Разница, ₽", "Подрядчик / Источник"]
      ];

      let totalDirect = 0;
      let totalAgranat = 0;

      currentItems.forEach(it => {
        const tot = C.money((it.qty || 0) * (it.price || 0));
        const agrVal = it.agr || 0;
        const sav = agrVal - tot;
        totalDirect += tot;
        totalAgranat += agrVal;
        rows.push([
          it.id,
          it.sec,
          it.title,
          it.unit,
          it.qty,
          it.price,
          tot,
          agrVal,
          sav,
          it.src || it.note || ""
        ]);
      });

      const res15 = C.money(totalDirect * 0.15);
      const totalBudget = totalDirect + res15;
      const totalSavings = totalAgranat - totalBudget;

      rows.push([]);
      rows.push(["", "", "ПРЯМЫЕ РАСХОДЫ ИТОГО", "", "", "", totalDirect, totalAgranat, totalAgranat - totalDirect, "Сумма статей сметы"]);
      rows.push(["", "", "НЕПРЕДВИДЕННЫЙ И ПОГОДНЫЙ РЕЗЕРВ (15%)", "", "", "", res15, 0, -res15, "Резерв на шторм/ветер"]);
      rows.push(["", "", "ЦЕЛЕВОЙ БЮДЖЕТ С РЕЗЕРВОМ 15% (ИТОГО)", "", "", "", totalBudget, totalAgranat, totalSavings, "ИТОГОВЫЙ БЮДЖЕТ К УТВЕРЖДЕНИЮ"]);
      rows.push(["", "", "РАЗНИЦА С БАЗОЙ СРАВНЕНИЯ", "", "", "", totalSavings, "", (totalAgranat ? ((totalSavings/totalAgranat)*100).toFixed(1) : "0.0") + "%", "Сравнение исходных предложений; не подтверждённая экономия"]);

      const ws = XLSX.utils.aoa_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Смета ЗаБег 2027");

      XLSX.writeFile(wb, "Смета_ЗаБегРФ_Камчатка_2027_Правки.xlsx");
    }

    const exportToXLSX = exportBudget29Excel;

function exportToCSV() {
  const rows = [['№', 'Раздел', 'Статья расходов', 'Ед.', 'Количество', 'Цена', 'Сумма', 'Сравнение', 'Разница', 'Источник']];
  currentItems.forEach(it => {
    const total = C.money(it.qty * it.price);
    rows.push([it.id, it.sec, it.title, it.unit, it.qty, it.price, total, it.agr, it.agr - total, it.src]);
  });
  const blob = new Blob(['\uFEFF' + rows.map(row => row.map(C.csvCell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url; link.download = 'Смета_ЗаБег_2027.csv'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

    // ВКЛАДКИ ДОКУМЕНТОВ
    function switchDocTab(tab) {
  const titles = { polozhenie: 'Проект положения: условия для согласования', decree: 'Проект решения оргкомитета', minsport: 'Проект запроса федеральному организатору', traffic: 'Задание на согласование трасс', security: 'Проект плана безопасности', sponsors: 'Кандидаты в партнёры — не подтверждённые договоры' };
  if (!titles[tab]) return;
  for (const key of Object.keys(titles)) {
    const button = document.getElementById('tabBtn' + key[0].toUpperCase() + key.slice(1));
    if (button) { button.setAttribute('aria-pressed', String(key === tab)); button.classList.toggle('bg-white', key === tab); button.classList.toggle('font-medium', key === tab); }
  }
  const text = {
    polozhenie: `<p><b>Статус:</b> проект; не заменяет утверждённое положение регионального этапа.</p><p><b>Событие:</b> XI Всероссийский полумарафон «ЗаБег.РФ», дата всероссийского события — 22 мая 2027 года. Предлагаемый региональный этап — Петропавловск-Камчатский, стадион «Спартак».</p><p><b>Спортивная программа:</b> предлагаются 1, 5, 10 и 21,1 км, плановая вместимость — 2 000 участников. Геометрия, измеренные расстояния и развороты требуют промера. Время стартов и связь с федеральной программой согласуются отдельно.</p><p><b>Допуск и регистрация:</b> возрастные категории, документы, медицинский допуск, квоты, тарифы и условия возврата определяются утверждённым положением и регистрационным оператором. На этой платформе регистрация и оплата не принимаются.</p><p><b>Выдача пакетов:</b> место, даты и часы работы не утверждены. Предложение из исходников — ФОК «Звёздный»; требуется подтвердить доступность площадки и программу выдачи.</p><p><b>До публикации положения:</b> определить организатора и ответственных, утвердить программу, маршруты, безопасность, финансирование, правила допуска и награждения. Реквизиты согласования и подписей вносятся после фактического утверждения.</p>`,
    decree: `<p><b>Статус:</b> проект решения для рассмотрения оргкомитетом.</p><p>Предлагается определить регионального организатора, руководителя проекта и ответственных за спортивную программу, трассы, финансы, подрядчиков, волонтёров, коммуникации и партнёров.</p><p>Рассмотреть стадион «Спартак» как стартовую площадку; назначить обследование и согласование трасс, инфраструктуры и транспортных ограничений.</p><p>Поручить финансовому блоку уточнить полный состав обязательств, включая продукцию, комиссию, получателя регистрационной выручки и неподтверждённые бесплатные ресурсы. Применимый порядок закупок определяет контрактная служба.</p><p>Зафиксировать принятые решения в протоколе с ответственными и датами. Перечень поручений на сайте не является изданным приказом.</p>`,
    minsport: `<p><b>Статус:</b> проект запроса условий сотрудничества.</p><p>Просим подтвердить условия проведения регионального этапа ЗаБег.РФ 2027 в Петропавловске-Камчатском: право на использование бренда и названий дистанций, формат синхронного старта, регистрационный оператор и получатель выручки.</p><p>Просим уточнить состав и стоимость стартовой продукции, хронометража, лицензии и федеральной поддержки, а также разграничение обязательств сторон. Указанные в исходниках 1,3 млн ₽ на продукцию требуют подтверждения состава и отсутствия дублирования иных статей.</p><p>Просим согласовать тарифы, бесплатные квоты, комиссию, порядок расчётов, технические требования к связи и условия участия в федеральном эфире.</p><p>Адресат, исходящий номер, контактное лицо и подпись заполняются отправителем после проверки и согласования текста.</p>`,
    traffic: `<p><b>Статус:</b> задание на обследование; схема движения не утверждена.</p><p>Проверить предлагаемый коридор от стадиона «Спартак» по улицам Ленинградской и Ленинской, развороты и подходы к площадке. Подготовить геопривязанный трек и промер всех дистанций. Для 21,1 км необходима отдельная геометрия: четыре круга по 5 км дают 20 км.</p><p>Уточнить необходимые перекрытия, время ограничений, пути объезда и доступа жителей, места постов, ограждений и проезда экстренных служб. Определить безопасные точки для зрителей и доступные подходы.</p><p>Результат: согласованная схема организации движения и регламент её исполнения с ответственными. Условная карта на сайте не заменяет эти документы.</p>`,
    security: `<p><b>Статус:</b> перечень вопросов к комплексному плану безопасности; согласования не получены этой публикацией.</p><p>После обследования уточнить вместимость и входы площадки, ограждения, пути эвакуации, доступ экстренных служб, медицинское обеспечение, связь, электропитание и резервные решения.</p><p>Определить ответственных, каналы оповещения, порядок реагирования на происшествия и решение о переносе или остановке мероприятия при неблагоприятных условиях.</p><p>Проверить крепление конструкций и погодные ограничения подрядчиков, провести инструктаж персонала и волонтёров. Числа постов, мощностей и служб из исходников — проектные, не подтверждение достаточности.</p><p>Результат: согласованный план, контактная схема и документы готовности. Подписи и реквизиты вносятся после реального согласования.</p>`,
    sponsors: '<p>Компании перечислены как кандидаты из исходного пакета. Договоры, права и суммы требуют индивидуального согласования.</p><table><thead><tr><th>Компания</th><th>Направление</th><th>Статус</th></tr></thead><tbody>' + sponsorsData.map(row => `<tr><td>${C.escapeHTML(row.name)}</td><td>${C.escapeHTML(row.cat)}</td><td>Кандидат; подтверждения нет</td></tr>`).join('') + '</tbody></table>'
  };
  document.getElementById('docHeaderTitle').textContent = titles[tab];
  document.getElementById('docContentBox').innerHTML = text[tab];
}


    function copyActiveDoc() {
      const box = document.getElementById('docContentBox');
      if (!box) return;
      navigator.clipboard.writeText(box.innerText).then(() => {
        alert('Текст нормативного документа успешно скопирован!');
      });
    }

    // ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ

    // =========================================================================
    // КАЛЬКУЛЯТОР СЛОТОВ И САМООКУПАЕМОСТИ (2 000 ЧЕЛОВЕК)
    // =========================================================================
    function setSlotPreset(type) {
      ['btn_slot_early', 'btn_slot_late', 'btn_slot_avg', 'btn_slot_site'].forEach(b => {
        const el = document.getElementById(b);
        if (el) el.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition';
      });
      const activeBtn = document.getElementById('btn_slot_' + type);
      if (activeBtn) activeBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-condensed font-medium bg-[#1caed7] text-white shadow transition';

      if (type === 'early') {
        document.getElementById('inp_slot_p1').value = 1500;
        document.getElementById('inp_slot_p5').value = 2000;
        document.getElementById('inp_slot_p10').value = 2500;
        document.getElementById('inp_slot_p21').value = 3500;
      } else if (type === 'late') {
        document.getElementById('inp_slot_p1').value = 2000;
        document.getElementById('inp_slot_p5').value = 2500;
        document.getElementById('inp_slot_p10').value = 3000;
        document.getElementById('inp_slot_p21').value = 4000;
      } else if (type === 'avg') {
        document.getElementById('inp_slot_p1').value = 1750;
        document.getElementById('inp_slot_p5').value = 2250;
        document.getElementById('inp_slot_p10').value = 2750;
        document.getElementById('inp_slot_p21').value = 3750;
      } else if (type === 'site') {
        document.getElementById('inp_slot_p1').value = 1440;
        document.getElementById('inp_slot_p5').value = 1843;
        document.getElementById('inp_slot_p10').value = 2376;
        document.getElementById('inp_slot_p21').value = 3471;
      }
      recalcSlotsApp(true);
    }

    function recalcSlotsApp(save = false) {
  if (!document.getElementById('inp_slot_q1')) return;
  const values = C.slotInputs('inp_slot_');
  const model = C.slotFinance(values);
  if (save && persistSlots) C.writeMany({ zabeg2027_platform_slots: values });
  for (const row of model.entries) document.getElementById('txt_slot_net' + row.key).textContent = C.rubles(row.net);
  const direct = currentItems.reduce((sum, row) => sum + C.money(row.qty * row.price), 0);
  const budget = C.money(direct + C.money(direct * 0.15));
  document.getElementById('app_tot_runners').textContent = model.runners.toLocaleString('ru-RU') + ' чел.';
  document.getElementById('app_tot_gross').textContent = C.rubles(model.gross);
  document.getElementById('app_tot_fee').textContent = 'Комиссия 5%: −' + C.rubles(model.fee);
  document.getElementById('app_tot_net').textContent = C.rubles(model.net);
  document.getElementById('app_coverage_pct').textContent = budget ? (model.net / budget * 100).toFixed(1) + '%' : '—';
  const surplus = C.money(model.net - budget);
  const el = document.getElementById('app_net_surplus');
  el.textContent = (surplus >= 0 ? '+' : '') + C.rubles(surplus);
  el.className = 'text-xl sm:text-2xl font-bold font-condensed mt-1 ' + (surplus >= 0 ? 'text-emerald-300' : 'text-rose-300');
}


    // ========================================================
    // ИНТЕРАКТИВНЫЙ ГРАФИК ПОДГОТОВКИ 2026-2027 (ROADMAP ENGINE)
    // ========================================================
    const defaultRoadmap = [
      { id: 1, date: "2026-11-10", action: "Запрос условий участия 2027: бренд ЗаБег.РФ, регсистема, продукция 1,3 млн, чипы", org: "Министерство спорта края", result: "Письмо и приложение к соглашению", status: "critical" },
      { id: 2, date: "2026-11-15", action: "Назначение руководителя проекта и формирование оргштаба без посредника", org: "Министр спорта / ЦСП ПК", result: "Приказ о создании оргштаба, матрица ответственности", status: "critical" },
      { id: 3, date: "2026-11-25", action: "Согласование с ПКГО стадиона «Спартак», трассы, ограждений и ОДД", org: "Руководитель проекта / Администрация ПКГО", result: "Протокол совещания, согласованная схема ОДД", status: "critical" },
      { id: 4, date: "2026-12-01", action: "Инвентаризация собственной техники, шатров, пресс-воллов ЦСП ПК", org: "КГАУ «ЦСП ПК»", result: "Ведомость доступного оборудования", status: "planned" },
      { id: 5, date: "2026-12-15", action: "Утверждение раздельных ТЗ на сцену, хронометраж, безопасность, ЧОП, логистику", org: "Оргштаб / Контрактная служба", result: "Проектные ТЗ без скрытых наценок", status: "critical" },
      { id: 6, date: "2027-01-15", action: "Сбор коммерческих предложений и мониторинг рыночных цен (29 статей)", org: "Контрактная служба / Финблок", result: "Обоснование начальной цены контрактов", status: "in_progress" },
      { id: 7, date: "2027-02-01", action: "Утверждение плана закупок по 44-ФЗ и публикация процедур", org: "Заказчик (КГАУ «ЦСП ПК»)", result: "Извещения о закупках в ЕИС, договоры", status: "critical" },
      { id: 8, date: "2027-03-01", action: "Согласование комплексного плана безопасности с УМВД, ГИБДД, МЧС и Минздравом", org: "Оргштаб / УМВД / МЧС / Минздрав", result: "Согласованный план безопасности", status: "critical" },
      { id: 9, date: "2027-03-15", action: "Старт промокампании и открытие ранней регистрации на 2 000 слотов", org: "Оргштаб / Пресс-служба / Партнеры", result: "Старт онлайн-продаж, сбор регистраций", status: "planned" },
      { id: 10, date: "2027-04-15", action: "Проверка резервного плана погоды (ветер/дождь), инструктаж 120 волонтеров", org: "Руководитель проекта / Волонтеры", result: "Чек-листы готовности, дождевики, смены", status: "planned" },
      { id: 11, date: "2027-05-15", action: "Техническая приемка трассы, тестирование антенн и чипов ChronoTrack", org: "Главный судья / Техдиректор", result: "Акт технической готовности, тест тайминга", status: "critical" },
      { id: 12, date: "2027-05-20", action: "Выдача стартовых пакетов в ФОК «Звёздный» (20 и 21 мая с 10:00 до 20:00)", org: "Служба регистрации и выдачи", result: "Выдача 2 000 пакетов, проверка медсправок", status: "critical" },
      { id: 13, date: "2027-05-22", action: "ДЕНЬ СТАРТА: ВСЕРОССИЙСКИЙ ПОЛУМАРАФОН «ЗАБЕГ.РФ — КАМЧАТКА 2027»", org: "Региональный оргштаб / Все службы", result: "Успешный старт 2 000 участников, победа в конкурсе", status: "critical" },
      { id: 14, date: "2027-06-01", action: "Закрытие актов, финансовый отчет, сверка разницы сценариев и отчет Губернатору", org: "Минспорт края / Финблок", result: "Итоговый финансовый отчет, зачисление дохода", status: "planned" }
    ];

    let currentRoadmap = [];

    function initRoadmap() {
  currentRoadmap = C.read('zabeg2027_roadmap', () => structuredClone(defaultRoadmap), C.roadmap);
  renderRoadmapTable();
  startCountdownTimer();
}

    function renderRoadmapTable() {
      const tbody = document.getElementById('roadmapTableBody');
      if (!tbody) return;

      const orgOptions = [
        "Министерство спорта края",
        "Министр спорта / ЦСП ПК",
        "Руководитель проекта / Администрация ПКГО",
        "КГАУ «ЦСП ПК»",
        "Оргштаб / Контрактная служба",
        "Контрактная служба / Финблок",
        "Заказчик (КГАУ «ЦСП ПК»)",
        "Оргштаб / УМВД / МЧС / Минздрав",
        "Оргштаб / Пресс-служба / Партнеры",
        "Руководитель проекта / Волонтеры",
        "Главный судья / Техдиректор",
        "Служба регистрации и выдачи",
        "Региональный оргштаб / Все службы",
        "Минспорт края / Финблок",
        "Администрация ПКГО (МКУ УДХБ)",
        "УГИБДД УМВД России по краю",
        "Подрядная организация"
      ];

      const statusMap = {
        "critical": { label: "🔴 Критично", cls: "bg-red-50 text-red-700 border-red-200" },
        "in_progress": { label: "🟡 В работе", cls: "bg-blue-50 text-blue-700 border-blue-200" },
        "planned": { label: "🟢 Запланировано", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        "done": { label: "✅ Выполнено", cls: "bg-slate-100 text-slate-800 border-slate-300" }
      };

      const now = new Date(C.today() + "T00:00:00Z");
      let html = "";

      currentRoadmap.forEach((item, index) => {
        if (typeof currentRoadmapFilter !== 'undefined' && currentRoadmapFilter !== 'all') {
          if (item.status !== currentRoadmapFilter) return;
        }
        // Calculate days to deadline
        let badgeHtml = "";
        if (item.date) {
          const dTarget = new Date(item.date + "T00:00:00Z");
          const diffDays = Math.ceil((dTarget - now) / (1000 * 60 * 60 * 24));
          if (item.status === 'done') {
            badgeHtml = '<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px]">Готово</span>';
          } else if (diffDays < 0) {
            badgeHtml = `<span class="px-2 py-0.5 rounded bg-red-100 text-red-700 font-mono text-[10px]">-${Math.abs(diffDays)} дн.</span>`;
          } else if (diffDays === 0) {
            badgeHtml = '<span class="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-[10px]">Сегодня!</span>';
          } else {
            badgeHtml = `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">${diffDays} дн.</span>`;
          }
        } else {
          badgeHtml = '<span class="text-slate-400 font-mono text-[10px]">—</span>';
        }

        const isStartDay = (item.date === "2027-05-22");
        const rowBg = isStartDay ? "bg-red-50/40 font-medium" : "hover:bg-slate-50/80";

        html += `
          <tr class="${rowBg} transition-colors">
            <td class="p-2.5 text-center font-mono text-slate-400 text-xs">${index + 1}</td>
            <td class="p-2">
              <input type="date" value="${C.escapeHTML(item.date)}" onchange="updateRoadmapField(${index}, 'date', this.value)" class="w-full px-2 py-1 bg-white border border-slate-200 rounded font-mono text-xs text-slate-800 focus:outline-none focus:border-[#1caed7]">
            </td>
            <td class="p-2">
              <input type="text" value="${C.escapeHTML(item.action)}" onchange="updateRoadmapField(${index}, 'action', this.value)" class="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:border-[#1caed7]">
            </td>
            <td class="p-2">
              <select onchange="updateRoadmapField(${index}, 'org', this.value)" class="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-[#1caed7]">
                ${orgOptions.map(o => `<option value="${o}" ${o === item.org ? 'selected' : ''}>${o}</option>`).join('')}
                ${!orgOptions.includes(item.org) ? `<option value="${C.escapeHTML(item.org)}" selected>${C.escapeHTML(item.org)}</option>` : ''}
              </select>
            </td>
            <td class="p-2">
              <input type="text" value="${C.escapeHTML(item.result)}" onchange="updateRoadmapField(${index}, 'result', this.value)" class="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 focus:outline-none focus:border-[#1caed7]">
            </td>
            <td class="p-2">
              <select onchange="updateRoadmapField(${index}, 'status', this.value)" class="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium focus:outline-none focus:border-[#1caed7]">
                <option value="critical" ${item.status === 'critical' ? 'selected' : ''}>🔴 Критично</option>
                <option value="in_progress" ${item.status === 'in_progress' ? 'selected' : ''}>🟡 В работе</option>
                <option value="planned" ${item.status === 'planned' ? 'selected' : ''}>🟢 Запланировано</option>
                <option value="done" ${item.status === 'done' ? 'selected' : ''}>✅ Выполнено</option>
              </select>
            </td>
            <td class="p-2 text-center whitespace-nowrap">
              ${badgeHtml}
            </td>
            <td class="p-2 text-center">
              <button onclick="deleteRoadmapMilestone(${index})" class="text-slate-400 hover:text-[#ff3100] font-bold text-base transition px-1" title="Удалить этап">×</button>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
      const stats = document.getElementById('roadmapStatsSummary');
      if (stats) {
        const doneCount = currentRoadmap.filter(x => x.status === 'done').length;
        stats.textContent = `${currentRoadmap.length} этапов • ${doneCount} выполнено`;
      }
    }

    function updateRoadmapField(index, field, value) {
  if (!currentRoadmap[index] || !['date', 'action', 'org', 'result', 'status'].includes(field)) return;
  try {
    const next = currentRoadmap.map((item, idx) => idx === index ? { ...item, [field]: value } : item);
    const valid = C.roadmap(next);
    currentRoadmap = valid;
    saveRoadmapAuto();
    renderRoadmapTable();
  } catch (error) { C.notify(error.message); }
}

    function saveRoadmapAuto() {
  const saved = C.writeMany({ zabeg2027_roadmap: currentRoadmap });
  if (saved) showRoadmapToast('Изменения сохранены в этом браузере');
  return saved;
}

    function saveRoadmapManual() { saveRoadmapAuto(); }

    function showRoadmapToast(msg) {
      const toast = document.getElementById('roadmapToast');
      const text = document.getElementById('roadmapToastText');
      if (toast && text) {
        text.textContent = msg;
        toast.classList.remove('opacity-0', 'pointer-events-none');
        toast.classList.add('opacity-100');
        setTimeout(() => {
          toast.classList.remove('opacity-100');
          toast.classList.add('opacity-0', 'pointer-events-none');
        }, 2200);
      }
    }

    function addRoadmapMilestone() {
      if (currentRoadmap.length >= 500) { C.notify('Достигнут предел 500 этапов'); return; }
      const newItem = {
        id: C.nextId(currentRoadmap),
        date: "2027-04-01",
        action: "Новое контрольное мероприятие",
        org: "КГАУ «ЦСП ПК»",
        result: "Протокол / Акт / Согласование",
        status: "planned"
      };
      currentRoadmap.push(newItem);
      saveRoadmapAuto();
      renderRoadmapTable();
    }

    function deleteRoadmapMilestone(index) {
      if (confirm("Удалить этот этап из графика подготовки?")) {
        currentRoadmap.splice(index, 1);
        saveRoadmapAuto();
        renderRoadmapTable();
      }
    }

    function resetRoadmapDefaults() {
      if (confirm("Сбросить график подготовки к исходным 14 плановым контрольным срокам?")) {
        currentRoadmap = JSON.parse(JSON.stringify(defaultRoadmap));
        saveRoadmapAuto();
        renderRoadmapTable();
        showRoadmapToast("График сброшен к базовым срокам");
      }
    }

    function exportRoadmapExcel() {
      if (typeof XLSX === 'undefined') {
        alert("Модуль экспорта Excel загружается. Пожалуйста, повторите через пару секунд.");
        return;
      }
      const data = [
        ["№", "Срок / Дедлайн", "Контрольное действие / Этап", "Ответственный орган", "Ожидаемый результат", "Статус выполнения"]
      ];
      currentRoadmap.forEach((item, idx) => {
        let statusText = "Запланировано";
        if (item.status === 'critical') statusText = "Критично";
        if (item.status === 'in_progress') statusText = "В работе";
        if (item.status === 'done') statusText = "Выполнено";

        data.push([
          idx + 1,
          item.date,
          item.action,
          item.org,
          item.result,
          statusText
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "План подготовки 2026-2027");
      XLSX.writeFile(wb, "График_подготовки_ЗаБег2027_Камчатка.xlsx");
      showRoadmapToast("Файл График_подготовки_ЗаБег2027_Камчатка.xlsx скачан!");
    }

    function exportRoadmapJSON() {
      const jsonStr = JSON.stringify(currentRoadmap, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "График_подготовки_ЗаБег2027.json";
      a.click();
      URL.revokeObjectURL(url);
      showRoadmapToast("JSON файл графика сохранен!");
    }

    async function importRoadmapJSON(event) {
  try {
    const data = await C.readJSONFile(event.target);
    if (data === undefined) return;
    const next = C.roadmap(data);
    if (!C.writeMany({ zabeg2027_roadmap: next })) return;
    currentRoadmap = next;
    renderRoadmapTable();
    showRoadmapToast('График проверен и загружен');
  } catch (error) { alert('Импорт отменён; прежние данные сохранены. ' + error.message); }
}

    function startCountdownTimer() {
  function update() {
    const el = document.getElementById('countdownTimer');
    if (!el) return;
    const days = Math.round((Date.parse('2027-05-22') - Date.parse(C.today())) / 86400000);
    el.textContent = days > 0 ? `${days} дн. до даты мероприятия` : days === 0 ? 'Сегодня — дата мероприятия' : 'Дата мероприятия прошла';
  }
  update();
  setInterval(update, 60000);
}

    window.addEventListener('DOMContentLoaded', () => {
      const storedSlots = C.read('zabeg2027_platform_slots', () => C.slotInputs('inp_slot_'), C.slots);
      C.applySlots('inp_slot_', storedSlots);
      initRoadmap();
      renderTable29();
      recalcSlotsApp();
      updateSponsorCalc();
      switchDocTab('polozhenie');
      persistSlots = true;
      selectStadiumZone(1);
    });

    // МОБИЛЬНОЕ МЕНЮ
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const iconBars = document.getElementById('menuIconBars');
      const iconClose = document.getElementById('menuIconClose');
      if (menu) {
        menu.classList.toggle('hidden');
        if (iconBars && iconClose) {
          iconBars.classList.toggle('hidden');
          iconClose.classList.toggle('hidden');
        }
      }
    }

    function closeMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const iconBars = document.getElementById('menuIconBars');
      const iconClose = document.getElementById('menuIconClose');
      if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        if (iconBars) iconBars.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    }

    // ИНТЕРАКТИВНОЕ ЗОНИРОВАНИЕ СТАДИОНА СПАРТАК
    const stadiumZonesData = {
      1: {
        badge: "ЗОНА 01 • СТАРТ / ФИНИШ",
        capacity: "2 000 бегунов",
        title: "Стартово-финишный створ и Арка ПСБ",
        desc: "Главный парадный створ соревнований. Фирменная надувная арка ЗаБег.РФ и титульного банка ПАО «ПСБ Банк», маты электронного хронометража ChronoTrack, фан-барьеры 150 пог. м, зона онлайн-интервью и финишной съемки.",
        infra: "Надувная арка 10м, тайминг ChronoTrack, барьеры",
        power: "15 кВт (резервный дизель-генератор ДГУ)",
        sponsor: "01. Титульный спонсор 5 км (ПСБ Банк, 850 000 ₽)",
        actionIdx: 1
      },
      2: {
        badge: "ЗОНА 02 • ГЛАВНАЯ СЦЕНА",
        capacity: "3 500 зрителей",
        title: "Главная сцена «Бегу за Камчатку» & LED-экран 6×4 м",
        desc: "Центральная концертная и церемониальная площадка с открытой панорамой на Авачинский и Корякский вулканы. Проведение разминки с амбассадорами, торжественного открытия губернатором края, церемоний награждения и прямого спутникового телемоста «Матч ТВ» (09:00 МСК / 18:00 ПКГО).",
        infra: "Сцена 10×8 м, экран 6×4 м Р10, звук 25 кВт, спутниковая станция",
        power: "Потребность: 45 кВт; подтвердить подключение",
        sponsor: "02. Генеральный партнер «Флагманы» (Океанрыбфлот, 750 000 ₽)",
        actionIdx: 2
      },
      3: {
        badge: "ЗОНА 03 • ЭКСПО-ГОРОДОК",
        capacity: "6 шатров по 25 м²",
        title: "Экспо-городок и брендированные шатры партнеров",
        desc: "Фестивальная аллея вдоль Западной трибуны. Размещение фирменных павильонов ПАО «ПСБ Банк», АО «Океанрыбфлот», ТК «Камчатка», Агротек, Ростелеком. Проведение промо-акций, конкурсов, выдача сувенирной брендированной продукции.",
        infra: "6 шатров 5×5 м (ООО «Камтент»), мебель, баннеры",
        power: "10 кВт (розетки в каждом павильоне)",
        sponsor: "03. Корпоративный кубок / 04. Продуктовое партнерство",
        actionIdx: 3
      },
      4: {
        badge: "ЗОНА 04 • ФОТОЗОНА",
        capacity: "150 000+ охват в соцсетях",
        title: "Стена славы участников с именами всех 2 000 бегунов",
        desc: "Традиционная монументальная фотозона ЗаБег.РФ размером 12×3 м. На полотне напечатаны имена и фамилии всех зарегистрированных участников, а также логотипы официальных партнеров. Главное место для победных фото с медалями финишеров.",
        infra: "Пресс-волл 12×3 м, мобильные ограждения, фотографы",
        power: "Не требуется (естественное освещение)",
        sponsor: "09. Цифровой партнер и фотосервис (150 000 ₽)",
        actionIdx: 9
      },
      5: {
        badge: "ЗОНА 05 • ТЕРМАЛЬНЫЙ ЛАУНЖ",
        capacity: "800+ процедур",
        title: "Термальная лаунж-зона восстановления «Паратунка»",
        desc: "Уникальная фишка камчатского полумарафона: зона пост-финишного термального восстановления от бальнеологического курорта «Паратунка». 10 столов спортивного массажа, зоны кинезиотейпирования, термальные спа-купели и консультации реабилитологов.",
        infra: "Шатры релаксации, массажные столы, шезлонги",
        power: "8 кВт (водонагреватели и аппараты)",
        sponsor: "07. Партнер термального восстановления (200 000 ₽)",
        actionIdx: 7
      },
      6: {
        badge: "ЗОНА 06 • КАМЧАТСКАЯ УХА",
        capacity: "2 000 порций горячей ухи",
        title: "Полевая кухня: камчатская уха от «Океанрыбфлота»",
        desc: "Праздничный фудкорт камчатских вкусов. Две армейские полевые кухни, где для всех участников забега бесплатно готовится традиционная горячая камчатская уха из лосося, чай из камчатских дикоросов и минеральная вода «Малкинская».",
        infra: "2 полевые кухни КП-130, столы раздачи, шатер питания",
        power: "Автономные дрова и газ",
        sponsor: "04. Продуктовое партнерство (Камчатские бренды)",
        actionIdx: 4
      },
      7: {
        badge: "ЗОНА 07 • ДЕТСКИЙ СЕКТОР",
        capacity: "400 детей и родителей",
        title: "Детский сектор и стартовый створ 1 км",
        desc: "Предлагаемая семейная зона соревнований. Отдельный надувной стартовый створ для юных бегунов; возрастные условия определяются утверждённым положением. В проекте — анимация с камчатскими маскотами (медведь, сивуч), детская разминка и награждение медалями финишера.",
        infra: "Детский стартовый створ, анимационная сцена, зона финиша",
        power: "5 кВт (звукоусиление детской зоны)",
        sponsor: "08. Партнер детского и семейного спорта (150 000 ₽)",
        actionIdx: 8
      },
      8: {
        badge: "ЗОНА 08 • ШТАБ И СМП",
        capacity: "ГСК и медицинский штаб",
        title: "Штаб судейства (ГСК), раздевалки, камеры хранения и пост СМП",
        desc: "Операционное ядро проведения старта. 12 спортивных судей 1-й и всероссийской категории, серверная станция тайминга, теплые раздевалки стадиона «Спартак», камеры хранения на 2 000 мест и дежурный пункт скорой медицинской помощи Минздрава края с реанимационной бригадой.",
        infra: "Подтрибунные помещения «Спартака», стойки сдачи вещей",
        power: "20 кВт + автономная связь 1 Гбит/с",
        sponsor: "Обеспечение КГАУ «ЦСП ПК» и Минспорта края",
        actionIdx: 1
      }
    };

    stadiumZonesData[8].actionIdx = null;
    stadiumZonesData[1].title = 'Стартово-финишный створ';
    stadiumZonesData[2].desc = 'Предлагаемая площадка разминки, открытия и награждения. Состав программы, приглашённые лица и формат федерального включения определяются после согласования.';
    stadiumZonesData[3].desc = 'Предлагаемая фестивальная аллея с павильонами партнёров. Состав компаний и размещение закрепляются соглашениями.';
    stadiumZonesData[4].capacity = 'Параметры фотозоны уточняются';
    stadiumZonesData[5].capacity = 'Пропускная способность уточняется';
    function selectStadiumZone(zoneId) {
      const data = stadiumZonesData[zoneId];
      if (!data) return;
      const zoneSelect = document.getElementById('stadium-zone-select');
      if (zoneSelect) zoneSelect.value = String(zoneId);

      const badge = document.getElementById('zoneBadge');
      const cap = document.getElementById('zoneCapacity');
      const title = document.getElementById('zoneTitle');
      const desc = document.getElementById('zoneDesc');
      const infra = document.getElementById('zoneInfra');
      const power = document.getElementById('zonePower');
      const sponsor = document.getElementById('zoneSponsor');
      const btn = document.getElementById('zoneActionBtn');

      if (badge) badge.textContent = data.badge;
      if (cap) cap.textContent = 'План: ' + data.capacity;
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (infra) infra.textContent = data.infra;
      if (power) power.textContent = data.power;
      const option = data.actionIdx ? document.getElementById('kpBasePackage').options[data.actionIdx - 1] : null;
      if (sponsor) sponsor.textContent = option ? option.getAttribute('data-name') + ' · ' + option.getAttribute('data-terms') : 'Организационная зона; спонсорский пакет не назначен';
      if (btn) {
        btn.hidden = !option;
        if (option) { btn.setAttribute('onclick', `selectPackageInCalc(${data.actionIdx})`); btn.textContent = 'Рассчитать предложение →'; }
      }

      // Подсветка пинов
      for (let i = 1; i <= 8; i++) {
        const pin = document.getElementById('pin_zone_' + i);
        if (pin) {
          const rect = pin.querySelector('rect');
          if (rect) {
            if (i === zoneId) {
              rect.setAttribute('stroke-width', '3');
              rect.style.filter = 'drop-shadow(0 0 8px rgba(0, 159, 227, 0.9))';
            } else {
              rect.setAttribute('stroke-width', '1.5');
              rect.style.filter = 'none';
            }
          }
        }
      }
    }

    // ФИЛЬТРАЦИЯ ГРАФИКА ПОДГОТОВКИ (ROADMAP)
    let currentRoadmapFilter = 'all';

    function filterRoadmap(status) {
      currentRoadmapFilter = status;
      const btns = ['rf_all', 'rf_critical', 'rf_in_progress', 'rf_planned'];
      btns.forEach(b => {
        const el = document.getElementById(b);
        if (el) {
          el.classList.remove('bg-slate-800', 'text-white', 'font-medium');
          el.classList.add('text-slate-600');
        }
      });
      const activeBtn = document.getElementById('rf_' + status);
      if (activeBtn) {
        activeBtn.classList.add('bg-slate-800', 'text-white', 'font-medium');
        activeBtn.classList.remove('text-slate-600');
      }
      renderRoadmapTable();
    }

    // СОВМЕСТНАЯ КОМАНДНАЯ РАБОТА И ОНЛАЙН СИНХРОНИЗАЦИЯ
    function copyShareableLink() {
      const url = window.location.href.split('#')[0];
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyLinkBtnText');
        if (btn) {
          const old = btn.textContent;
          btn.textContent = "✓ Ссылка скопирована!";
          setTimeout(() => { btn.textContent = old; }, 3000);
        }
        showRoadmapToast("Онлайн-ссылка скопирована в буфер обмена!");
      }).catch(() => {
        prompt("Скопируйте ссылку вручную:", url);
      });
    }

    function exportFullProjectState() {
      const state = {
        roadmap: currentRoadmap,
        budget: currentItems,
        slots: C.slotInputs('inp_slot_'),
        exportedAt: new Date().toISOString(),
        version: "ЗаБег.РФ Камчатка 2027 v4.0"
      };
      const jsonStr = JSON.stringify(state, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ЗаБег2027_Камчатка_Командная_модель.json";
      a.click();
      URL.revokeObjectURL(url);
      showRoadmapToast("Файл модели ЗаБег2027_Камчатка_Командная_модель.json скачан!");
    }

    async function importFullProjectState(event) {
  try {
    const data = await C.readJSONFile(event.target);
    if (data === undefined) return;
    if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.roadmap) || !Array.isArray(data.budget)) throw new Error('В модели нужны разделы roadmap и budget');
    const nextRoadmap = C.roadmap(data.roadmap);
    const nextBudget = C.budget(data.budget);
    const nextSlots = C.slots(Object.hasOwn(data, 'slots') ? data.slots : C.slotInputs('inp_slot_'));
    if (!C.writeMany({ zabeg2027_roadmap: nextRoadmap, zabeg2027_budget29: nextBudget, zabeg2027_platform_slots: nextSlots })) return;
    currentRoadmap = nextRoadmap;
    currentItems = nextBudget;
    C.applySlots('inp_slot_', nextSlots);
    renderRoadmapTable(); renderTable29();
    showRoadmapToast(data.slots ? 'Смета, график и слоты проверены и загружены' : 'Загружен старый формат: смета и график. Слоты сохранены текущие.');
  } catch (error) { alert('Импорт отменён; прежние данные сохранены. ' + error.message); }
}

    // ПЛАВАЮЩАЯ КНОПКА «НАВЕРХ»
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('backToTopBtn');
      if (btn) {
        if (window.scrollY > 400) {
          btn.classList.remove('hidden');
        } else {
          btn.classList.add('hidden');
        }
      }
    });
