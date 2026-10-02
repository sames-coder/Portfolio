export type Locale = "en" | "uz" | "ru";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" }, { code: "uz", label: "UZ" }, { code: "ru", label: "RU" },
];

export const translations = {
  en: {
    nav: ["About", "Projects", "Experience", "Skills", "Contact"], available: "Available for projects",
    portfolio: "Android portfolio / 2026", explore: "Explore applications", meet: "About the developer", drag: "Drag the ecosystem", realtime: "Real-time 3D",
    about: "About", practice: "Years in Android", shipped: "Apps shipped", focus: "Primary focus", focusValue: "Mobile products", detail: "I care about performance, resilient architecture and the small interaction details that turn a functional app into a product people want to keep.",
    projects: "Selected applications", projectsTitle: "Mobile products,", projectsAccent: "built for real life.", projectHint: "Swipe through app screens", viewCase: "View case study",
    experience: "Experience", experienceTitle: "Teams, products and", experienceAccent: "measurable impact.", present: "Current role",
    skills: "Android toolkit", skillsTitle: "A connected", skillsAccent: "engineering system.", skillsHint: "Move to explore the skill constellation",
    education: "Education", educationHint: "Formal foundations · continuous practice",
    contact: "Start a conversation", contactTitle: "Building an Android product?", contactAccent: "Let’s make it exceptional.", back: "Back to top",
  },
  uz: {
    nav: ["Men haqimda", "Loyihalar", "Tajriba", "Ko‘nikmalar", "Aloqa"], available: "Yangi loyihalar uchun ochiq",
    portfolio: "Android portfolio / 2026", explore: "Ilovalarni ko‘rish", meet: "Dasturchi haqida", drag: "Ekotizimni aylantiring", realtime: "Real-time 3D",
    about: "Men haqimda", practice: "Android tajribasi", shipped: "Yaratilgan ilovalar", focus: "Asosiy yo‘nalish", focusValue: "Mobil mahsulotlar", detail: "Men tezlik, mustahkam arxitektura va oddiy ilovani foydalanuvchi sevib ishlatadigan mahsulotga aylantiruvchi mayda interaksiyalarga e’tibor beraman.",
    projects: "Tanlangan ilovalar", projectsTitle: "Haqiqiy hayot uchun", projectsAccent: "mobil mahsulotlar.", projectHint: "Ilova ekranlarini aylantiring", viewCase: "Loyiha tafsilotlari",
    experience: "Tajriba", experienceTitle: "Jamoalar, mahsulotlar va", experienceAccent: "o‘lchanadigan natija.", present: "Hozirgi faoliyat",
    skills: "Android texnologiyalari", skillsTitle: "Yagona mukammal", skillsAccent: "muhandislik tizimi.", skillsHint: "Ko‘nikmalar tizimini o‘rganish uchun harakatlantiring",
    education: "Ta’lim", educationHint: "Mustahkam bilim · doimiy rivojlanish",
    contact: "Bog‘lanish", contactTitle: "Android mahsulot quryapsizmi?", contactAccent: "Uni mukammal qilamiz.", back: "Yuqoriga",
  },
  ru: {
    nav: ["Обо мне", "Проекты", "Опыт", "Навыки", "Контакты"], available: "Открыт для новых проектов",
    portfolio: "Android портфолио / 2026", explore: "Посмотреть приложения", meet: "О разработчике", drag: "Вращайте экосистему", realtime: "Real-time 3D",
    about: "Обо мне", practice: "Лет в Android", shipped: "Выпущено приложений", focus: "Главный фокус", focusValue: "Мобильные продукты", detail: "Мне важны производительность, надежная архитектура и детали взаимодействия, которые превращают функциональное приложение в любимый продукт.",
    projects: "Избранные приложения", projectsTitle: "Мобильные продукты", projectsAccent: "для реальной жизни.", projectHint: "Листайте экраны приложений", viewCase: "Открыть кейс",
    experience: "Опыт", experienceTitle: "Команды, продукты и", experienceAccent: "измеримый результат.", present: "Текущая роль",
    skills: "Android инструменты", skillsTitle: "Единая", skillsAccent: "инженерная система.", skillsHint: "Двигайте, чтобы изучить систему навыков",
    education: "Образование", educationHint: "Сильная база · постоянное развитие",
    contact: "Начнем разговор", contactTitle: "Создаете Android-продукт?", contactAccent: "Сделаем его выдающимся.", back: "Наверх",
  },
} as const;

export const contentTranslations = {
  en: {
    role: "Android Product Engineer", heroLead: "Android products.", heroAccent: "Engineered to feel effortless.",
    intro: "Android developer crafting reliable, elegant mobile products with Kotlin, Jetpack Compose and scalable architecture.",
    about: "I design and engineer Android applications that feel native, fast and thoughtfully composed. From product architecture to the smallest motion detail, every decision is made to create software people trust and enjoy using.",
    philosophy: "Complex engineering. Effortless experience.",
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
    role: "Android Product Engineer", heroLead: "Android mahsulotlar.", heroAccent: "Har bir harakat tabiiy va oson.",
    intro: "Kotlin, Jetpack Compose va kengayuvchan arxitektura yordamida ishonchli va nafis mobil mahsulotlar yaratuvchi Android dasturchi.",
    about: "Men tez, tabiiy va puxta o‘ylangan Android ilovalarni loyihalayman va ishlab chiqaman. Mahsulot arxitekturasidan eng kichik animatsiyagacha — har bir qaror odamlar ishonadigan va zavq bilan ishlatadigan dastur yaratishga xizmat qiladi.",
    philosophy: "Murakkab muhandislik. Oson tajriba.",
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
    role: "Android Product Engineer", heroLead: "Android-продукты.", heroAccent: "Сложные внутри, простые снаружи.",
    intro: "Android-разработчик, создающий надежные и элегантные мобильные продукты на Kotlin, Jetpack Compose и масштабируемой архитектуре.",
    about: "Я проектирую Android-приложения, которые ощущаются быстрыми, нативными и продуманными. От архитектуры продукта до мельчайшей анимации — каждое решение помогает создавать программы, которым доверяют и которыми приятно пользоваться.",
    philosophy: "Сложная инженерия. Легкий опыт.",
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
