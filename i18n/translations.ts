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
  },
  uz: {
    role: "Android Product Engineer", heroLead: "Android mahsulotlar.", heroAccent: "Har bir harakat tabiiy va oson.",
    intro: "Kotlin, Jetpack Compose va kengayuvchan arxitektura yordamida ishonchli va nafis mobil mahsulotlar yaratuvchi Android dasturchi.",
    about: "Men tez, tabiiy va puxta o‘ylangan Android ilovalarni loyihalayman va ishlab chiqaman. Mahsulot arxitekturasidan eng kichik animatsiyagacha — har bir qaror odamlar ishonadigan va zavq bilan ishlatadigan dastur yaratishga xizmat qiladi.",
    philosophy: "Murakkab muhandislik. Oson tajriba.",
  },
  ru: {
    role: "Android Product Engineer", heroLead: "Android-продукты.", heroAccent: "Сложные внутри, простые снаружи.",
    intro: "Android-разработчик, создающий надежные и элегантные мобильные продукты на Kotlin, Jetpack Compose и масштабируемой архитектуре.",
    about: "Я проектирую Android-приложения, которые ощущаются быстрыми, нативными и продуманными. От архитектуры продукта до мельчайшей анимации — каждое решение помогает создавать программы, которым доверяют и которыми приятно пользоваться.",
    philosophy: "Сложная инженерия. Легкий опыт.",
  },
} as const;
