import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/meals')({ component: RouteComponent })

function RouteComponent() {
  return (
    <div>
      <h1>Meals</h1>
      <Outlet />
    </div>
  )
}
