export const topbarLinks = [
  {
    label: 'Партнерам',
    href: '/for-partners',
  },
  {
    label: 'База знаний',
    href: '/wiki',
  },
]

export const menu = [
  {
    label: 'Продукты',
    href: null,
    mobileIcon: 'subscriptions',
    children: [
      {
        label: 'Встречи',
        description:
          'Организуйте видеовстречи легко и быстро. Используйте интеллектуальные инструменты для совместной работы и сохраняйте фокус на важных задачах.',
        icon: 'meetings',
        href: '/video-conference',
      },
      {
        label: 'Мессенджер',
        description:
          'Обмен сообщениями в группах и персональных чатах в защищенном корпоративном решении.',
        icon: 'messenger',
        href: '/messenger-product',
      },
      {
        label: 'Почта',
        description:
          'Безопасная корпоративная почта и зашифрованные события календаря. Доступ по домену и настройки команд.',
        icon: 'mail',
        href: '/mail',
      },
      {
        label: 'Вебинары',
        description:
          'Планируйте вебинары и события, проводите трансляции с высокой надежностью и защитой контента.',
        icon: 'webinar',
        href: '/webinars',
      },
      {
        label: 'ИИ-Ассистент',
        description:
          'Ускоряйте задачи и коммуникацию с онлайн-ассистентом. Помогает подготовить ответы и документы.',
        icon: 'ai-assistant',
        href: '/ai-assistant',
      },
      {
        label: 'Диск и документы',
        description:
          'Загружайте документы, создавайте папки, настраивайте доступы и делитесь файлами внутри команды.',
        icon: 'drive',
        href: '/iva360-disk',
      },
      {
        label: 'Интерактивная доска',
        description:
          'Онлайн-доска для командной работы: визуальные обсуждения, совместное планирование и идеи.',
        icon: 'boards',
        href: '/whiteboard',
      },
      {
        label: 'Онлайн-трансляции',
        description:
          'Организуйте трансляции под ключ: подготовка, запись и качественные материалы для аудитории.',
        icon: 'online-broadcasts',
        href: '/online-broadcasts',
      },
    ],
  },
  {
    label: 'Подписки',
    href: '/tariffs',
    mobileIcon: 'subscriptions',
    children: [],
  },
  {
    label: 'Отрасли',
    href: null,
    mobileIcon: 'industries',
    children: [
      {
        label: 'Малому и среднему бизнесу',
        description:
          'Простой и быстрый способ внедрить профрешение в компании без установки и участия системного администратора.',
        icon: 'none',
        href: '/for-small-business',
      },
      {
        label: 'Для крупного бизнеса',
        description:
          'Универсальное решение для мероприятий и встреч в компании: видеозвонки и мессенджер в одном',
        icon: 'none',
        href: '/enterprise',
      },
      {
        label: 'Для образовательных учреждений',
        description: 'Инструменты для онлайн-обучения, вебинаров и взаимодействия с учениками',
        icon: 'none',
        href: '/education',
      },
      {
        label: 'Для госсектора',
        description:
          'Безопасная цифровая среда для совещаний, веб-конференций и остальных внутренних коммуникаций',
        icon: 'none',
        href: '/gos',
      },
    ],
  },
  {
    label: 'Блог',
    href: '/blog',
    mobileIcon: 'blog',
    children: [
      {
        label: 'Все материалы',
        description:
          'Статьи, новости, кейсы и гайды о цифровых коммуникациях, продуктах IVA 360 и лучших практиках для команд',
        icon: 'none',
        href: '/blog',
      },
      {
        label: 'Статьи',
        description:
          'Экспертные материалы и полезные статьи о цифровых коммуникациях и развитии IVA 360',
        icon: 'none',
        href: '/blog/articles',
      },
      {
        label: 'Новости',
        description:
          'Следите за обновлениями IVA360: новости продукта, вебинары, экспертные материалы и практические разборы для команд',
        icon: 'none',
        href: '/blog/news',
      },
    ],
  },
  {
    label: 'Мероприятия',
    href: '/events',
    mobileIcon: 'events',
    children: [],
  },
]

