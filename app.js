/**
 * Детский развлекательный центр «МАКСИК»
 * Логика интерактивного взаимодействия, пошагового бронирования, соц-авторизации и меню
 * г. Шахты, ТРЦ «Максимум», 3 этаж
 */

// Исходная афиша центра
const DEFAULT_POSTS = [
  {
    id: 1,
    category: "afisha",
    title: "Новогодняя программа «Ёлки: Новогодний поезд»",
    badge: "Главная ёлка",
    badgeColor: "bg-rose-600",
    date: "25–30 декабря",
    time: "10:00 и 16:00 (по возрастам)",
    price: "1 700 ₽",
    priceNote: "1 ребёнок + 1 взрослый",
    desc: "Большая 3-часовая праздничная программа: Дед Мороз и Снегурочка, интерактивная анимация со сказочными героями, мастер-класс по росписи новогодних пряников, бумажное шоу, фотозона, свободная игра во всех залах и подарок каждому ребенку.",
    image: "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=800&q=80",
    likes: 84,
    views: 1420,
    tags: ["Новый год", "Аниматоры", "Мастер-класс", "Подарки"],
    bookingEligible: true,
    bookingPackage: "ny_train"
  },
  {
    id: 2,
    category: "afisha",
    title: "Тематическая вечеринка: Уютная пижамная тусовка",
    badge: "Хит сезона",
    badgeColor: "bg-indigo-600",
    date: "Ближайшая суббота",
    time: "17:00 – 20:00",
    price: "1 200 ₽",
    priceNote: "Все развлечения включены",
    desc: "Любимая пижама, неоновые браслеты, зажигательные танцы, творческий мастер-класс по декорированию масок для сна светящимися красками, просмотр мультфильмов и чаепитие с горячим какао и маршмэллоу.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    likes: 126,
    views: 2190,
    tags: ["Пижамная вечеринка", "Неон", "Мастер-класс"],
    bookingEligible: true,
    bookingPackage: "pajama_party"
  },
  {
    id: 3,
    category: "masterclass",
    title: "Интерактивная зона «Оживи рисунок» и проекционный пол",
    badge: "Технологии",
    badgeColor: "bg-sky-600",
    date: "Ежедневно",
    time: "С 10:00 до 21:00",
    price: "Входит в билет",
    priceNote: "Без доплат",
    desc: "Ребенок раскрашивает персонажа на бумаге, сканирует его — и рисунок мгновенно оживает в 3D на гигантской стене. А на сенсорном проекционном полу доступны более 50 подвижных командных игр.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80",
    likes: 142,
    views: 3450,
    tags: ["Оживи рисунок", "Живой пол", "Интерактив"],
    bookingEligible: true,
    bookingPackage: "standard_pass"
  },
  {
    id: 4,
    category: "afisha",
    title: "Турниры по интерактивному лазертагу каждые выходные",
    badge: "Активный отдых",
    badgeColor: "bg-emerald-600",
    date: "Суббота и воскресенье",
    time: "15:00 – 17:00",
    price: "от 600 ₽",
    priceNote: "Командная игра",
    desc: "Безопасные лазерные бластеры, световые датчики, лабиринты и захватывающие тактические сценарии для детей и родителей. Инструктаж и сопровождение ведущего.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    likes: 95,
    views: 1800,
    tags: ["Лазертаг", "Командная игра", "Соревнования"],
    bookingEligible: true,
    bookingPackage: "drive"
  },
  {
    id: 5,
    category: "promo",
    title: "Специальный семейный тариф по средам: скидка 30%",
    badge: "Спецпредложение",
    badgeColor: "bg-amber-600",
    date: "Каждую среду",
    time: "Весь день",
    price: "Скидка -30%",
    priceNote: "На безлимитное посещение",
    desc: "Отличный повод устроить ребенку перезагрузку среди учебной недели. Свободный доступ во все зоны: батуты, лазертаг, приставки PS5 и интерактивные игры по специальной цене.",
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80",
    likes: 67,
    views: 890,
    tags: ["Скидки", "Семейный отдых", "Безлимит"],
    bookingEligible: true,
    bookingPackage: "standard_pass"
  },
  {
    id: 6,
    category: "news",
    title: "Кулинарный мастер-класс: расписываем праздничные пряники",
    badge: "Мастер-класс",
    badgeColor: "bg-purple-600",
    date: "Воскресенье",
    time: "14:00",
    price: "500 ₽",
    priceNote: "Материалы включены",
    desc: "Творческое занятие для юных кулинаров: учимся работать с глазурью, кондитерскими посыпками и создаем вкусные авторские сувениры, которые можно забрать домой.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    likes: 58,
    views: 1120,
    tags: ["Кулинария", "Пряники", "Творчество"],
    bookingEligible: true,
    bookingPackage: "standard_pass"
  }
];

// Конфигурация тарифов
const PACKAGES_CONFIG = {
  light: {
    name: "Тариф «Мини»",
    basePrice: 5900,
    kidsIncluded: 6,
    duration: "2 часа",
    features: [
      "2 часа игрового времени в центре",
      "Уютная банкетная комната на все время праздника",
      "Интерактивный лазертаг и сенсорный живой пол",
      "Зона приставок PlayStation 5 и Xbox Series",
      "Сервировка праздничного стола",
      "Подарок имениннику от центра"
    ]
  },
  drive: {
    name: "Тариф «Стандарт» (Популярный)",
    basePrice: 9900,
    kidsIncluded: 10,
    duration: "3 часа",
    features: [
      "3 часа праздника в развлекательном центре",
      "Костюмированный аниматор-ведущий (1 час)",
      "Большое серебряное или бумажное шоу",
      "Интерактивный косогор, скалодром и «Оживи рисунок»",
      "Банкетная лаунж-зона с посудой и чайной станцией",
      "Торжественный вынос праздничного торта",
      "Памятные сувениры всем маленьким гостям"
    ]
  },
  vip: {
    name: "Тариф «Премиум VIP»",
    basePrice: 16900,
    kidsIncluded: 15,
    duration: "3.5 часа",
    features: [
      "Закрытая аренда всего центра (только ваша компания)",
      "Два профессиональных ведущих-аниматора на 1.5 часа",
      "Большое неоновое шоу и бумажная дискотека",
      "Профессиональный фотограф (1 час репортажной съемки)",
      "Творческий мастер-класс на выбор",
      "Сервировка стола и помощь координатора праздника",
      "Особый подарок имениннику и клубная карта VIP"
    ]
  },
  free_pass: {
    name: "Свободное посещение (1 час)",
    basePrice: 500,
    kidsIncluded: 1,
    duration: "1 час",
    features: ["Доступ ко всем игровым локациям"]
  },
  free_pass_unlim: {
    name: "Безлимит на целый день",
    basePrice: 900,
    kidsIncluded: 1,
    duration: "Весь день",
    features: ["Игра без ограничений по времени", "Один взрослый сопровождающий бесплатно"]
  },
  ny_train: {
    name: "Билет «Ёлки: Новогодний поезд»",
    basePrice: 1700,
    kidsIncluded: 1,
    duration: "3 часа",
    features: ["1 ребенок + 1 взрослый", "Дед Мороз, Снегурочка, мастер-класс, подарок"]
  },
  pajama_party: {
    name: "Билет «Пижамная вечеринка»",
    basePrice: 1200,
    kidsIncluded: 1,
    duration: "3 часа",
    features: ["Неон, танцы, роспись масок, какао с маршмэллоу"]
  }
};

// Состояние приложения
let state = {
  user: null,
  posts: [],
  likedPosts: new Set(),
  bookings: [],
  currentFilter: "all",
  bookingStep: 1
};

document.addEventListener("DOMContentLoaded", () => {
  checkOAuthCallback();
  initTheme();
  loadLocalStorage();
  renderFeed();
  initBookingCalculator();
  updateAuthUI();
  setupEventListeners();
  updateWizardUI();
});

