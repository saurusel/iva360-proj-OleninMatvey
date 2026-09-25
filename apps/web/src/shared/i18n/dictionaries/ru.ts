export const ru = {
  meta: {
    applicationName: 'IVA 360',
    title: 'Онлайн-платформа для бизнеса: ВКС и Вебинары с мессенджером | Сервис IVA 360',
    titleTemplate: '%s | IVA 360',
    description:
      'Корпоративная онлайн-платформа для бизнеса со встроенным корпоративным мессенджером — искусственный интеллект помогает решать задачи по расшифровке аудио и видео. Доступная стоимость, Высокая эффективность ☎ +7 (495) 648-66-73',
  },
  header: {
    mainNavigation: 'Основная навигация',
    mobileNavigation: 'Мобильная навигация',
    showSubmenu: (label: string) => `Показать подменю «${label}»`,
    submenuDescription: (label: string) => `Подменю раздела «${label}»`,
    search: 'Поиск',
    cart: 'Корзина',
    openContacts: 'Открыть контакты и меню',
    contactsTitle: 'Контакты и сервисы',
    contactsDescription: 'Телефоны, ссылки и сервисы IVA 360',
  },
  hero: {
    previousSlide: 'Предыдущий слайд',
    nextSlide: 'Следующий слайд',
    goToSlide: (index: number) => `Слайд ${index}`,
  },
  support: {
    meetActions: 'Быстрые действия для встреч',
    openMeetActions: 'Открыть быстрые действия для встреч',
    createMeeting: 'Создать встречу',
    joinMeeting: 'Подключиться',
    scheduleMeeting: 'Запланировать',
    allMeetActions: 'Все действия на странице',
    help: 'Помощь',
    openHelp: 'Открыть меню поддержки',
    helpMenu: 'Меню поддержки',
    close: 'Закрыть',
    knowledgeBase: 'База знаний',
    writeRequest: 'Написать заявку',
    call: 'Позвонить',
  },
  tariffs: {
    title: 'Тарифы',
    description: 'Корпоративные тарифы на платформу IVA 360.',
    monthsShort: 'мес',
    free: 'Бесплатно',
    onRequest: 'По запросу',
    billedFor: (months: number, unit: string) => `при оплате за ${months} ${unit}`,
    months: { one: 'месяц', few: 'месяца', many: 'месяцев', other: 'месяца' },
    includedProducts: 'Содержит продукты',
    withAi: 'С технологиями AI',
    goToPlan: (index: number) => `Перейти к слайду ${index}`,
  },
  notFound: {
    title: 'Страница не найдена',
    description: 'Возможно, она была перемещена или ещё не опубликована.',
    backHome: 'На главную',
  },
}

export type Dictionary = typeof ru
