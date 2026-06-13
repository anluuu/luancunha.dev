import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

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
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: 'https://luancunha.dev/' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
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
