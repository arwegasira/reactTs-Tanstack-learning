import { createFileRoute } from '@tanstack/react-router'
import {
  customFetchMeals,
  type MealResponse,
  mealResponseSchema,
} from '../../utils'
import { AxiosError } from 'axios'

const url = `lookup.php?i=`
const singleMealQuery = (mealId: string) => {
  return {
    queryKey: ['singleMeal', mealId],
    queryFn: async () => await customFetchMeals.get(`/${url}${mealId}`),
  }
}
export const Route = createFileRoute('/meals/$mealId')({
  component: RouteComponent,
  loader: async ({
    params: { mealId },
    context: { queryClient },
  }): Promise<MealResponse> => {
    try {
      const response = await queryClient.ensureQueryData(
        singleMealQuery(mealId),
      )
      const data: MealResponse = response.data
      const result = mealResponseSchema.safeParse(data)
      if (!result.success)
        throw new Error('Some Error Occurred While Fetching Meals')
      return data
    } catch (error) {
      if (error instanceof AxiosError) throw Error
      return { meals: null }
    }
  },
})

function RouteComponent() {
  const { mealId } = Route.useParams()
  const { meals } = Route.useLoaderData()

  return (
    <article>
      <h1>Meal Details for ID: {mealId}</h1>
    </article>
  )
}