function loadLocalStorage() {
  const savedUser = localStorage.getItem("maksik_user");
  if (savedUser) {
    try { 
      state.user = JSON.parse(savedUser); 
      // Очищаем служебный номер центра, если он ошибочно попал в профиль пользователя
      if (state.user && state.user.phone === "+7 (961) 313-72-27") {
        state.user.phone = "";
        saveState();
      }
    } catch (e) { state.user = null; }
  }

  const savedPosts = localStorage.getItem("maksik_posts");
  if (savedPosts) {
    try { state.posts = JSON.parse(savedPosts); } catch (e) { state.posts = DEFAULT_POSTS; }
  } else {
    state.posts = DEFAULT_POSTS;
    localStorage.setItem("maksik_posts", JSON.stringify(DEFAULT_POSTS));
  }

  const savedLikes = localStorage.getItem("maksik_likes");
  if (savedLikes) {
    try { state.likedPosts = new Set(JSON.parse(savedLikes)); } catch (e) { state.likedPosts = new Set(); }
  }

  const savedBookings = localStorage.getItem("maksik_bookings");
  if (savedBookings) {
    try { state.bookings = JSON.parse(savedBookings); } catch (e) { state.bookings = []; }
  }
}

function saveState() {
  if (state.user) {
    localStorage.setItem("maksik_user", JSON.stringify(state.user));
  } else {
    localStorage.removeItem("maksik_user");
  }
  localStorage.setItem("maksik_posts", JSON.stringify(state.posts));
  localStorage.setItem("maksik_likes", JSON.stringify(Array.from(state.likedPosts)));
  localStorage.setItem("maksik_bookings", JSON.stringify(state.bookings));
}

// -------------------------------------------------------------
// SLIDE-OUT DRAWER (БОКОВОЕ МЕНЮ СПРАВА)
// -------------------------------------------------------------
function openSideDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const backdrop = document.getElementById("sideDrawerBackdrop");
  if (drawer && backdrop) {
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      drawer.classList.remove("translate-x-full");
    }, 10);
    document.body.style.overflow = "hidden";
  }
}

function closeSideDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const backdrop = document.getElementById("sideDrawerBackdrop");
  if (drawer && backdrop) {
    drawer.classList.add("translate-x-full");
    setTimeout(() => {
      backdrop.classList.add("hidden");
      document.body.style.overflow = "";
    }, 300);
  }
}

// -------------------------------------------------------------
// STEP-BY-STEP BOOKING WIZARD
// -------------------------------------------------------------
function goToBookingStep(step) {
  const dateInput = document.getElementById("bookDate");
  const timeInput = document.getElementById("bookTime");

  if (step === 2 && state.bookingStep === 1) {
    if (!dateInput || !dateInput.value) {
      showToast("Пожалуйста, выберите дату праздника", "error");
      if (dateInput) dateInput.focus();
      return;
    }

    if (isDayFullyBooked(dateInput.value)) {
      showToast("На эту дату весь центр закрыт на спецобслуживание. Выберите другой день.", "error");
      return;
    }

    const selectedTime = timeInput ? timeInput.value : "";
    if (!selectedTime) {
      showToast("Пожалуйста, выберите свободное время начала праздника", "error");
      return;
    }

    if (isSlotBusy(dateInput.value, selectedTime)) {
      showToast(`Время ${selectedTime} на выбранную дату уже занято! Пожалуйста, выберите свободный слот 🟢`, "error");
      return;
    }
  }

  state.bookingStep = step;
  updateWizardUI();
}

function updateWizardUI() {
  const step1 = document.getElementById("wizardStep1");
  const step2 = document.getElementById("wizardStep2");
  const step3 = document.getElementById("wizardStep3");

  const ind1 = document.getElementById("indicatorStep1");
  const ind2 = document.getElementById("indicatorStep2");
  const ind3 = document.getElementById("indicatorStep3");

  if (!step1 || !step2 || !step3) return;

  step1.classList.toggle("hidden", state.bookingStep !== 1);
  step2.classList.toggle("hidden", state.bookingStep !== 2);
  step3.classList.toggle("hidden", state.bookingStep !== 3);

  const indicators = [
    { el: ind1, step: 1 },
    { el: ind2, step: 2 },
    { el: ind3, step: 3 }
  ];

  indicators.forEach(({ el, step }) => {
    if (!el) return;
    el.classList.remove("active", "completed", "border-primary", "bg-primary", "text-white", "bg-slate-100", "text-slate-500", "border-slate-200");
    if (state.bookingStep === step) {
      el.classList.add("active", "border-primary", "bg-primary", "text-white");
    } else if (state.bookingStep > step) {
      el.classList.add("completed", "bg-emerald-50", "text-emerald-700", "border-emerald-200");
    } else {
      el.classList.add("bg-slate-100", "text-slate-500", "border-slate-200");
    }
  });

  recalculateBookingPrice();
}

