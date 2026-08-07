export const SITE_CONTENT = {
  appName: 'Traveler Store',
  brandTagline: 'رفيقك المثالي في كل رحلة',

  nav: {
    home: 'الرئيسية',
    products: 'المنتجات',
    services: 'الخدمات',
    contact: 'اتصل بنا',
    orders: 'طلباتي',
    adminPanel: 'لوحة تحكم الأدمن',
  },

  footer: {
    aboutTitle: 'معلومات عنا',
    aboutText: 'نحن متجر على الإنترنت نقدم أفضل مستلزمات السفر والرحلات ذات الجودة العالية والتسليم السريع',
    accountTitle: 'الحساب',
    linksTitle: 'الروابط',
    contactTitle: 'اتصل بنا',
    accountLinks: [
      { to: '/login', label: 'تسجيل الدخول' },
      { to: '/register', label: 'إنشاء حساب' },
      { to: '/products', label: 'المنتجات' },
    ],
    footerLinks: [
      { to: '/services', label: 'الخدمات' },
      { to: '/#features', label: 'أساسيات السفر' },
      { to: '/#latest', label: 'أحدث المستلزمات' },
      { to: '/contact', label: 'اتصل بنا' },
    ],
    contactItems: [
      { icon: 'fa-solid fa-phone text-gold-400', text: '+1235654399' },
      { icon: 'fa-solid fa-phone text-gold-400', text: '+1028753974' },
      { icon: 'fa-solid fa-envelope text-gold-400', text: 'travelerStore2025@gmail.com' },
      { icon: 'fa-solid fa-location-dot text-gold-400', text: 'كفر الشيخ - مصر' },
    ],
    copyright: 'جميع الحقوق محفوظة Traveler Store © 2025 - 2026',
  },

  home: {
    hero: {
      badge: ' رفيقك المثالي في كل رحلة',
      title: 'الحق رحلتك واطلب دلوقتي',
      description: 'كل حاجة لرحلتك هتلاقيها في مكان واحد وبأفضل سعر',
      description2: 'رفيقك المثالي في كل رحلة',
      cta: '→ تسوق الان',
    },
    offer: {
      badge: 'متوفر حصرياً علي Traveler Store',
      title: 'طقم السفر الأساسي',
      description:
        'شنطة سفر صغيرة / شاحن بطارية / باور بنك / محفظة / سماعات رأس / وسادة رقبة للسفر / شنطة شفافة لأدوات العناية الشخصية / شواحن ومحوّل كهرباء / شنطة أدوات شخصية / قناع نوم / شبشب مريح / زجاجة مياه ستانلس',
      cta: '→ اشترى الاّن',
    },
    brands: [
      { name: 'أديداس', image: '/images/brands/Adidas.png' },
      { name: 'بوما', image: '/images/brands/Puma.png' },
      { name: 'Columbia', image: '/images/brands/Columbia.png' },
      { name: 'Nike', image: '/images/brands/Nike.png' },
    ],
  },

  services: {
    heroTitle: 'خدماتنا المميزة',
    heroDescription: 'نقدم لك تجربة تسوق متكاملة من اختيار المنتج لحد وصوله لباب بيتك',
    sectionTitle: 'الخدمات',
    items: [
      {
        icon: 'fa-solid fa-truck-fast',
        title: 'توصيل سريع ومجاني',
        desc: 'شحن مجاني لجميع الطلبات التي تزيد عن 5000 جنيه',
      },
      {
        icon: 'fa-solid fa-headset',
        title: 'خدمة العملاء 24/7',
        desc: 'فريق دعم متاح على مدار الساعة للرد على استفساراتك',
      },
      {
        icon: 'fa-solid fa-money-bill-transfer',
        title: 'ضمان استعادة الأموال',
        desc: 'نقوم باسترجاع الأموال خلال 30 يوم في حالة عدم الرضا',
      },
    ],
    whyTitle: 'ليه تختار Traveler Store؟',
    whyItems: [
      { icon: 'fa-solid fa-shield-halved', title: 'منتجات أصلية 100%', desc: 'كل منتجاتنا مضمونة الجودة والمصدر' },
      { icon: 'fa-solid fa-tags', title: 'أسعار تنافسية', desc: 'أفضل الأسعار مقارنة بالسوق مع عروض دورية' },
      { icon: 'fa-solid fa-box', title: 'تغليف آمن', desc: 'تغليف احترافي يحافظ على منتجاتك أثناء الشحن' },
    ],
    stats: [
      { number: '+15,000', label: 'عميل سعيد' },
      { number: '+500', label: 'منتج متنوع' },
      { number: '+98%', label: 'نسبة رضا العملاء' },
      { number: '24/7', label: 'دعم فني' },
    ],
    reviewsTitle: 'آراء عملائنا',
    reviewFormTitle: 'شاركنا رأيك',
    reviewSuccessTitle: 'شكراً لك!',
    reviewSuccessText: 'تم إرسال تعليقك بنجاح وسيتم مراجعته من قبل الإدارة قبل النشر.',
    ctaTitle: 'هل لديك استفسار؟',
    ctaDescription: 'فريق خدمة العملاء لدينا جاهز لمساعدتك على مدار الساعة',
    ctaButton: 'اتصل بنا الآن ←',
  },

  contact: {
    title: 'أرسل لنا رسالة',
    description: 'نحن هنا لمساعدتك، تواصل معنا وسنرد عليك في أقرب وقت',
    successTitle: 'تم إرسال رسالتك بنجاح!',
    successText: 'هيتواصل معاك فريق الدعم في أقرب وقت ممكن.',
    contactTitle: 'تواصل معنا',
    contactDescription: 'نحن دائماً هنا لخدمتك',
    mapTitle: 'موقعنا على الخريطة',
    socialLinks: ['facebook', 'instagram', 'twitter', 'youtube'],
  },

  auth: {
    login: {
      title: 'تسجيل الدخول',
      description: 'أهلاً بعودتك! سجّل دخولك لمتابعة رحلتك معنا',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      showPassword: 'إظهار',
      hidePassword: 'إخفاء',
      submitLoading: 'جاري تسجيل الدخول...',
      submit: 'تسجيل الدخول',
      footerText: 'مفيش حساب لسه؟',
      footerLink: 'أنشئ حساب جديد',
    },
    register: {
      title: 'إنشاء حساب جديد',
      description: 'انضم لينا وابدأ رحلتك معانا من دلوقتي',
      nameLabel: 'الاسم بالكامل',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      confirmPasswordLabel: 'تأكيد كلمة المرور',
      submitLoading: 'جاري إنشاء الحساب...',
      submit: 'إنشاء الحساب',
      footerText: 'عندك حساب بالفعل؟',
      footerLink: 'سجّل دخولك',
    },
    adminLogin: {
      title: 'تسجيل دخول الأدمن',
      description: 'هذه الصفحة مخصصة للمشرفين فقط',
      usernameLabel: 'اسم المستخدم',
      passwordLabel: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      backLink: 'العودة للمتجر',
    },
  },

  cart: {
    title: 'عربة التسوق',
    empty: 'عربة التسوق فارغة',
    explore: 'إستكشف المنتجات',
    checkout: 'شراء',
    total: 'الاجمالي',
  },
}
