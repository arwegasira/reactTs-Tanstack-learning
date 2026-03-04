import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    throw redirect({ to: '/meals' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Index "/"!</div>
}
