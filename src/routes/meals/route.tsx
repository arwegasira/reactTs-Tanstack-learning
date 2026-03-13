import { createFileRoute, Outlet } from '@tanstack/react-router'
import { mealSearchParamsSchema, type MealResponse } from '../../utils'
import { customFetchMeals } from '../../utils'

type LoaderData = MealResponse | { Meal: null }
const mealQuery = (s: string) => {
  return {
    queryKey: ['meals', s],
    queryFn: async () => await customFetchMeals.get(`/search.php?s=${s}`),
  }
}
export const Route = createFileRoute('/meals')({
  component: RouteComponent,
  validateSearch: (search) => mealSearchParamsSchema.parse(search),
  loaderDeps: ({ search: { s } }) => ({ s }),
  loader: async ({
    deps: { s },
    context: { queryClient },
  }): Promise<LoaderData> => {
    try {
      const { data } = await queryClient.ensureQueryData(mealQuery(s ?? ''))
      const meals: MealResponse = data
      const result = mealSearchParamsSchema.safeParse(meals)
      if (!result.success) {
        throw new Error('Some error occurred while fetching meals')
      }

      return meals
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching meals:', errorMessage)
      return { Meal: null }
    }
    //  finally {
    //   return { Meal: null }
    // }
  },
})

function RouteComponent() {
  return (
    <div>
      <h1>Meals</h1>
      <Outlet />
    </div>
  )
}
