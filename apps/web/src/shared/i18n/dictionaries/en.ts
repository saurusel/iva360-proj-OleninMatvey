import type { Dictionary } from './ru'

export const en: Dictionary = {
  meta: {
    applicationName: 'IVA 360',
    title: 'Online business platform: video conferencing, webinars and messenger | IVA 360',
    titleTemplate: '%s | IVA 360',
    description:
      'Corporate online platform with a built-in messenger. AI transcribes audio and video and helps teams get things done ☎ +7 (495) 648-66-73',
  },
  header: {
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    showSubmenu: (label) => `Show “${label}” submenu`,
    submenuDescription: (label) => `“${label}” section submenu`,
    search: 'Search',
    cart: 'Cart',
    openContacts: 'Open contacts and menu',
    contactsTitle: 'Contacts and services',
    contactsDescription: 'IVA 360 phones, links and services',
  },
  hero: {
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    goToSlide: (index) => `Slide ${index}`,
  },
  support: {
    meetActions: 'Meeting quick actions',
    openMeetActions: 'Open meeting quick actions',
    createMeeting: 'Create a meeting',
    joinMeeting: 'Join',
    scheduleMeeting: 'Schedule',
    allMeetActions: 'All actions',
    help: 'Help',
    openHelp: 'Open support menu',
    helpMenu: 'Support menu',
    close: 'Close',
    knowledgeBase: 'Knowledge base',
    writeRequest: 'Submit a request',
    call: 'Call us',
  },
  tariffs: {
    title: 'Pricing',
    description: 'Corporate plans for the IVA 360 platform.',
    monthsShort: 'mo',
    free: 'Free',
    onRequest: 'On request',
    billedFor: (months, unit) => `billed for ${months} ${unit}`,
    months: { one: 'month', few: 'months', many: 'months', other: 'months' },
    includedProducts: 'Includes products',
    withAi: 'AI-powered',
    goToPlan: (index) => `Go to slide ${index}`,
  },
  notFound: {
    title: 'Page not found',
    description: 'It may have been moved or not published yet.',
    backHome: 'Back to home',
  },
}