// -------------------------------------------------------------
// ЛЕНТА СОБЫТИЙ
// -------------------------------------------------------------
function renderFeed() {
  const container = document.getElementById("feedContainer");
  if (!container) return;

  const filteredPosts = state.currentFilter === "all"
    ? state.posts
    : state.posts.filter(p => p.category === state.currentFilter);

  if (filteredPosts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <p class="text-lg font-bold text-slate-700">В этой рубрике пока нет новостей</p>
        <p class="text-sm">Скоро мы добавим новые анонсы и программы.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredPosts.map(post => {
    const isLiked = state.likedPosts.has(post.id);
    return `
      <article class="site-card overflow-hidden flex flex-col justify-between group">
        <div>
          <div class="relative h-52 w-full overflow-hidden bg-slate-100">
            <img 
              src="${post.image}" 
              alt="${post.title}" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute top-3 left-3">
              <span class="badge-clean text-white text-xs ${post.badgeColor} shadow-sm">
                ${post.badge}
              </span>
            </div>
            <div class="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-bold">
              ${post.price}
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                ${post.date}
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                ${post.time}
              </span>
            </div>

            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-snug">
              ${post.title}
            </h3>

            <p class="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              ${post.desc}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-2">
              ${(post.tags || []).map(t => `<span class="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium">${t}</span>`).join("")}
            </div>
          </div>
        </div>

        <div class="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
          <button 
            onclick="toggleLike(${post.id})" 
            class="flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl transition-all ${isLiked ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-100'}"
            title="Отметить"
          >
            <svg class="w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            <span>${post.likes}</span>
          </button>

          <div>
            <button 
              onclick="showPostDetails(${post.id})" 
              class="text-xs text-primary hover:text-primaryHover font-bold px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors"
            >
              Подробнее →
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function toggleLike(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  if (state.likedPosts.has(postId)) {
    state.likedPosts.delete(postId);
    post.likes = Math.max(0, post.likes - 1);
  } else {
    state.likedPosts.add(postId);
    post.likes += 1;
    showToast("Спасибо за отметку!", "success");
  }

  saveState();
  renderFeed();
}

function filterFeed(category, btnElement) {
  state.currentFilter = category;
  document.querySelectorAll(".feed-filter-btn").forEach(btn => {
    btn.classList.remove("active", "bg-primary", "text-white");
    btn.classList.add("bg-white", "text-slate-700");
  });
  if (btnElement) {
    btnElement.classList.add("active", "bg-primary", "text-white");
    btnElement.classList.remove("bg-white", "text-slate-700");
  }
  renderFeed();
}

function showPostDetails(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById("postDetailsModal");
  const modalContent = document.getElementById("postDetailsContent");

  modalContent.innerHTML = `
    <div class="relative h-64 sm:h-72 w-full overflow-hidden">
      <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
      <div class="absolute bottom-4 left-6 right-6 text-white">
        <span class="badge-clean ${post.badgeColor} text-xs mb-2 inline-block">${post.badge}</span>
        <h2 class="text-xl sm:text-2xl font-bold">${post.title}</h2>
      </div>
    </div>
    <div class="p-6 sm:p-8">
      <div class="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl mb-6 text-xs sm:text-sm">
        <div>
          <span class="text-slate-400 block text-xs mb-1">Дата</span>
          <strong class="text-slate-800">${post.date}</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-xs mb-1">Время</span>
          <strong class="text-slate-800">${post.time}</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-xs mb-1">Стоимость</span>
          <strong class="text-primary font-bold">${post.price}</strong>
        </div>
      </div>

      <div class="text-slate-600 text-sm leading-relaxed mb-6 space-y-3">
        <p>${post.desc}</p>
        <div class="p-3.5 bg-orange-50 border border-orange-200 rounded-xl text-slate-800 text-xs">
          <strong>Место проведения:</strong> г. Шахты, пер. Красный Шахтер, 78, ТРЦ «Максимум», 3 этаж, ДРЦ «Максик».
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
        ${post.bookingEligible ? `
          <button 
            onclick="closeModal('postDetailsModal'); openBookingFromPost('${post.bookingPackage}', '${post.title}', '${post.price}')" 
            class="btn-primary flex-1 py-3 px-6 rounded-xl font-bold text-center text-sm"
          >
            Забронировать место
          </button>
        ` : ''}
        <button 
          onclick="closeModal('postDetailsModal')" 
          class="btn-secondary py-3 px-6 rounded-xl font-bold text-sm"
        >
          Закрыть
        </button>
      </div>
    </div>
  `;

  openModal("postDetailsModal");
}

// -------------------------------------------------------------
// РАСПИСАНИЕ, КОНТРОЛЬ ЗАНЯТЫХ СЛОТОВ И GOOGLE ТАБЛИЦЫ
// -------------------------------------------------------------
const STANDARD_TIME_SLOTS = [
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00"
];

function getRelativeDateStr(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Официальная Google Таблица бронирований и занятых дат ДРЦ «Максик»
const GOOGLE_SHEET_DEFAULT_URL = "https://docs.google.com/spreadsheets/d/1BnSLRwPfXxePT0wwIoBW7scslc70BOEHynoIXgjXIkA/edit?usp=sharing";

// Начальное расписание занятых слотов (автоматически обновляется из Google Таблицы)
let busySchedule = [
  { date: "2026-11-21", time: "14:30", client: "Ольга" },
  { date: "2026-11-21", time: "17:30", client: "Сергей" },
  { date: "2026-11-22", time: "11:30", client: "Елена" },
  { date: "2026-11-28", time: "16:00", client: "Дмитрий" },
  { date: "2026-12-05", time: "Весь день", client: "Администрация" }
];

function isDayFullyBooked(dateStr) {
  if (!dateStr) return false;
  return busySchedule.some(slot => 
    slot.date && slot.date === dateStr && (slot.time === "Весь день" || String(slot.time).toLowerCase().includes("весь"))
  );
}

function isSlotBusy(dateStr, timeStr) {
  if (!dateStr || !timeStr) return false;
  if (isDayFullyBooked(dateStr)) return true;
  return busySchedule.some(slot => {
    if (!slot.date || slot.date !== dateStr) return false;
    const sTime = String(slot.time || '').trim();
    if (!sTime) return false;
    return sTime === timeStr || sTime.includes(timeStr) || timeStr.includes(sTime);
  });
}

function renderTimeSlots() {
  const dateInput = document.getElementById("bookDate");
  const timeGrid = document.getElementById("timeSlotsGrid");
  const timeInput = document.getElementById("bookTime");
  const notice = document.getElementById("selectedSlotNotice");
  const dayAlert = document.getElementById("dayClosedAlert");
  const timeContainer = document.getElementById("timeSlotsContainer");
  const btnNext = document.getElementById("btnStep1Next");

  if (!dateInput || !timeGrid) return;

  const selectedDate = dateInput.value;
  const isFullDayClosed = isDayFullyBooked(selectedDate);

  if (isFullDayClosed) {
    if (dayAlert) dayAlert.classList.remove("hidden");
    if (timeContainer) timeContainer.classList.add("opacity-50", "pointer-events-none");
    if (btnNext) {
      btnNext.disabled = true;
      btnNext.classList.add("opacity-50", "cursor-not-allowed");
    }
    return;
  } else {
    if (dayAlert) dayAlert.classList.add("hidden");
    if (timeContainer) timeContainer.classList.remove("opacity-50", "pointer-events-none");
    if (btnNext) {
      btnNext.disabled = false;
      btnNext.classList.remove("opacity-50", "cursor-not-allowed");
    }
  }

  let currentTime = timeInput ? timeInput.value : "";
  let isCurrentTimeBusy = isSlotBusy(selectedDate, currentTime);

  // Если текущий слот занят или пуст — автоматически выбираем первый свободный
  if (!currentTime || isCurrentTimeBusy) {
    const firstFree = STANDARD_TIME_SLOTS.find(t => !isSlotBusy(selectedDate, t));
    currentTime = firstFree || "";
    if (timeInput) timeInput.value = currentTime;
  }

  timeGrid.innerHTML = STANDARD_TIME_SLOTS.map(t => {
    const busy = isSlotBusy(selectedDate, t);
    const isSelected = t === currentTime;

    if (busy) {
      return `
        <button 
          type="button" 
          disabled
          class="slot-btn busy" 
          title="Время ${t} уже занято другим клиентом"
        >
          <span class="slot-time text-xs font-bold line-through text-slate-400">${t}</span>
          <span class="text-[10px] text-rose-500 font-extrabold mt-0.5">🔴 Занято</span>
        </button>
      `;
    } else {
      return `
        <button 
          type="button" 
          onclick="selectTimeSlot('${t}')" 
          class="slot-btn ${isSelected ? 'selected' : ''}" 
          title="Нажмите, чтобы выбрать ${t}"
        >
          <span class="slot-time text-xs font-bold text-slate-800">${t}</span>
          <span class="text-[10px] text-emerald-600 font-bold mt-0.5">🟢 Свободно</span>
        </button>
      `;
    }
  }).join("");

  if (notice) {
    if (currentTime) {
      notice.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>Выбрано свободное время: <strong class="text-primary font-bold">${currentTime}</strong> на дату <strong>${formatDateRu(selectedDate)}</strong></span>
      `;
    } else {
      notice.innerHTML = `
        <span class="text-rose-500 font-bold">На эту дату нет свободных слотов. Пожалуйста, выберите соседний день.</span>
      `;
    }
  }
}

function selectTimeSlot(time) {
  const dateInput = document.getElementById("bookDate");
  const selectedDate = dateInput ? dateInput.value : "";

  if (isSlotBusy(selectedDate, time)) {
    showToast(`Время ${time} уже занято другим клиентом!`, "error");
    return;
  }

  const timeInput = document.getElementById("bookTime");
  if (timeInput) timeInput.value = time;
  renderTimeSlots();
}

function handleDateChange() {
  const gsheetUrl = localStorage.getItem("maxik_gsheet_url") || GOOGLE_SHEET_DEFAULT_URL;
  if (gsheetUrl) {
    fetchScheduleFromGoogleSheets(gsheetUrl, false);
  }
  renderTimeSlots();
}

function setQuickDate(offsetDays) {
  const dateInput = document.getElementById("bookDate");
  if (!dateInput) return;
  dateInput.value = getRelativeDateStr(offsetDays);
  handleDateChange();
}

function setQuickDateToDay(targetDayOfWeek) {
  const d = new Date();
  let daysToAdd = (targetDayOfWeek - d.getDay() + 7) % 7;
  if (daysToAdd === 0) daysToAdd = 7;
  d.setDate(d.getDate() + daysToAdd);
  
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  
  const dateInput = document.getElementById("bookDate");
  if (dateInput) {
    dateInput.value = `${y}-${m}-${day}`;
    handleDateChange();
  }
}

function formatDateRu(dateStr) {
  try {
    const parts = dateStr.split("-");
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  } catch (e) {
    return dateStr;
  }
}

// Google Sheets Modal & Sync
function openGoogleSheetsModal() {
  const input = document.getElementById("googleSheetUrlInput");
  const savedUrl = localStorage.getItem("maxik_gsheet_url") || "";
  if (input) input.value = savedUrl;
  openModal("googleSheetsModal");
}

function saveGoogleSheetsConfig() {
  const input = document.getElementById("googleSheetUrlInput");
  const url = input ? input.value.trim() : "";
  localStorage.setItem("maxik_gsheet_url", url);

  const badge = document.getElementById("googleSheetsSyncBadge");
  if (url) {
    if (badge) {
      badge.textContent = "Синхронизируется...";
      badge.className = "text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800";
    }
    fetchScheduleFromGoogleSheets(url, true);
  } else {
    if (badge) {
      badge.textContent = "Демо-график";
      badge.className = "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800";
    }
    showToast("Включено встроенное демонстрационное расписание", "info");
    closeModal("googleSheetsModal");
    renderTimeSlots();
  }
}

async function fetchScheduleFromGoogleSheets(url, isUserTriggered = false) {
  if (!url) return;
  const badge = document.getElementById("googleSheetsSyncBadge");

  // Automatically convert normal Google Sheets link to CSV export via Google Visualization API
  let fetchUrl = url;
  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetMatch && !url.includes("script.google.com") && !url.includes("gviz") && !url.includes("export?format=csv")) {
    fetchUrl = `https://docs.google.com/spreadsheets/d/${sheetMatch[1]}/gviz/tq?tqx=out:csv`;
  }

  try {
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error("HTTP " + res.status);
    
    const text = await res.text();
    let updatedSlots = [];

    try {
      const data = JSON.parse(text);
      if (data && data.busySlots) {
        updatedSlots = data.busySlots;
      }
    } catch (jsonErr) {
      // CSV format parser (supports both DD.MM.YYYY and YYYY-MM-DD)
      const lines = text.split("\n");
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cols = line.split(",").map(c => c.trim().replace(/^"|"$/g, ""));
        if (cols.length >= 3) {
          let d = (cols[0] || '').trim();
          if (!d) continue; // Пропускаем строки с пустой датой
          if (/^\d{2}\.\d{2}\.\d{4}$/.test(d)) {
            const [day, month, year] = d.split('.');
            d = `${year}-${month}-${day}`;
          }
          const t = cols[1] ? cols[1].trim() : "Весь день";
          const st = (cols[2] || '').toLowerCase();
          if (st.includes("занят") || st === "busy") {
            updatedSlots.push({ date: d, time: t, status: "Занято", client: cols[3] || "" });
          }
        }
      }
    }

    if (updatedSlots.length > 0) {
      busySchedule = updatedSlots;
      localStorage.setItem("maxik_busy_slots", JSON.stringify(busySchedule));
      if (badge) {
        badge.textContent = `Синхронизировано (${updatedSlots.length})`;
        badge.className = "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800";
      }
      if (isUserTriggered) {
        showToast("Расписание успешно загружено из Google Таблицы!", "success");
        closeModal("googleSheetsModal");
      }
      renderTimeSlots();
    }
  } catch (err) {
    console.warn("Google Sheets fetch error:", err);
    if (badge) {
      badge.textContent = "Демо (Google недоступен)";
      badge.className = "text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800";
    }
    if (isUserTriggered) {
      showToast("Не удалось загрузить данные по ссылке. Проверьте права доступа в Google Таблице.", "error");
    }
  }
}

