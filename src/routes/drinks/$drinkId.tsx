import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drinks/$drinkId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { drinkId } = Route.useParams()
  return <div>Hello "/drinks/{drinkId}"!</div>
}
