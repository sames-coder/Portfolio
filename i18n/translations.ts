export type Locale = "en" | "uz" | "ru";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" }, { code: "uz", label: "UZ" }, { code: "ru", label: "RU" },
];

export const translations = {
  en: {
    nav: ["About", "Projects", "Experience", "Skills", "Contact"], available: "Available for projects",
    portfolio: "Android developer portfolio / 2026", explore: "View selected work", meet: "About me", drag: "Rotate the Android", realtime: "Interactive 3D",
    about: "About", aboutKicker: "Product-minded Android engineer", practice: "Years in Android", shipped: "Apps shipped", focus: "Primary focus", focusValue: "Mobile products", detail: "I work across the full Android lifecycle: translating business goals into maintainable Kotlin code, building adaptive UI systems, and improving quality through testing, performance work and disciplined delivery.", aboutProof: ["Product architecture", "Compose UI systems", "Reliable delivery"],
    projects: "Selected applications", projectsTitle: "Mobile products,", projectsAccent: "built for real life.", projectHint: "Swipe through app screens", viewCase: "View case study",
    experience: "Experience", experienceTitle: "Teams, products and", experienceAccent: "measurable impact.", present: "Current role",
    skills: "Android toolkit", skillsTitle: "A connected", skillsAccent: "engineering system.", skillsHint: "Move to explore the skill constellation",
    education: "Education", educationHint: "Formal foundations · continuous practice",
    contact: "Start a conversation", contactTitle: "Building an Android product?", contactAccent: "Let’s make it exceptional.", contactNote: "Available for product teams that value thoughtful engineering, sharp execution and long-term quality.", contactDirect: "Direct email", back: "Back to top",
  },
  uz: {
    nav: ["Men haqimda", "Loyihalar", "Tajriba", "Ko‘nikmalar", "Aloqa"], available: "Yangi loyihalar uchun ochiq",
    portfolio: "Android dasturchi portfoliosi / 2026", explore: "Loyihalarni ko‘rish", meet: "Men haqimda", drag: "Androidni aylantiring", realtime: "Interaktiv 3D",
    about: "Men haqimda", aboutKicker: "Mahsulotga yo‘naltirilgan Android muhandis", practice: "Android tajribasi", shipped: "Yaratilgan ilovalar", focus: "Asosiy yo‘nalish", focusValue: "Mobil mahsulotlar", detail: "Android mahsulotining to‘liq hayotiy siklida ishlayman: biznes maqsadlarini qo‘llab-quvvatlash oson Kotlin kodiga aylantiraman, moslashuvchan UI tizimlarini yarataman hamda test, unumdorlik va tartibli reliz jarayoni orqali sifatni oshiraman.", aboutProof: ["Mahsulot arxitekturasi", "Compose UI tizimlari", "Ishonchli reliz"],
    projects: "Tanlangan ilovalar", projectsTitle: "Haqiqiy hayot uchun", projectsAccent: "mobil mahsulotlar.", projectHint: "Ilova ekranlarini aylantiring", viewCase: "Loyiha tafsilotlari",
    experience: "Tajriba", experienceTitle: "Jamoalar, mahsulotlar va", experienceAccent: "o‘lchanadigan natija.", present: "Hozirgi faoliyat",
    skills: "Android texnologiyalari", skillsTitle: "Yagona mukammal", skillsAccent: "muhandislik tizimi.", skillsHint: "Ko‘nikmalar tizimini o‘rganish uchun harakatlantiring",
    education: "Ta’lim", educationHint: "Mustahkam bilim · doimiy rivojlanish",
    contact: "Bog‘lanish", contactTitle: "Android mahsulot quryapsizmi?", contactAccent: "Uni mukammal qilamiz.", contactNote: "Puxta muhandislik, aniq ijro va uzoq muddatli sifatni qadrlaydigan mahsulot jamoalari bilan ishlashga tayyorman.", contactDirect: "To‘g‘ridan-to‘g‘ri email", back: "Yuqoriga",
  },
  ru: {
    nav: ["Обо мне", "Проекты", "Опыт", "Навыки", "Контакты"], available: "Открыт для новых проектов",
    portfolio: "Портфолио Android-разработчика / 2026", explore: "Смотреть проекты", meet: "Обо мне", drag: "Вращайте Android", realtime: "Интерактивный 3D",
    about: "Обо мне", aboutKicker: "Android-инженер с продуктовым мышлением", practice: "Лет в Android", shipped: "Выпущено приложений", focus: "Главный фокус", focusValue: "Мобильные продукты", detail: "Работаю со всем жизненным циклом Android-продукта: превращаю бизнес-цели в поддерживаемый Kotlin-код, создаю адаптивные UI-системы и повышаю качество через тестирование, оптимизацию и дисциплинированные релизы.", aboutProof: ["Архитектура продукта", "Compose UI-системы", "Надежный релиз"],
    projects: "Избранные приложения", projectsTitle: "Мобильные продукты", projectsAccent: "для реальной жизни.", projectHint: "Листайте экраны приложений", viewCase: "Открыть кейс",
    experience: "Опыт", experienceTitle: "Команды, продукты и", experienceAccent: "измеримый результат.", present: "Текущая роль",
    skills: "Android инструменты", skillsTitle: "Единая", skillsAccent: "инженерная система.", skillsHint: "Двигайте, чтобы изучить систему навыков",
    education: "Образование", educationHint: "Сильная база · постоянное развитие",
    contact: "Начнем разговор", contactTitle: "Создаете Android-продукт?", contactAccent: "Сделаем его выдающимся.", contactNote: "Открыт к сотрудничеству с продуктовыми командами, которые ценят инженерную точность, скорость и долгосрочное качество.", contactDirect: "Прямой email", back: "Наверх",
  },
} as const;