function sendBookingToGoogleSheets(booking) {
  const gsheetUrl = localStorage.getItem("maxik_gas_url") || "https://script.google.com/macros/s/AKfycbwkCEa9eMQzXMMfR7TXkM8W0gya57IwWS3t26KG-wUVmmSYF2d4j3bv6C6LEvmSfHV1xQ/exec";
  if (!gsheetUrl) return;

  try {
    fetch(gsheetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: booking.date,
        time: booking.time,
        name: booking.parentName,
        phone: booking.phone,
        package: booking.packageName,
        kids: booking.kidsCount,
        total: booking.totalPrice,
        notes: booking.notes
      })
    }).then(() => {
      console.log("Заявка успешно отправлена в Google Таблицу");
    }).catch(err => {
      console.warn("Ошибка отправки в Google Таблицу:", err);
    });
  } catch (e) {
    console.warn("Ошибка fetch Google Sheets:", e);
  }
}

// -------------------------------------------------------------
// КАЛЬКУЛЯТОР СТОИМОСТИ
// -------------------------------------------------------------
function initBookingCalculator() {
  const packageSelect = document.getElementById("bookPackageSelect");
  const kidsInput = document.getElementById("bookKidsCount");
  const kidsDisplay = document.getElementById("bookKidsDisplay");
  const dateInput = document.getElementById("bookDate");

  // Load custom busy slots from localStorage if saved
  const savedSlots = localStorage.getItem("maxik_busy_slots");
  if (savedSlots) {
    try {
      const parsed = JSON.parse(savedSlots);
      if (Array.isArray(parsed) && parsed.length > 0) busySchedule = parsed;
    } catch (e) {}
  }

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    if (!dateInput.value) {
      dateInput.value = today;
    }
  }

  // Render time slots for current date
  renderTimeSlots();

  if (kidsInput && kidsDisplay) {
    kidsInput.addEventListener("input", (e) => {
      kidsDisplay.textContent = e.target.value;
      recalculateBookingPrice();
    });
  }

  if (packageSelect) {
    packageSelect.addEventListener("change", () => {
      recalculateBookingPrice();
    });
  }

  document.querySelectorAll(".addon-checkbox").forEach(cb => {
    cb.addEventListener("change", () => recalculateBookingPrice());
  });

  recalculateBookingPrice();

  // Load Google Sheets schedule in background if configured or from URL param (?sheet=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramSheetUrl = urlParams.get("sheet");
    if (paramSheetUrl) {
      localStorage.setItem("maxik_gsheet_url", paramSheetUrl);
    }
  } catch (e) {}

  const savedGSheetUrl = localStorage.getItem("maxik_gsheet_url") || GOOGLE_SHEET_DEFAULT_URL;
  if (savedGSheetUrl) {
    fetchScheduleFromGoogleSheets(savedGSheetUrl, false);
  }
}

function recalculateBookingPrice() {
  const packageSelect = document.getElementById("bookPackageSelect");
  const kidsInput = document.getElementById("bookKidsCount");
  const totalDisplay = document.getElementById("bookTotalPrice");
  const bonusNotice = document.getElementById("bookBonusNotice");
  if (!packageSelect || !totalDisplay) return;

  const pkgKey = packageSelect.value;
  const pkg = PACKAGES_CONFIG[pkgKey] || PACKAGES_CONFIG.drive;
  const kidsCount = parseInt(kidsInput ? kidsInput.value : "8", 10);

  let total = pkg.basePrice;

  if (pkg.kidsIncluded && kidsCount > pkg.kidsIncluded) {
    const extraKids = kidsCount - pkg.kidsIncluded;
    total += extraKids * 650;
  }

  document.querySelectorAll(".addon-checkbox:checked").forEach(cb => {
    const price = parseInt(cb.dataset.price || "0", 10);
    total += price;
  });

  if (state.user && state.user.bonuses > 0 && bonusNotice) {
    const maxBonusSpend = Math.min(state.user.bonuses, Math.floor(total * 0.2));
    bonusNotice.innerHTML = `
      <span class="text-emerald-700 font-semibold text-xs">Доступно к списанию ${maxBonusSpend} бонусов карты гостя</span>
    `;
  } else if (bonusNotice) {
    bonusNotice.innerHTML = `
      <span class="text-slate-500 text-xs">При регистрации начислим 500 приветственных бонусов на бронь</span>
    `;
  }

  totalDisplay.textContent = total.toLocaleString("ru-RU") + " ₽";
  return total;
}

