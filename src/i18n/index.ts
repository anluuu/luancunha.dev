import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from './pt.json'
import en from './en.json'

export type Locale = 'pt-BR' | 'en'

/**
 * Creates a fresh i18next instance, initialized synchronously with both
 * locales bundled. A new instance per render avoids the shared-global-state
 * race that a single module-level instance would hit under concurrent SSR.
 */
export function createI18n(locale: Locale) {
  const instance = i18n.createInstance()
  instance.use(initReactI18next).init({
    resources: {
      'pt-BR': { translation: pt },
      en: { translation: en },
    },
    lng: locale,
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  return instance
}