export const heroSlides = [
  {
    imageAsset: 'hero-main.png',
    title: 'Платформа онлайн-коммуникаций',
    description: '',
    chips: [
      {
        label: 'Встречи',
        href: '/video-conference',
        icon: 'meetings',
      },
      {
        label: 'Мессенджер',
        href: '/messenger-product',
        icon: 'messenger',
      },
      {
        label: 'Почта',
        href: '/mail',
        icon: 'mail',
      },
      {
        label: 'Вебинары',
        href: '/webinars',
        icon: 'webinar',
      },
      {
        label: 'ИИ-Ассистент',
        href: '/ai-assistant',
        icon: 'ai-assistant',
      },
      {
        label: 'Диск и документы',
        href: '/iva360-disk',
        icon: 'drive',
      },
      {
        label: 'Интерактивная доска',
        href: '/whiteboard',
        icon: 'boards',
      },
      {
        label: 'Онлайн-трансляции',
        href: '/online-broadcasts',
        icon: 'online-broadcasts',
      },
    ],
    cta: {
      label: 'Попробовать бесплатно',
      href: '/register',
    },
    ctaSecondary: {
      label: 'Запросить Демо',
      href: '/contacts',
    },
  },
  {
    imageAsset: 'hero-admin.png',
    title: 'Пользовательское администрирование',
    description:
      'Отправляйте приглашения, настраивайте роли, права и доступы, проводите массовые операции, всё в единой панели',
    cta: {
      label: 'Подробнее',
      href: '/video-conference',
    },
  },
]

export const heroBadges = [
  {
    title: 'Реестр российского ПО',
    subtitle: '№ 14460 от 08.08.2022',
  },
  {
    title: 'Реестр «Операторов ПД»',
    subtitle: '№ 77-22-021676 от 06.05.2022',
  },
  {
    title: 'Свидетельство Роспатента',
    subtitle: '№ 2022660197 от 31.05.2022',
  },
  {
    title: 'Соответствуем требованиям ФСТЭК',
    subtitle: '№ 17, 21, 31, 239',
  },
]

export const tariffLines = [
  {
    key: 'meet',
    label: 'Встречи',
    icon: 'meet',
    withAi: true,
  },
  {
    key: 'webinar',
    label: 'Вебинары',
    icon: 'webinar',
    withAi: true,
  },
  {
    key: 'messenger',
    label: 'Мессенджер+',
    icon: 'chat',
    withAi: false,
  },
  {
    key: 'drive',
    label: 'Диск',
    icon: 'disk',
    withAi: false,
  },
  {
    key: 'mail',
    label: 'Почта',
    icon: 'mail',
    withAi: false,
  },
  {
    key: 'boards',
    label: 'Доски (Скоро)',
    icon: 'boards',
    withAi: false,
    disabled: true,
  },
]

export const durations = [
  {
    months: 3,
    discount: 0.035,
  },
  {
    months: 6,
    discount: 0.1,
  },
  {
    months: 12,
    discount: 0.2,
  },
]

export const consultation = {
  title: 'Удобнее подобрать тариф со специалистом?',
  text: 'Ответим на все ваши вопросы по тарифам, оборудованию и оплате',
  phone: '+7 495 648-66-73',
  cta: {
    label: 'Получить консультацию',
    href: '/contacts',
  },
}