function openBookingFromPost(packageKey, eventTitle, eventPrice) {
  const packageSelect = document.getElementById("bookPackageSelect");
  if (packageSelect && PACKAGES_CONFIG[packageKey]) {
    packageSelect.value = packageKey;
  }

  const notesField = document.getElementById("bookNotes");
  if (notesField && eventTitle) {
    notesField.value = `Бронь по событию: ${eventTitle} (${eventPrice})`;
  }

  state.bookingStep = 1;
  updateWizardUI();
  recalculateBookingPrice();

  const section = document.getElementById("booking-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function selectPackage(packageKey) {
  const packageSelect = document.getElementById("bookPackageSelect");
  if (packageSelect) {
    packageSelect.value = packageKey;
    recalculateBookingPrice();
  }
  state.bookingStep = 1;
  updateWizardUI();

  const section = document.getElementById("booking-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
  showToast(`Выбран тариф: ${PACKAGES_CONFIG[packageKey]?.name || ''}`, "info");
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.bookParentName.value.trim();
  const phone = form.bookParentPhone.value.trim();
  const childName = form.bookChildName.value.trim();
  const childAge = form.bookChildAge.value.trim();
  const date = form.bookDate.value;
  const time = form.bookTime.value;
  const pkgKey = form.bookPackageSelect.value;
  const kidsCount = form.bookKidsCount.value;
  const notes = form.bookNotes.value.trim();

  if (!name || !phone || !date || !time) {
    showToast("Пожалуйста, заполните имя и номер телефона", "error");
    return;
  }

  const selectedAddons = [];
  document.querySelectorAll(".addon-checkbox:checked").forEach(cb => {
    selectedAddons.push(cb.dataset.name);
  });

  const pkg = PACKAGES_CONFIG[pkgKey] || PACKAGES_CONFIG.drive;
  const totalAmount = recalculateBookingPrice();
  const bookingId = "MAX-" + Math.floor(100000 + Math.random() * 900000);

  const newBooking = {
    id: bookingId,
    createdAt: new Date().toISOString(),
    parentName: name,
    phone: phone,
    childName: childName || "Именинник",
    childAge: childAge || "—",
    date: date,
    time: time,
    packageName: pkg.name,
    kidsCount: kidsCount,
    addons: selectedAddons,
    totalPrice: totalAmount,
    status: "На согласовании (Telegram)",
    notes: notes
  };

  state.bookings.unshift(newBooking);

  if (state.user) {
    const earnedBonuses = Math.round(totalAmount * 0.05);
    state.user.bonuses = (state.user.bonuses || 0) + earnedBonuses;
  }

  // Фиксируем слот в расписании (защита от повторной брони)
  // Отправляем заявку создателям ДРЦ «Максик» в Telegram на согласование!
  sendBookingToTelegram(newBooking);
  sendBookingToGoogleSheets(newBooking);

  saveState();
  updateAuthUI();
  showTicketModal(newBooking);

  form.reset();
  state.bookingStep = 1;
  updateWizardUI();
  initBookingCalculator();
}

function showTicketModal(booking) {
  const modal = document.getElementById("ticketModal");
  const ticketContent = document.getElementById("ticketContent");

  const formattedDate = new Date(booking.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  ticketContent.innerHTML = `
    <div class="bg-slate-900 p-6 text-white text-center relative">
      <div class="text-xs uppercase font-bold tracking-widest text-primary mb-1">Электронный билет на праздник</div>
      <h3 class="text-xl font-bold">Бронирование успешно оформлено</h3>
      <p class="text-xs text-slate-400 mt-1">Детский развлекательный центр «МАКСИК»</p>
      <div class="mt-3 inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold">
        ${booking.id}
      </div>
    </div>

    <div class="p-6 space-y-4">
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div class="flex justify-between items-center mb-1 text-xs text-slate-500 font-medium">
          <span>Программа</span>
          <span class="text-amber-800 bg-amber-100 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span><span>Передано в Telegram</span></span>
        </div>
        <div class="font-bold text-base text-slate-900">${booking.packageName}</div>
      </div>

      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span class="text-slate-400 block mb-0.5">Дата визита</span>
          <strong class="text-slate-800 text-sm">${formattedDate}</strong>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span class="text-slate-400 block mb-0.5">Время начала</span>
          <strong class="text-slate-800 text-sm">${booking.time}</strong>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span class="text-slate-400 block mb-0.5">Имя заказчика</span>
          <strong class="text-slate-800 text-sm">${booking.parentName}</strong>
        </div>
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span class="text-slate-400 block mb-0.5">Количество детей</span>
          <strong class="text-slate-800 text-sm">${booking.kidsCount} чел.</strong>
        </div>
      </div>

      ${booking.addons.length > 0 ? `
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
          <span class="text-slate-400 block mb-1">Дополнительные опции:</span>
          <div class="flex flex-wrap gap-1">
            ${booking.addons.map(a => `<span class="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">${a}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="border-t border-dashed border-slate-200 pt-4">
        <span class="text-xs text-slate-400 block">Предварительный расчет:</span>
        <div class="text-2xl font-bold text-primary">${booking.totalPrice.toLocaleString("ru-RU")} ₽</div>
      </div>

      <div class="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
        <strong>Заявка принята!</strong> Создателям ДРЦ «Максик» в Telegram отправлено уведомление для подтверждения даты. Мы перезвоним вам по номеру <strong>${booking.phone}</strong> для окончательного подтверждения.
      </div>
    </div>

    <div class="p-6 pt-0">
      <button 
        onclick="closeModal('ticketModal')" 
        class="btn-secondary w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-center block"
      >
        Закрыть
      </button>
    </div>
  `;

  openModal("ticketModal");
}

// -------------------------------------------------------------
// АВТОРИЗАЦИЯ И СОЦ-СЕТИ (ЯНДЕКС ID, VK ID)
// -------------------------------------------------------------
function handleSocialLogin(provider) {
  if (provider === 'yandex') {
    const savedName = localStorage.getItem("maksik_user_name") || "Максим";
    state.user = {
      name: savedName,
      phone: "+7 (995) 091-91-92",
      email: "orinmaksim348@yandex.ru",
      cardNumber: "MK-" + (Math.floor(1000 + Math.random() * 9000)),
      bonuses: 500,
      provider: "Яндекс ID",
      providerType: "yandex",
      initials: getInitials(savedName) || "Я",
      avatarColor: "bg-[#FC3F1D]",
      level: "Любимый гость",
      cashbackPercent: 5,
      registeredAt: new Date().toISOString()
    };
    showToast("Вы успешно вошли через Яндекс ID! Начислено 500 приветственных бонусов 🎉", "success");
  } else if (provider === 'vk') {
    const savedName = localStorage.getItem("maksik_user_name") || "Максим Орин";
    state.user = {
      name: savedName,
      phone: "+7 (995) 091-91-92",
      email: "orinmaksim348@mail.ru",
      cardNumber: "MK-" + (Math.floor(1000 + Math.random() * 9000)),
      bonuses: 500,
      provider: "VK ID",
      providerType: "vk",
      initials: getInitials(savedName) || "МО",
      avatarColor: "bg-[#0077FF]",
      level: "Любимый гость",
      cashbackPercent: 5,
      registeredAt: new Date().toISOString()
    };
    showToast("Вы успешно вошли через VK ID! Начислено 500 приветственных бонусов 🎉", "success");
  }

  saveState();
  updateAuthUI();
  closeModal("authModal");
}

function updateAuthUI() {
  const authBtn = document.getElementById("authNavBtn");
  const drawerAuthBtn = document.getElementById("drawerAuthBtn");
  const clubCardBalance = document.getElementById("clubCardBalance");

  // Header Account Button: If logged in, shows stylish avatar with provider badge; if not, sleek silhouette icon
  const headerIconOnlyMarkup = state.user ? `
    <button onclick="openCabinetModal()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors relative" title="Личный кабинет: ${state.user.name} (${state.user.provider})">
      ${state.user.avatar ? `<img src="${state.user.avatar}" alt="${state.user.name}" class="w-8 h-8 rounded-lg object-cover shadow-sm">` : `<span class="w-8 h-8 rounded-lg ${state.user.avatarColor || 'bg-primary'} text-white font-extrabold text-xs flex items-center justify-center shadow-sm">${state.user.initials || state.user.name.charAt(0)}</span>`}
      <span class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"></span>
    </button>
  ` : `
    <button onclick="openAuthModal()" class="w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-primary flex items-center justify-center transition-colors" title="Войти в личный кабинет">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
    </button>
  `;

  // Drawer Markup
  const drawerMarkup = state.user ? `
    <button onclick="openCabinetModal(); closeSideDrawer();" class="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800">
      <div class="flex items-center gap-2.5">
        <span class="w-8 h-8 rounded-lg ${state.user.avatarColor || 'bg-primary'} text-white flex items-center justify-center text-xs font-bold shadow-sm">
          ${state.user.initials || state.user.name.charAt(0)}
        </span>
        <div class="text-left">
          <div class="font-bold text-slate-900 leading-tight">${state.user.name}</div>
          <span class="text-[10px] text-slate-400 font-semibold">${state.user.provider}</span>
        </div>
      </div>
      <span class="text-primary font-black text-sm">${state.user.bonuses} б.</span>
    </button>
  ` : `
    <button onclick="openAuthModal(); closeSideDrawer();" class="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors">
      <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      <span>Войти в аккаунт</span>
    </button>
  `;

  if (authBtn) authBtn.innerHTML = headerIconOnlyMarkup;
  if (drawerAuthBtn) drawerAuthBtn.innerHTML = drawerMarkup;

  if (clubCardBalance) {
    if (state.user) {
      clubCardBalance.textContent = state.user.bonuses + " бонусов";
    } else {
      clubCardBalance.textContent = "500 бонусов при регистрации";
    }
  }
}

function openAuthModal(tab = "login") {
  switchAuthTab(tab);
  openModal("authModal");
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginFormContainer");
  const regForm = document.getElementById("registerFormContainer");
  const tabLogin = document.getElementById("tabLoginBtn");
  const tabReg = document.getElementById("tabRegisterBtn");

  if (tab === "login") {
    loginForm.classList.remove("hidden");
    regForm.classList.add("hidden");
    tabLogin.classList.add("active", "border-primary", "text-primary");
    tabLogin.classList.remove("border-transparent", "text-slate-400");
    tabReg.classList.remove("active", "border-primary", "text-primary");
    tabReg.classList.add("border-transparent", "text-slate-400");
  } else {
    loginForm.classList.add("hidden");
    regForm.classList.remove("hidden");
    tabReg.classList.add("active", "border-primary", "text-primary");
    tabReg.classList.remove("border-transparent", "text-slate-400");
    tabLogin.classList.remove("active", "border-primary", "text-primary");
    tabLogin.classList.add("border-transparent", "text-slate-400");
  }
}

function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.regName.value.trim();
  const phone = form.regPhone.value.trim();

  if (!name || !phone) {
    showToast("Введите имя и номер телефона", "error");
    return;
  }

  state.user = {
    name: name,
    phone: phone,
    cardNumber: "MK-" + Math.floor(1000 + Math.random() * 9000),
    bonuses: 500,
    level: "Любимый гость",
    cashbackPercent: 5,
    registeredAt: new Date().toISOString()
  };

  saveState();
  updateAuthUI();
  closeModal("authModal");
  showToast(`Регистрация успешна! Начислено 500 бонусов.`, "success");
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const phone = form.loginPhone.value.trim();

  if (!phone) {
    showToast("Введите номер телефона", "error");
    return;
  }

  state.user = {
    name: "Гость центра",
    phone: phone,
    cardNumber: "MK-" + Math.floor(1000 + Math.random() * 9000),
    bonuses: 500,
    level: "Любимый гость",
    cashbackPercent: 5,
    registeredAt: new Date().toISOString()
  };

  saveState();
  updateAuthUI();
  closeModal("authModal");
  showToast("Вход выполнен успешно", "success");
}

function openCabinetModal() {
  if (!state.user) {
    openAuthModal();
    return;
  }

  const modal = document.getElementById("cabinetModal");
  const content = document.getElementById("cabinetContent");

  content.innerHTML = `
    <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden mb-6">
      <div class="flex justify-between items-start mb-6">
        <div>
          <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Карта лояльности</span>
          <div class="text-xl font-bold">МАКСИ-КЛУБ</div>
        </div>
        <div class="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
          ${state.user.level} (5% кешбэк)
        </div>
      </div>

      <div class="flex items-end justify-between">
        <div>
          <span class="text-xs text-slate-400 block mb-0.5">Баланс бонусов (1 бонус = 1 ₽):</span>
          <div class="text-3xl font-black text-primary">${state.user.bonuses}</div>
        </div>
        <div class="text-right">
          <div class="font-mono text-sm tracking-wider font-bold">${state.user.cardNumber}</div>
          <span class="text-xs text-slate-400">${state.user.name}</span>
        </div>
      </div>
    </div>

    <div class="bg-slate-50 p-4 rounded-xl mb-6 text-xs sm:text-sm flex items-center justify-between border border-slate-100">
      <div>
        <div class="text-slate-400 text-xs">Телефон профиля:</div>
        <div class="font-bold text-slate-800">${state.user.phone}</div>
      </div>
      <button onclick="handleLogout()" class="text-xs text-rose-600 font-bold hover:underline">
        Выйти
      </button>
    </div>

    <div>
      <h4 class="font-bold text-slate-900 mb-3 text-sm flex items-center justify-between">
        <span>История бронирований</span>
        <span class="text-xs text-slate-400">Всего: ${state.bookings.length}</span>
      </h4>

      ${state.bookings.length === 0 ? `
        <div class="text-center py-6 bg-slate-50 rounded-xl text-slate-400 text-xs">
          У вас пока нет оформленных броней.
        </div>
      ` : `
        <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
          ${state.bookings.map(b => `
            <div class="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span class="font-mono text-slate-400 block">${b.id} • ${b.date} (${b.time})</span>
                <strong class="text-slate-800">${b.packageName}</strong>
              </div>
              <div class="text-right">
                <span class="font-bold text-primary block">${b.totalPrice.toLocaleString('ru-RU')} ₽</span>
                <button onclick="closeModal('cabinetModal'); showTicketModal(${JSON.stringify(b).replace(/"/g, '&quot;')})" class="text-[11px] text-blue-600 font-bold hover:underline">
                  Билет
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;

  openModal("cabinetModal");
}

function handleLogout() {
  state.user = null;
  saveState();
  updateAuthUI();
  closeModal("cabinetModal");
  showToast("Вы вышли из профиля", "info");
}

// -------------------------------------------------------------
// МОДАЛЬНЫЕ ОКНА И УВЕДОМЛЕНИЯ
// -------------------------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }
}

function setupEventListeners() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
        overlay.classList.remove("flex");
        document.body.style.overflow = "";
      }
    });
  });

  // Close drawer on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSideDrawer();
    }
  });
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const bgColors = {
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
    info: "bg-slate-900 text-white"
  };

  const toast = document.createElement("div");
  toast.className = `toast-msg px-4 py-3 rounded-xl shadow-lg font-bold text-xs flex items-center gap-2 mb-2 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// -------------------------------------------------------------
// ТЁМНАЯ ТЕМА (DARK THEME TOGGLE)
// -------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem("maxik_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeUI();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("maxik_theme", isDark ? "dark" : "light");
  updateThemeUI();
}

function updateThemeUI() {
  const isDark = document.documentElement.classList.contains("dark");

  // Update text inside drawer
  const drawerText = document.getElementById("drawerThemeText");
  if (drawerText) {
    drawerText.textContent = isDark ? "Светлая тема" : "Тёмная тема";
  }

  // Update header button title
  const headerBtn = document.getElementById("headerThemeToggleBtn");
  if (headerBtn) {
    headerBtn.setAttribute("title", isDark ? "Включить светлую тему" : "Включить тёмную тему");
  }
}



// -------------------------------------------------------------
// TELEGRAM БОТ УВЕДОМЛЕНИЙ И СОГЛАСОВАНИЯ БРОНЕЙ
// -------------------------------------------------------------
function getTelegramBotToken() {
  return localStorage.getItem("maxik_telegram_token") || "9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4";
}

const TELEGRAM_DEFAULT_CHAT_ID = "6564678119";
const TELEGRAM_DEFAULT_BOT_TOKEN = "9194512893:AAEM_EkDc88r6H6dntdQ815V0IjwjRRtSr4";

function getTelegramChatId() {
  return localStorage.getItem("maxik_telegram_chat_id") || TELEGRAM_DEFAULT_CHAT_ID;
}

async function sendBookingToTelegram(booking) {
  const token = getTelegramBotToken();
  const chatId = getTelegramChatId();
  const gsheetUrl = localStorage.getItem("maxik_gsheet_url") || GOOGLE_SHEET_DEFAULT_URL;
  const GAS_DEFAULT_URL = "https://script.google.com/macros/s/AKfycbwkCEa9eMQzXMMfR7TXkM8W0gya57IwWS3t26KG-wUVmmSYF2d4j3bv6C6LEvmSfHV1xQ/exec";
  const gasUrl = localStorage.getItem("maxik_gas_url") || GAS_DEFAULT_URL;

  // 1. Если настроен Google Apps Script Webhook — отправляем через него для работы интерактивных кнопок
  if (gasUrl) {
    try {
      fetch(gasUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "new_booking",
          bookingId: booking.id,
          date: booking.date,
          time: booking.time,
          parentName: booking.parentName,
          phone: booking.phone,
          packageName: booking.packageName,
          kidsCount: booking.kidsCount,
          totalPrice: booking.totalPrice,
          addons: booking.addons,
          notes: booking.notes
        })
      });
      console.log("Заявка передана в Google Apps Script Webhook");
    } catch (e) {
      console.warn("GAS webhook error:", e);
    }
  }

  // 2. Если указан токен бота напрямую — шлем карточку в Telegram с кнопками
  if (token && chatId) {
    try {
      const cleanPhone = booking.phone.replace(/[^0-9]/g, "");
      const formattedDate = formatDateRu(booking.date);
      const text = 
        "🎉 *НОВАЯ ЗАЯВКА НА ПРАЗДНИК В ДРЦ «МАКСИК»*\n" +
        "━━━━━━━━━━━━━━━━━━━━━━\n" +
        "🆔 *Номер:* #" + booking.id + "\n" +
        "📅 *Дата:* " + formattedDate + " (" + booking.date + ")\n" +
        "⏰ *Время:* " + booking.time + "\n" +
        "🎁 *Тариф:* " + booking.packageName + "\n" +
        "👶 *Детей:* " + booking.kidsCount + " чел.\n" +
        (booking.addons && booking.addons.length ? "🎪 *Дополнительно:* " + booking.addons.join(", ") + "\n" : "") +
        "💰 *Сумма:* " + booking.totalPrice.toLocaleString("ru-RU") + " ₽\n\n" +
        "👤 *Заказчик:* " + booking.parentName + "\n" +
        "📞 *Телефон:* " + booking.phone + "\n" +
        (booking.notes ? "📝 *Пожелания:* " + booking.notes + "\n" : "") +
        "━━━━━━━━━━━━━━━━━━━━━━\n" +
        "Подтвердить бронь и занести дату в Google Таблицу?";

      const keyboard = {
        inline_keyboard: [
          [
            { text: "✅ Подтвердить бронь", callback_data: "CONFIRM:" + booking.id },
            { text: "❌ Отклонить", callback_data: "REJECT:" + booking.id }
          ],
          [
            { text: "💬 Написать в WhatsApp", url: "https://wa.me/" + cleanPhone },
            { text: "📊 Google Таблица", url: gsheetUrl }
          ]
        ]
      };

      await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
          reply_markup: keyboard
        })
      });
      console.log("Telegram notification sent successfully");
    } catch (err) {
      console.warn("Telegram sendMessage error:", err);
    }
  }
}

