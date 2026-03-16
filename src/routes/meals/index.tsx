import { createFileRoute, Link } from '@tanstack/react-router'
import { Route as MealRoute } from './route'
export const Route = createFileRoute('/meals/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { meals } = MealRoute.useLoaderData()
  return (
    <section>
      <h1>Meals</h1>
      {meals ? (
        <ul>
          {meals.map((meal) => {
            const { strMeal, idMeal } = meal
            return (
              <li key={idMeal}>
                <Link to='/meals/$mealId' params={{ mealId: idMeal }}>
                  {strMeal}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>No meals found.</p>
      )}
    </section>
  )
}
