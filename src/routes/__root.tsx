import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

const siteUrl = 'https://luancunha.dev/'
const personId = 'https://luancunha.dev/#luan-cunha'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Luan Cunha',
      jobTitle: 'Desenvolvedor Full Stack',
      url: siteUrl,
      email: 'contato@luancunha.dev',
      image: 'https://luancunha.dev/og.png',
      description:
        'Desenvolvedor full stack com experiência consolidada em produtos web, AI engineering, automações, integrações e sistemas internos sob demanda.',
      knowsAbout: [
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
      ],
      sameAs: [
        'https://github.com/anluuu',
        'https://www.linkedin.com/in/luan-cunha-37a7281b0/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://luancunha.dev/#website',
      url: siteUrl,
      name: 'Luan Cunha',
      inLanguage: 'pt-BR',
      author: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://luancunha.dev/#profilepage',
      url: siteUrl,
      inLanguage: 'pt-BR',
      mainEntity: { '@id': personId },
    },
  ],
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Luan Cunha - Desenvolvedor Full Stack' },
      {
        name: 'description',
        content:
          'Portfólio de Luan Cunha, desenvolvedor full stack com experiência consolidada em produtos web, AI engineering, automações, integrações e sistemas sob demanda.',
      },
      { property: 'og:title', content: 'Luan Cunha - Desenvolvedor Full Stack' },
      {
        property: 'og:description',
        content:
          'Produtos web, AI engineering, automações, sistemas internos e apps mobile com execução full stack.',
      },
      { property: 'og:url', content: 'https://luancunha.dev/' },
      { property: 'og:site_name', content: 'Luan Cunha' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://luancunha.dev/og.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Luan Cunha - Desenvolvedor Full Stack' },
      {
        name: 'twitter:description',
        content:
          'Produtos web, AI engineering, automações, sistemas internos e apps mobile com execução full stack.',
      },
      { name: 'twitter:image', content: 'https://luancunha.dev/og.png' },
      { name: 'author', content: 'Luan Cunha' },
      { name: 'theme-color', content: '#0a0612' },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: 'Luan Cunha - Desenvolvedor Full Stack' },
      { name: 'twitter:image:alt', content: 'Luan Cunha - Desenvolvedor Full Stack' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: 'https://luancunha.dev/' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    ],
    scripts: [
      {
        src: 'https://analytics.luancunha.dev/script.js',
        defer: true,
        'data-website-id': 'bebbd95a-ffe9-47de-9d69-c024ecf71eab',
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