// -------------------------------------------------------------
// РЕАЛЬНАЯ АУТЕНТИФИКАЦИЯ (ЯНДЕКС ID И VK ID OAUTH)
// -------------------------------------------------------------
const VK_DEFAULT_APP_ID = "51829462";
const YANDEX_DEFAULT_CLIENT_ID = "cfcba2c1042d462ab3efd7527e1b4147";

function getVkAppId() {
  return localStorage.getItem("maxik_vk_app_id") || VK_DEFAULT_APP_ID;
}

function getYandexClientId() {
  return localStorage.getItem("maxik_yandex_client_id") || YANDEX_DEFAULT_CLIENT_ID;
}

function getInitials(name) {
  if (!name) return "М";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function startRealSocialAuth(provider) {
  if (provider === 'yandex') {
    // 1. Проверяем протокол (file:// не поддерживается политикой безопасности Яндекса)
    if (window.location.protocol === 'file:') {
      alert("⚠️ Настоящий Яндекс ID работает только по безопасному протоколу HTTPS.\n\nЛокальные файлы file:// блокируются политикой безопасности Яндекса.\nОткрываем ваш сайт на GitHub Pages, где подключен HTTPS!");
      window.location.href = "https://orinmaksim348-cloud.github.io/drc-maksik/";
      return;
    }

    const clientId = getYandexClientId();
    const currentUrl = new URL(window.location.href);
    const redirectUri = currentUrl.origin + currentUrl.pathname;

    const stateVal = "ya_" + Math.random().toString(36).substring(7);
    localStorage.setItem("oauth_state", stateVal);
    localStorage.setItem("oauth_provider", "yandex");

    const yandexUrl = "https://oauth.yandex.ru/authorize?response_type=token&client_id=" + clientId + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + stateVal;

    console.log("[Яндекс ID OAuth]", { clientId, redirectUri, yandexUrl });

    const width = 600, height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(yandexUrl, "yandex_oauth", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",status=no,toolbar=no,menubar=no");

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      window.location.href = yandexUrl;
    } else {
      showToast("Открыто окно авторизации Яндекс ID. Войдите в свой аккаунт...", "info");
    }

  } else if (provider === 'vk') {
    const appId = getVkAppId();
    if (!appId || appId === "51829462") {
      handleSocialLogin('vk');
      return;
    }
    const currentUrl = new URL(window.location.href);
    const redirectUri = currentUrl.origin + currentUrl.pathname;
    const stateVal = "vk_" + Math.random().toString(36).substring(7);
    localStorage.setItem("oauth_state", stateVal);
    localStorage.setItem("oauth_provider", "vk");
    const vkUrl = "https://oauth.vk.com/authorize?client_id=" + appId + "&display=popup&redirect_uri=" + encodeURIComponent(redirectUri) + "&response_type=token&scope=email&state=" + stateVal;
    window.open(vkUrl, "vk_oauth", "width=620,height=700");
  }
}

