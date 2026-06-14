import pt from './pt.json'
import en from './en.json'
import type { Locale } from './index'

const SITE = 'https://luancunha.dev'
const personId = `${SITE}/#luan-cunha`

const knowsAbout = [
  'Produtos web',
  'AI engineering',
  'LLM workflows',
  'Automações',
  'n8n',
  'Integrações de API',
  'React',
  'React Native',
  'Expo',
  'TypeScript',
  'Node.js',
  'Google Cloud',
  'AWS',
]

const cache: Partial<Record<Locale, ReturnType<typeof computeHead>>> = {}

/** Per-locale head is static — compute once and reuse across SSR requests. */
export function buildHead(locale: Locale) {
  return (cache[locale] ??= computeHead(locale))
}

function computeHead(locale: Locale) {
  const m = locale === 'en' ? en : pt
  const url = locale === 'en' ? `${SITE}/en` : `${SITE}/`
  const ogImage = locale === 'en' ? `${SITE}/og.png?lang=en` : `${SITE}/og.png`
  const inLanguage = locale === 'en' ? 'en' : 'pt-BR'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Luan Cunha',
        jobTitle: m.meta.jobTitle,
        url: `${SITE}/`,
        email: 'contato@luancunha.dev',
        image: `${SITE}/og.png`,
        description: m.meta.personDescription,
        knowsAbout,
        sameAs: [
          'https://github.com/anluuu',
          'https://www.linkedin.com/in/luan-cunha-37a7281b0/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'Luan Cunha',
        inLanguage,
        author: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE}/#profilepage`,
        url,
        inLanguage,
        mainEntity: { '@id': personId },
      },
    ],
  }

  return {
    meta: [
      { title: m.meta.title },
      { name: 'description', content: m.meta.description },
      { property: 'og:title', content: m.meta.title },
      { property: 'og:description', content: m.meta.ogDescription },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: m.meta.ogLocale },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:alt', content: m.meta.ogImageAlt },
      { name: 'twitter:title', content: m.meta.title },
      { name: 'twitter:description', content: m.meta.ogDescription },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: m.meta.ogImageAlt },
    ],
    links: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: 'pt-BR', href: `${SITE}/` },
      { rel: 'alternate', hreflang: 'en', href: `${SITE}/en` },
      { rel: 'alternate', hreflang: 'x-default', href: `${SITE}/` },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
    ],
  }
}
