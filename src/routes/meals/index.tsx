import { createFileRoute } from '@tanstack/react-router'
import { Route as MealRoute } from './route'
export const Route = createFileRoute('/meals/')({
  component: RouteComponent,
})

function RouteComponent() {
  const meals = MealRoute.useLoaderData()
  console.log('Meals data:', meals)
  return <div>Hello "/meals/"!</div>
}