function checkOAuthCallback() {
  const hash = window.location.hash;
  if (hash && (hash.includes("access_token") || hash.includes("error"))) {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const accessToken = params.get("access_token");
    const userId = params.get("user_id");
    const email = params.get("email");
    const stateVal = params.get("state") || localStorage.getItem("oauth_state") || "";
    const provider = (stateVal && stateVal.startsWith("vk")) || userId ? "vk" : "yandex";

    // If inside popup, notify parent
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage({
          type: "OAUTH_SUCCESS",
          provider: provider,
          token: accessToken,
          userId: userId,
          email: email
        }, "*");
        window.close();
        return;
      } catch (e) {}
    }

    if (accessToken) {
      completeOAuthLogin(provider, accessToken, userId, email);
      history.replaceState(null, null, window.location.pathname);
    }
  }

  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "OAUTH_SUCCESS") {
      completeOAuthLogin(event.data.provider, event.data.token, event.data.userId, event.data.email);
    }
  });
}

async function completeOAuthLogin(provider, token, userId, email) {
  if (provider === 'yandex') {
    try {
      const res = await fetch("https://login.yandex.ru/info?format=json&oauth_token=" + token);
      if (res.ok) {
        const d = await res.json();
        const realName = d.real_name || d.display_name || ((d.first_name || '') + ' ' + (d.last_name || '')).trim() || "Пользователь Яндекс";
        const realEmail = d.default_email || email || "";
        const avatarUrl = d.default_avatar_id ? "https://avatars.yandex.net/get-yapic/" + d.default_avatar_id + "/islands-200" : "";

        // Извлекаем реальные номера телефонов из профиля Яндекс
        const userPhones = [];
        if (d.default_phone && d.default_phone.number) {
          userPhones.push(d.default_phone.number);
        }
        if (Array.isArray(d.phones)) {
          d.phones.forEach(p => {
            const num = typeof p === 'string' ? p : (p && p.number ? p.number : '');
            if (num && !userPhones.includes(num)) {
              userPhones.push(num);
            }
          });
        }
        const realPhone = userPhones.join(", "); // если телефона в Яндексе нет, остается пустым!

        state.user = {
          id: d.id || ("ya_" + Math.random().toString(36).substring(7)),
          name: realName,
          phone: realPhone,
          email: realEmail,
          avatar: avatarUrl,
          initials: getInitials(realName),
          provider: "Яндекс ID",
          providerType: "yandex",
          avatarColor: "bg-[#FC3F1D]",
          level: "Любимый гость",
          bonuses: 500,
          cardNumber: "MK-" + (d.id ? String(d.id).slice(-4) : "7821"),
          registeredAt: new Date().toISOString()
        };
        saveState();
        updateAuthUI();
        showToast("Добро пожаловать, " + realName + "! Вход через Яндекс ID выполнен (+500 бонусов)", "success");
        closeModal("authModal");
        return;
      }
    } catch (e) {
      console.warn("Yandex API fetch error:", e);
    }
    handleSocialLogin('yandex');

  } else if (provider === 'vk') {
    if (userId && token) {
      const script = document.createElement("script");
      const cbName = "vk_cb_" + Date.now();
      window[cbName] = function(res) {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
        if (res && res.response && res.response[0]) {
          const u = res.response[0];
          const realName = u.first_name + " " + u.last_name;
          state.user = {
            name: realName,
            phone: "",
            email: email || "",
            avatar: u.photo_200,
            initials: (u.first_name[0] || '') + (u.last_name[0] || ''),
            provider: "VK ID",
            providerType: "vk",
            avatarColor: "bg-[#0077FF]",
            bonuses: 500,
            cardNumber: "MK-" + String(userId).slice(-4),
            registeredAt: new Date().toISOString()
          };
          saveState();
          updateAuthUI();
          showToast("Добро пожаловать, " + realName + "! Вход через VK ID выполнен (+500 бонусов)", "success");
          closeModal("authModal");
        } else {
          handleSocialLogin('vk');
        }
      };
      script.src = "https://api.vk.com/method/users.get?user_ids=" + userId + "&fields=photo_200,first_name,last_name&access_token=" + token + "&v=5.131&callback=" + cbName;
      document.body.appendChild(script);
    } else {
      handleSocialLogin('vk');
    }
  }
}

