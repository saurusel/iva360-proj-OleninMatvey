const translations = new Map([
  ['Поиск', 'Search'],
  ['Партнерам', 'Partners'],
  ['Контакты', 'Contacts'],
  ['База знаний', 'Knowledge base'],
  ['Корзина', 'Cart'],
  ['Войти', 'Sign in'],
  ['Вход', 'Sign in'],
  ['Регистрация', 'Sign up'],
  ['Продукты', 'Products'],
  ['Встречи', 'Meetings'],
  [
    'Организуйте видеовстречи легко и быстро. Используйте интеллектуальные инструменты для совместной работы и сохраняйте фокус на важных задачах.',
    'Run video meetings quickly and easily. Use intelligent collaboration tools and stay focused on what matters.',
  ],
  ['Мессенджер', 'Messenger'],
  [
    'Обмен сообщениями в группах и персональных чатах в защищенном корпоративном решении.',
    'Secure messaging in group and private chats for corporate teams.',
  ],
  ['Почта', 'Mail'],
  [
    'Безопасная корпоративная почта и зашифрованные события календаря. Доступ по домену и настройки команд.',
    'Secure corporate email and encrypted calendar events with domain access and team settings.',
  ],
  ['Вебинары', 'Webinars'],
  [
    'Планируйте вебинары и события, проводите трансляции с высокой надежностью и защитой контента.',
    'Plan webinars and events and run reliable broadcasts with protected content.',
  ],
  ['ИИ-Ассистент', 'AI Assistant'],
  [
    'Ускоряйте задачи и коммуникацию с онлайн-ассистентом. Помогает подготовить ответы и документы.',
    'Speed up tasks and communication with an online assistant that helps prepare responses and documents.',
  ],
  ['Диск и документы', 'Drive and documents'],
  [
    'Загружайте документы, создавайте папки, настраивайте доступы и делитесь файлами внутри команды.',
    'Upload documents, create folders, manage access and share files with your team.',
  ],
  ['Интерактивная доска', 'Interactive whiteboard'],
  [
    'Онлайн-доска для командной работы: визуальные обсуждения, совместное планирование и идеи.',
    'An online whiteboard for visual discussions, collaborative planning and ideas.',
  ],
  ['Онлайн-трансляции', 'Online broadcasts'],
  [
    'Организуйте трансляции под ключ: подготовка, запись и качественные материалы для аудитории.',
    'Run end-to-end broadcasts with preparation, recording and high-quality audience materials.',
  ],
  ['Подписки', 'Subscriptions'],
  ['Подписки на продукты', 'Product subscriptions'],
  ['Отрасли', 'Industries'],
  ['Малому и среднему бизнесу', 'Small and medium-sized businesses'],
  [
    'Простой и быстрый способ внедрить профрешение в компании без установки и участия системного администратора.',
    'A quick and simple way to introduce a professional solution without installation or a system administrator.',
  ],
  ['Для крупного бизнеса', 'For large businesses'],
  ['Для большого бизнеса', 'For large businesses'],
  [
    'Универсальное решение для мероприятий и встреч в компании: видеозвонки и мессенджер в одном',
    'An all-in-one solution for corporate events and meetings: video calls and messaging.',
  ],
  ['Для образовательных учреждений', 'For educational institutions'],
  [
    'Инструменты для онлайн-обучения, вебинаров и взаимодействия с учениками',
    'Tools for online learning, webinars and student engagement.',
  ],
  ['Для госсектора', 'For the public sector'],
  [
    'Безопасная цифровая среда для совещаний, веб-конференций и остальных внутренних коммуникаций',
    'A secure digital environment for meetings, web conferences and internal communications.',
  ],
  ['Блог', 'Blog'],
  ['Все материалы', 'All content'],
  [
    'Статьи, новости, кейсы и гайды о цифровых коммуникациях, продуктах IVA 360 и лучших практиках для команд',
    'Articles, news, case studies and guides about digital communications, IVA 360 products and team best practices.',
  ],
  ['Статьи', 'Articles'],
  [
    'Экспертные материалы и полезные статьи о цифровых коммуникациях и развитии IVA 360',
    'Expert insights and useful articles about digital communications and IVA 360.',
  ],
  ['Новости', 'News'],
  [
    'Следите за обновлениями IVA360: новости продукта, вебинары, экспертные материалы и практические разборы для команд',
    'Follow IVA 360 updates, product news, webinars, expert insights and practical team guides.',
  ],
  ['Мероприятия', 'Events'],
  ['Платформа онлайн-коммуникаций', 'Online communications platform'],
  ['Попробовать бесплатно', 'Try for free'],
  ['Запросить Демо', 'Request a demo'],
  ['Пользовательское администрирование', 'User administration'],
  [
    'Отправляйте приглашения, настраивайте роли, права и доступы, проводите массовые операции, всё в единой панели',
    'Send invitations, configure roles and permissions, and perform bulk operations from one dashboard.',
  ],
  ['Подробнее', 'Learn more'],
  ['Мессенджер+', 'Messenger+'],
  ['Диск', 'Drive'],
  ['Доски (Скоро)', 'Whiteboards (Coming soon)'],
  ['Удобнее подобрать тариф со специалистом?', 'Need help choosing a plan?'],
  [
    'Ответим на все ваши вопросы по тарифам, оборудованию и оплате',
    'We will answer your questions about plans, equipment and payment.',
  ],
  ['Получить консультацию', 'Get a consultation'],
  ['Пробный период', 'Free trial'],
  ['Онлайн-подключений во всех мероприятиях:', 'Online connections across all events:'],
  ['Одновременных вебинаров и встреч:', 'Concurrent webinars and meetings:'],
  ['Одновременных онлайн-подключений к вебинару:', 'Concurrent webinar connections:'],
  ['Всего пользователей компании:', 'Total company users:'],
  ['до 10000', 'up to 10,000'],
  ['Техническая поддержка', 'Technical support'],
  ['Подключить', 'Subscribe'],
  [
    'Неограниченная продолжительность и количество онлайн-встреч',
    'Unlimited online meeting duration and quantity',
  ],
  ['Объём хранилища для видеозаписей', 'Video recording storage'],
  ['от 5 ГБ', 'from 5 GB'],
  [
    'ИИ-Ассистент: транскрибирует, формирует поручения',
    'AI Assistant: transcribes meetings and creates action items',
  ],
  ['Онлайн-комнаты для групповой работы', 'Breakout rooms for group work'],
  ['Мгновенная запись видео', 'Instant video recording'],
  ['Демонстрация экрана и файлов', 'Screen and file sharing'],
  [
    'Одновременные видеопотоки +300 спикеров на одном экране',
    'Concurrent video streams with 300+ speakers on one screen',
  ],
  ['Настроить тариф', 'Configure plan'],
  ['Формат поставки: PaaS, On-premise, Hybrid', 'Deployment: PaaS, on-premises or hybrid'],
  ['Масштабируемость +1 000 000 пользователей', 'Scales to over 1,000,000 users'],
  ['Персонализация интерфейса', 'Interface customization'],
  [
    'Интеграция с IT-ландшафтом: IP-телефонией, доменной инфраструктурой, почтовыми серверами',
    'Integration with IP telephony, domain infrastructure and mail servers',
  ],
  [
    'Интеграция с системами аутентификации и авторизации: с LDAP, AD(FS), SSO, FreeIPA, KeyCloak, Mobile ID',
    'Authentication and authorization integrations: LDAP, AD(FS), SSO, FreeIPA, Keycloak and Mobile ID',
  ],
  ['Персонализированные уровни обслуживания', 'Personalized service levels'],
  ['Геораспределённый серверный кластер', 'Geo-distributed server cluster'],
  ['Связаться', 'Contact us'],
  ['5 000 онлайн-участников, до 50 000 с CDN', '5,000 online participants, up to 50,000 with CDN'],
  ['Мобильный веб-клиент без установки приложения', 'Mobile web client with no app installation'],
  ['Трансляция на внешние платформы', 'Streaming to external platforms'],
  ['Лендинг для регистрации на вебинар', 'Webinar registration landing page'],
  ['Аналитика и отчеты по итогам вебинара', 'Webinar analytics and reports'],
  ['Инструменты модерации участников', 'Participant moderation tools'],
  ['Пользователей мессенджера', 'Messenger users'],
  ['Пользователей мессенджераот 10', 'Messenger users from 10'],
  ['Обмен файлами без ограничений по типу и объему', 'File sharing with no type or size limits'],
  ['Приватные и групповые чаты', 'Private and group chats'],
  ['Индивидуальные и групповые аудио- и видеозвонки', 'One-to-one and group audio and video calls'],
  [
    'Клиентские приложения: веб, мобильные и десктопные',
    'Web, mobile and desktop client applications',
  ],
  ['Предварительный просмотр документов и медиафайлов', 'Document and media preview'],
  ['Пользователи диска', 'Drive users'],
  ['Объем дискового пространства:от 50 ГБ', 'Storage capacity from 50 GB'],
  ['Встроенный просмотр аудио- и видеофайлов', 'Built-in audio and video viewer'],
  ['Настройка прав доступа к файлам и папкам', 'File and folder access controls'],
  ['Корпоративные политики и управления файлами', 'Corporate policies and file management'],
  [
    'Онлайн-редактирование документов, таблиц и презентаций: DOCX, XLSX, PPTX…',
    'Online editing for documents, spreadsheets and presentations: DOCX, XLSX, PPTX…',
  ],
  ['Почтовых адресов', 'Email addresses'],
  ['Количество почтовых ящиков от10', 'Mailboxes from 10'],
  ['Объём почтового хранилища от5 ГБ', 'Mailbox storage from 5 GB'],
  [
    'Централизованное управление корпоративными подписями',
    'Centralized corporate signature management',
  ],
  ['Группы рассылки', 'Distribution groups'],
  ['Маршрутизация писем для несуществующих адресов', 'Email routing for nonexistent addresses'],
  [
    'Почтовые политики: архивация, очистка спама, размер писем',
    'Mail policies: archiving, spam cleanup and message size',
  ],
  ['Настройка квоты по ящикам пользователей', 'Per-user mailbox quota settings'],
])

const localizedKeys = new Set([
  'description',
  'label',
  'name',
  'shortLabel',
  'text',
  'title',
  'value',
])
const cyrillicPattern = /[А-Яа-яЁё]/

function translateString(value) {
  const translated = translations.get(value)

  if (translated) return translated

  const speakers = value.match(/^(\d+) докладчиков$/)
  if (speakers) return `${speakers[1]} speakers`

  const connections = value.match(/^(\d+) подключений в мероприятия$/)
  if (connections) return `${connections[1]} event connections`

  if (cyrillicPattern.test(value)) {
    throw new Error(`Missing English translation: ${value}`)
  }

  return value
}

export function translateLocalizedContent(value, key = '') {
  if (Array.isArray(value)) return value.map((item) => translateLocalizedContent(item, key))

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        translateLocalizedContent(childValue, childKey),
      ]),
    )
  }

  if (typeof value === 'string' && localizedKeys.has(key)) return translateString(value)

  return value
}
