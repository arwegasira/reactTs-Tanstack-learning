import { createFileRoute, Link } from '@tanstack/react-router'
import { Route as DrinkRoute } from './route'

export const Route = createFileRoute('/drinks/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: drinks } = DrinkRoute.useLoaderData()

  return (
    <section>
      <h1>Drinks</h1>
      {drinks ? (
        <ul>
          {drinks.map((drink) => {
            const { name, id } = drink
            return (
              <li key={id}>
                <Link to='/drinks/$drinkId' params={{ drinkId: String(id) }}>
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>No drinks found.</p>
      )}
    </section>
  )
}
