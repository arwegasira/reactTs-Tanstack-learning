import { createFileRoute } from '@tanstack/react-router'
import { Route as DrinkRoute } from './route'

export const Route = createFileRoute('/drinks/')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = DrinkRoute.useLoaderData()
  console.log(data)
  return <div>Hello "/drinks/"!</div>
}
