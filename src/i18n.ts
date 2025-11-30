import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const capitalizeFirstPostProcessor = {
  name: 'capitalizeFirst',
  type: 'postProcessor' as const,
  process(value: string) {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

i18next
  .use(capitalizeFirstPostProcessor)
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })

export default i18next