// -------------------------------------------------------------
// МОДАЛЬНОЕ ОКНО ИНТЕГРАЦИЙ (TELEGRAM & OAUTH)
// -------------------------------------------------------------
function openIntegrationsModal() {
  const tokenInput = document.getElementById("cfgTelegramBotToken");
  const chatIdInput = document.getElementById("cfgTelegramChatId");
  const gasInput = document.getElementById("cfgGasWebhookUrl");
  const yandexInput = document.getElementById("cfgYandexClientId");
  const vkInput = document.getElementById("cfgVkAppId");
  const gsheetInput = document.getElementById("cfgGSheetUrl");

  if (tokenInput) tokenInput.value = localStorage.getItem("maxik_telegram_token") || "";
  if (chatIdInput) chatIdInput.value = localStorage.getItem("maxik_telegram_chat_id") || "";
  if (gasInput) gasInput.value = localStorage.getItem("maxik_gas_url") || "";
  if (yandexInput) yandexInput.value = getYandexClientId();
  if (vkInput) vkInput.value = getVkAppId();
  if (gsheetInput) gsheetInput.value = localStorage.getItem("maxik_gsheet_url") || GOOGLE_SHEET_DEFAULT_URL;

  openModal("integrationsModal");
}

function saveIntegrationsConfig() {
  const tokenInput = document.getElementById("cfgTelegramBotToken");
  const chatIdInput = document.getElementById("cfgTelegramChatId");
  const gasInput = document.getElementById("cfgGasWebhookUrl");
  const yandexInput = document.getElementById("cfgYandexClientId");
  const vkInput = document.getElementById("cfgVkAppId");
  const gsheetInput = document.getElementById("cfgGSheetUrl");

  if (tokenInput) localStorage.setItem("maxik_telegram_token", tokenInput.value.trim());
  if (chatIdInput) localStorage.setItem("maxik_telegram_chat_id", chatIdInput.value.trim());
  if (gasInput) localStorage.setItem("maxik_gas_url", gasInput.value.trim());
  if (yandexInput) localStorage.setItem("maxik_yandex_client_id", yandexInput.value.trim());
  if (vkInput) localStorage.setItem("maxik_vk_app_id", vkInput.value.trim());
  if (gsheetInput) {
    const sheetVal = gsheetInput.value.trim();
    localStorage.setItem("maxik_gsheet_url", sheetVal || GOOGLE_SHEET_DEFAULT_URL);
    fetchScheduleFromGoogleSheets(sheetVal || GOOGLE_SHEET_DEFAULT_URL, false);
  }

  showToast("Все настройки интеграций успешно сохранены!", "success");
  closeModal("integrationsModal");
}

async function testTelegramAlert() {
  const tokenInput = document.getElementById("cfgTelegramBotToken");
  const chatIdInput = document.getElementById("cfgTelegramChatId");
  const statusSpan = document.getElementById("telegramTestStatus");

  const token = (tokenInput ? tokenInput.value.trim() : "") || getTelegramBotToken();
  const chatId = (chatIdInput ? chatIdInput.value.trim() : "") || getTelegramChatId();

  if (!token || !chatId) {
    showToast("Пожалуйста, заполните токен бота и ваш Chat ID", "error");
    if (statusSpan) statusSpan.textContent = "❌ Укажите токен и Chat ID";
    return;
  }

  if (statusSpan) statusSpan.textContent = "Отправка...";

  try {
    const res = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "👋 *Тестовое сообщение от сайта ДРЦ «Максик»!*\n\nСвязь с Telegram ботом успешно установлена. Сюда будут приходить все заявки на дни рождения для согласования!",
        parse_mode: "Markdown"
      })
    });
    const data = await res.json();
    if (data.ok) {
      showToast("Тестовое уведомление успешно отправлено в ваш Telegram!", "success");
      if (statusSpan) statusSpan.textContent = "✅ Доставлено!";
    } else {
      showToast("Ошибка Telegram: " + (data.description || "неверный токен"), "error");
      if (statusSpan) statusSpan.textContent = "❌ " + (data.description || "ошибка");
    }
  } catch (err) {
    showToast("Не удалось подключиться к Telegram API", "error");
    if (statusSpan) statusSpan.textContent = "❌ Ошибка сети";
  }
}