export const contentTranslations = {
  en: {
    role: "Android Product Engineer", heroLead: "Android Developer.", heroAccent: "I build mobile products.",
    intro: "I design and ship reliable Android applications with Kotlin, Jetpack Compose and clean architecture — from first architecture decisions to polished releases.",
    about: "I turn product ideas into production-ready Android applications — shaping architecture, polished Compose interfaces and reliable releases through one focused engineering process.",
    philosophy: "Clear architecture. Native experience. Reliable delivery.",
    projects: [
      { category: "Personal finance", summary: "A calm personal finance companion with instant insights, smart budgets and secure offline-first data." },
      { category: "Travel & discovery", summary: "An adaptive travel companion that keeps routes, places and essential trip details available everywhere." },
      { category: "Health technology", summary: "A privacy-minded wellbeing tracker designed around useful patterns instead of overwhelming metrics." },
    ],
    experience: [
      { role: "Senior Android Developer", companyAbout: "A focused mobile product practice partnering with ambitious digital teams.", summary: "Leading Android products from architecture and design systems to store-ready delivery, observability and iterative growth." },
      { role: "Android Developer", companyAbout: "A multidisciplinary studio building consumer and enterprise mobile applications.", summary: "Built modular Kotlin applications, migrated legacy screens to Compose and improved release reliability across multiple products." },
      { role: "Junior Android Engineer", companyAbout: "Product engineering team delivering connected services for regional businesses.", summary: "Delivered core application features, offline-first data flows, API integrations and a reusable UI component library." },
    ],
    education: [{ degree: "BSc, Software Engineering", note: "Software architecture, distributed systems and human-computer interaction." }, { degree: "Continuous Learning", note: "Creative coding, real-time graphics, product strategy and emerging web standards." }],
  },
  uz: {
    role: "Android Product Engineer", heroLead: "Android dasturchi.", heroAccent: "Mobil mahsulotlar yarataman.",
    intro: "Kotlin, Jetpack Compose va Clean Architecture asosida tez, barqaror va kengayuvchan Android ilovalarni loyihalayman hamda production’ga olib chiqaman.",
    about: "Mahsulot g‘oyalarini production darajadagi Android ilovalarga aylantiraman — arxitektura, puxta Compose interfeyslari va ishonchli relizlarni yagona muhandislik jarayonida boshqaraman.",
    philosophy: "Aniq arxitektura. Tabiiy tajriba. Ishonchli reliz.",
    projects: [
      { category: "Shaxsiy moliya", summary: "Tezkor tahlil, aqlli budjet va xavfsiz offline ma’lumotlarga ega sodda moliyaviy yordamchi." },
      { category: "Sayohat va kashfiyot", summary: "Yo‘nalishlar, joylar va muhim sayohat ma’lumotlarini istalgan joyda saqlaydigan moslashuvchan yordamchi." },
      { category: "Sog‘liq texnologiyasi", summary: "Ortiqcha raqamlar o‘rniga foydali odat va tendensiyalarni ko‘rsatadigan maxfiylikka yo‘naltirilgan kuzatuvchi." },
    ],
    experience: [
      { role: "Senior Android Developer", companyAbout: "Kuchli raqamli jamoalar bilan ishlaydigan mobil mahsulot laboratoriyasi.", summary: "Android mahsulotlarini arxitektura va dizayn tizimidan store relizi, monitoring hamda rivojlantirishgacha boshqaraman." },
      { role: "Android Developer", companyAbout: "B2C va korporativ mobil ilovalar yaratuvchi ko‘p yo‘nalishli studio.", summary: "Modulli Kotlin ilovalari yaratdim, eski ekranlarni Compose’ga ko‘chirdim va relizlar barqarorligini oshirdim." },
      { role: "Junior Android Engineer", companyAbout: "Hududiy bizneslar uchun bog‘langan xizmatlar ishlab chiquvchi mahsulot jamoasi.", summary: "Asosiy funksiyalar, offline-first ma’lumot oqimlari, API integratsiyalari va qayta ishlatiladigan UI kutubxonasini yaratdim." },
    ],
    education: [{ degree: "Dasturiy injiniring bakalavri", note: "Dasturiy arxitektura, taqsimlangan tizimlar va inson-kompyuter o‘zaro aloqasi." }, { degree: "Doimiy ta’lim", note: "Creative coding, real-time grafika, mahsulot strategiyasi va yangi web standartlari." }],
  },
  ru: {
    role: "Android Product Engineer", heroLead: "Android-разработчик.", heroAccent: "Создаю мобильные продукты.",
    intro: "Проектирую и выпускаю надежные Android-приложения на Kotlin и Jetpack Compose с чистой масштабируемой архитектурой.",
    about: "Превращаю продуктовые идеи в готовые к production Android-приложения — объединяю архитектуру, продуманные Compose-интерфейсы и надежные релизы в одном инженерном процессе.",
    philosophy: "Ясная архитектура. Нативный опыт. Надежный релиз.",
    projects: [
      { category: "Личные финансы", summary: "Спокойный финансовый помощник с быстрыми подсказками, умными бюджетами и безопасной offline-first архитектурой." },
      { category: "Путешествия", summary: "Адаптивный гид, который сохраняет маршруты, места и важные детали поездки доступными везде." },
      { category: "Health-tech", summary: "Приватный трекер самочувствия, сфокусированный на полезных закономерностях, а не на перегрузке метриками." },
    ],
    experience: [
      { role: "Senior Android Developer", companyAbout: "Мобильная продуктовая лаборатория для амбициозных цифровых команд.", summary: "Веду Android-продукты от архитектуры и дизайн-систем до публикации, наблюдаемости и развития продукта." },
      { role: "Android Developer", companyAbout: "Мультидисциплинарная студия мобильных приложений для пользователей и бизнеса.", summary: "Создавал модульные Kotlin-приложения, переносил legacy-экраны на Compose и повышал надежность релизов." },
      { role: "Junior Android Engineer", companyAbout: "Продуктовая команда, создающая цифровые сервисы для регионального бизнеса.", summary: "Разрабатывал ключевые функции, offline-first потоки данных, API-интеграции и библиотеку UI-компонентов." },
    ],
    education: [{ degree: "Бакалавр программной инженерии", note: "Архитектура ПО, распределенные системы и взаимодействие человека с компьютером." }, { degree: "Непрерывное обучение", note: "Creative coding, графика реального времени, продуктовая стратегия и новые веб-стандарты." }],
  },
} as const;
