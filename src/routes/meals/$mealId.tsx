import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meals/$mealId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mealId } = Route.useParams()
  return <div>Hello "/meals/{mealId}"!</div>
}
