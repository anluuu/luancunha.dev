import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../components/home'
import { buildHead } from '../i18n/head'

export const Route = createFileRoute('/en')({
  head: () => buildHead('en'),
  component: () => <Home locale="en" />,
})