export const plans = [
  {
    line: 'meet',
    order: 1,
    name: 'Пробный период',
    isTrial: true,
    products: [
      {
        icon: 'webinar',
      },
      {
        icon: 'messenger',
      },
      {
        icon: 'ai-assistant',
      },
      {
        icon: 'drive',
      },
      {
        icon: 'meetings',
      },
      {
        icon: 'mail',
      },
    ],
    features: [
      {
        text: 'Онлайн-подключений во всех мероприятиях:',
        value: '100',
      },
      {
        text: 'Одновременных вебинаров и встреч:',
        value: '4',
      },
      {
        text: 'Одновременных онлайн-подключений к вебинару:',
        value: '100',
      },
      {
        text: 'Всего пользователей компании:',
        value: 'до 10000',
      },
      {
        text: 'Техническая поддержка',
        value: '',
      },
      {
        text: 'API, LDAP, AD, SSO',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 2,
    name: '10 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 4799,
      },
      {
        duration: '6',
        price: 8987,
      },
      {
        duration: '12',
        price: 16041,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 3,
    name: '25 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 10750,
      },
      {
        duration: '6',
        price: 20132,
      },
      {
        duration: '12',
        price: 35932,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 4,
    name: '50 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 19683,
      },
      {
        duration: '6',
        price: 36860,
      },
      {
        duration: '12',
        price: 65788,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 5,
    name: '75 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 28537,
      },
      {
        duration: '6',
        price: 53442,
      },
      {
        duration: '12',
        price: 95385,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 6,
    name: '100 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 38863,
      },
      {
        duration: '6',
        price: 72779,
      },
      {
        duration: '12',
        price: 129897,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 7,
    name: '150 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 56561,
      },
      {
        duration: '6',
        price: 105922,
      },
      {
        duration: '12',
        price: 189052,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 8,
    name: '200 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 74779,
      },
      {
        duration: '6',
        price: 140040,
      },
      {
        duration: '12',
        price: 249945,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 9,
    name: '300 докладчиков',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 110782,
      },
      {
        duration: '6',
        price: 207462,
      },
      {
        duration: '12',
        price: 370281,
      },
    ],
    features: [
      {
        text: 'Неограниченная продолжительность и количество онлайн-встреч',
        value: '',
      },
      {
        text: 'Объём хранилища для видеозаписей',
        value: 'от 5 ГБ',
      },
      {
        text: 'ИИ-Ассистент: транскрибирует, формирует поручения',
        value: '',
      },
      {
        text: 'Онлайн-комнаты для групповой работы',
        value: '',
      },
      {
        text: 'Мгновенная запись видео',
        value: '',
      },
      {
        text: 'Демонстрация экрана и файлов',
        value: '',
      },
      {
        text: 'Одновременные видеопотоки +300 спикеров на одном экране',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'meet',
    order: 10,
    name: 'Для большого бизнеса',
    priceOnRequest: true,
    features: [
      {
        text: 'Формат поставки: PaaS, On-premise, Hybrid',
        value: '',
      },
      {
        text: 'Масштабируемость +1 000 000 пользователей',
        value: '',
      },
      {
        text: 'Персонализация интерфейса',
        value: '',
      },
      {
        text: 'Интеграция с IT-ландшафтом: IP-телефонией, доменной инфраструктурой, почтовыми серверами',
        value: '',
      },
      {
        text: 'Интеграция с системами аутентификации и авторизации: с LDAP, AD(FS), SSO, FreeIPA, KeyCloak, Mobile ID',
        value: '',
      },
      {
        text: 'Персонализированные уровни обслуживания',
        value: '',
      },
      {
        text: 'Геораспределённый серверный кластер',
        value: '',
      },
    ],
    cta: {
      label: 'Связаться',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 1,
    name: 'Пробный период',
    isTrial: true,
    products: [
      {
        icon: 'webinar',
      },
      {
        icon: 'messenger',
      },
      {
        icon: 'ai-assistant',
      },
      {
        icon: 'drive',
      },
      {
        icon: 'meetings',
      },
      {
        icon: 'mail',
      },
    ],
    features: [
      {
        text: 'Онлайн-подключений во всех мероприятиях:',
        value: '100',
      },
      {
        text: 'Одновременных вебинаров и встреч:',
        value: '4',
      },
      {
        text: 'Одновременных онлайн-подключений к вебинару:',
        value: '100',
      },
      {
        text: 'Всего пользователей компании:',
        value: 'до 10000',
      },
      {
        text: 'Техническая поддержка',
        value: '',
      },
      {
        text: 'API, LDAP, AD, SSO',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 2,
    name: '50 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 14616,
      },
      {
        duration: '6',
        price: 27372,
      },
      {
        duration: '12',
        price: 48854,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 3,
    name: '100 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 22219,
      },
      {
        duration: '6',
        price: 41609,
      },
      {
        duration: '12',
        price: 74265,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 4,
    name: '200 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 40578,
      },
      {
        duration: '6',
        price: 75990,
      },
      {
        duration: '12',
        price: 135628,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 5,
    name: '300 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 56834,
      },
      {
        duration: '6',
        price: 106433,
      },
      {
        duration: '12',
        price: 189964,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 6,
    name: '500 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 75081,
      },
      {
        duration: '6',
        price: 140604,
      },
      {
        duration: '12',
        price: 250953,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 7,
    name: '1000 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 117615,
      },
      {
        duration: '6',
        price: 220258,
      },
      {
        duration: '12',
        price: 393120,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 8,
    name: '2000 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 187624,
      },
      {
        duration: '6',
        price: 351364,
      },
      {
        duration: '12',
        price: 627120,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 9,
    name: '3000 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 254712,
      },
      {
        duration: '6',
        price: 477000,
      },
      {
        duration: '12',
        price: 851356,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 10,
    name: '5000 подключений в мероприятия',
    highlighted: true,
    prices: [
      {
        duration: '3',
        price: 332542,
      },
      {
        duration: '6',
        price: 622752,
      },
      {
        duration: '12',
        price: 1111497,
      },
    ],
    features: [
      {
        text: '5 000 онлайн-участников, до 50 000 с CDN',
        value: '',
      },
      {
        text: 'Мобильный веб-клиент без установки приложения',
        value: '',
      },
      {
        text: 'Трансляция на внешние платформы',
        value: '',
      },
      {
        text: 'Лендинг для регистрации на вебинар',
        value: '',
      },
      {
        text: 'Аналитика и отчеты по итогам вебинара',
        value: '',
      },
      {
        text: 'Инструменты модерации участников',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'webinar',
    order: 11,
    name: 'Для большого бизнеса',
    priceOnRequest: true,
    features: [
      {
        text: 'Формат поставки: PaaS, On-premise, Hybrid',
        value: '',
      },
      {
        text: 'Масштабируемость +1 000 000 пользователей',
        value: '',
      },
      {
        text: 'Персонализация интерфейса',
        value: '',
      },
      {
        text: 'Интеграция с IT-ландшафтом: IP-телефонией, доменной инфраструктурой, почтовыми серверами',
        value: '',
      },
      {
        text: 'Интеграция с системами аутентификации и авторизации: с LDAP, AD(FS), SSO, FreeIPA, KeyCloak, Mobile ID',
        value: '',
      },
      {
        text: 'Персонализированные уровни обслуживания',
        value: '',
      },
      {
        text: 'Геораспределённый серверный кластер',
        value: '',
      },
    ],
    cta: {
      label: 'Связаться',
      href: '/contacts',
    },
  },
  {
    line: 'messenger',
    order: 1,
    name: 'Пробный период',
    isTrial: true,
    products: [
      {
        icon: 'webinar',
      },
      {
        icon: 'messenger',
      },
      {
        icon: 'ai-assistant',
      },
      {
        icon: 'drive',
      },
      {
        icon: 'meetings',
      },
      {
        icon: 'mail',
      },
    ],
    features: [
      {
        text: 'Онлайн-подключений во всех мероприятиях:',
        value: '100',
      },
      {
        text: 'Одновременных вебинаров и встреч:',
        value: '4',
      },
      {
        text: 'Одновременных онлайн-подключений к вебинару:',
        value: '100',
      },
      {
        text: 'Всего пользователей компании:',
        value: 'до 10000',
      },
      {
        text: 'Техническая поддержка',
        value: '',
      },
      {
        text: 'API, LDAP, AD, SSO',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
  },
  {
    line: 'messenger',
    order: 2,
    name: 'Мессенджер+',
    highlighted: true,
    unit: {
      label: 'Пользователей мессенджера',
      unitRates: [
        {
          duration: '3',
          unitPrice: 600.275,
          fixedPrice: 921.25,
        },
        {
          duration: '6',
          unitPrice: 1124.15,
          fixedPrice: 1842.5,
        },
        {
          duration: '12',
          unitPrice: 2006.4,
          fixedPrice: 3686,
        },
      ],
      min: 10,
      max: 10000,
      step: 5,
      defaultCount: 10,
    },
    prices: [
      {
        duration: '3',
        price: 6924,
      },
      {
        duration: '6',
        price: 6924,
      },
      {
        duration: '12',
        price: 23750,
      },
    ],
    features: [
      {
        text: 'Пользователей мессенджераот 10',
        value: '',
      },
      {
        text: 'Обмен файлами без ограничений по типу и объему',
        value: '',
      },
      {
        text: 'Приватные и групповые чаты',
        value: '',
      },
      {
        text: 'Индивидуальные и групповые аудио- и видеозвонки',
        value: '',
      },
      {
        text: 'Клиентские приложения: веб, мобильные и десктопные',
        value: '',
      },
      {
        text: 'Предварительный просмотр документов и медиафайлов',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'messenger',
    order: 3,
    name: 'Для большого бизнеса',
    priceOnRequest: true,
    features: [
      {
        text: 'Формат поставки: PaaS, On-premise, Hybrid',
        value: '',
      },
      {
        text: 'Масштабируемость +1 000 000 пользователей',
        value: '',
      },
      {
        text: 'Персонализация интерфейса',
        value: '',
      },
      {
        text: 'Интеграция с IT-ландшафтом: IP-телефонией, доменной инфраструктурой, почтовыми серверами',
        value: '',
      },
      {
        text: 'Интеграция с системами аутентификации и авторизации: с LDAP, AD(FS), SSO, FreeIPA, KeyCloak, Mobile ID',
        value: '',
      },
      {
        text: 'Персонализированные уровни обслуживания',
        value: '',
      },
      {
        text: 'Геораспределённый серверный кластер',
        value: '',
      },
    ],
    cta: {
      label: 'Связаться',
      href: '/contacts',
    },
  },
  {
    line: 'drive',
    order: 1,
    name: 'Пробный период',
    isTrial: true,
    products: [
      {
        icon: 'webinar',
      },
      {
        icon: 'messenger',
      },
      {
        icon: 'ai-assistant',
      },
      {
        icon: 'drive',
      },
      {
        icon: 'meetings',
      },
      {
        icon: 'mail',
      },
    ],
    features: [
      {
        text: 'Онлайн-подключений во всех мероприятиях:',
        value: '100',
      },
      {
        text: 'Одновременных вебинаров и встреч:',
        value: '4',
      },
      {
        text: 'Одновременных онлайн-подключений к вебинару:',
        value: '100',
      },
      {
        text: 'Всего пользователей компании:',
        value: 'до 10000',
      },
      {
        text: 'Техническая поддержка',
        value: '',
      },
      {
        text: 'API, LDAP, AD, SSO',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
  },
  {
    line: 'drive',
    order: 2,
    name: 'Диск',
    highlighted: true,
    unit: {
      label: 'Пользователи диска',
      unitRates: [
        {
          duration: '3',
          unitPrice: 163.7,
          fixedPrice: 1034,
        },
        {
          duration: '6',
          unitPrice: 328.7,
          fixedPrice: 1936,
        },
        {
          duration: '12',
          unitPrice: 660,
          fixedPrice: 3456,
        },
      ],
      min: 50,
      max: 1000,
      step: 10,
      defaultCount: 50,
    },
    prices: [
      {
        duration: '3',
        price: 9219,
      },
      {
        duration: '6',
        price: 18371,
      },
      {
        duration: '12',
        price: 36456,
      },
    ],
    features: [
      {
        text: 'Объем дискового пространства:от 50 ГБ',
        value: '',
      },
      {
        text: 'Встроенный просмотр аудио- и видеофайлов',
        value: '',
      },
      {
        text: 'Настройка прав доступа к файлам и папкам',
        value: '',
      },
      {
        text: 'Корпоративные политики и управления файлами',
        value: '',
      },
      {
        text: 'Онлайн-редактирование документов, таблиц и презентаций: DOCX, XLSX, PPTX…',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'drive',
    order: 3,
    name: 'Для большого бизнеса',
    priceOnRequest: true,
    features: [
      {
        text: 'Формат поставки: PaaS, On-premise, Hybrid',
        value: '',
      },
      {
        text: 'Масштабируемость +1 000 000 пользователей',
        value: '',
      },
      {
        text: 'Персонализация интерфейса',
        value: '',
      },
      {
        text: 'Интеграция с IT-ландшафтом: IP-телефонией, доменной инфраструктурой, почтовыми серверами',
        value: '',
      },
      {
        text: 'Интеграция с системами аутентификации и авторизации: с LDAP, AD(FS), SSO, FreeIPA, KeyCloak, Mobile ID',
        value: '',
      },
      {
        text: 'Персонализированные уровни обслуживания',
        value: '',
      },
      {
        text: 'Геораспределённый серверный кластер',
        value: '',
      },
    ],
    cta: {
      label: 'Связаться',
      href: '/contacts',
    },
  },
  {
    line: 'mail',
    order: 1,
    name: 'Пробный период',
    isTrial: true,
    products: [
      {
        icon: 'webinar',
      },
      {
        icon: 'messenger',
      },
      {
        icon: 'ai-assistant',
      },
      {
        icon: 'drive',
      },
      {
        icon: 'meetings',
      },
      {
        icon: 'mail',
      },
    ],
    features: [
      {
        text: 'Онлайн-подключений во всех мероприятиях:',
        value: '100',
      },
      {
        text: 'Одновременных вебинаров и встреч:',
        value: '4',
      },
      {
        text: 'Одновременных онлайн-подключений к вебинару:',
        value: '100',
      },
      {
        text: 'Всего пользователей компании:',
        value: 'до 10000',
      },
      {
        text: 'Техническая поддержка',
        value: '',
      },
      {
        text: 'API, LDAP, AD, SSO',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
  },
  {
    line: 'mail',
    order: 2,
    name: 'Почта',
    highlighted: true,
    unit: {
      label: 'Почтовых адресов',
      unitRates: [
        {
          duration: '3',
          unitPrice: 491.1,
          fixedPrice: 395,
        },
        {
          duration: '6',
          unitPrice: 986.1,
          fixedPrice: 753,
        },
        {
          duration: '12',
          unitPrice: 1980,
          fixedPrice: 1260,
        },
      ],
      min: 10,
      max: 1000,
      step: 5,
      defaultCount: 50,
    },
    prices: [
      {
        duration: '3',
        price: 24950,
      },
      {
        duration: '6',
        price: 50058,
      },
      {
        duration: '12',
        price: 100260,
      },
    ],
    features: [
      {
        text: 'Количество почтовых ящиков от10',
        value: '',
      },
      {
        text: 'Объём почтового хранилища от5 ГБ',
        value: '',
      },
      {
        text: 'Централизованное управление корпоративными подписями',
        value: '',
      },
      {
        text: 'Группы рассылки',
        value: '',
      },
      {
        text: 'Маршрутизация писем для несуществующих адресов',
        value: '',
      },
      {
        text: 'Почтовые политики: архивация, очистка спама, размер писем',
        value: '',
      },
      {
        text: 'Настройка квоты по ящикам пользователей',
        value: '',
      },
    ],
    cta: {
      label: 'Подключить',
      href: '/contacts',
    },
    ctaSecondary: {
      label: 'Настроить тариф',
      href: '/contacts',
    },
  },
  {
    line: 'mail',
    order: 3,
    name: 'Для большого бизнеса',
    priceOnRequest: true,
    features: [
      {
        text: 'Формат поставки: PaaS, On-premise, Hybrid',
        value: '',
      },
      {
        text: 'Масштабируемость +1 000 000 пользователей',
        value: '',
      },
      {
        text: 'Персонализация интерфейса',
        value: '',
      },
      {
        text: 'Интеграция с IT-ландшафтом: IP-телефонией, доменной инфраструктурой, почтовыми серверами',
        value: '',
      },
      {
        text: 'Интеграция с системами аутентификации и авторизации: с LDAP, AD(FS), SSO, FreeIPA, KeyCloak, Mobile ID',
        value: '',
      },
      {
        text: 'Персонализированные уровни обслуживания',
        value: '',
      },
      {
        text: 'Геораспределённый серверный кластер',
        value: '',
      },
    ],
    cta: {
      label: 'Связаться',
      href: '/contacts',
    },
  },
]
