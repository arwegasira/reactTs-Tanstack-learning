import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/drinks"!
      <Outlet />
    </div>
  )
}
