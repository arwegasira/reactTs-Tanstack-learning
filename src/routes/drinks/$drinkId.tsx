import { createFileRoute } from '@tanstack/react-router'
import {
  customFetchDrinks,
  type SingleCocktailResponse,
  CocktailSchema,
} from '../../utils'
import { AxiosError } from 'axios'
const drinksQuery = (drinkId: string) => {
  return {
    queryKey: ['drinks', drinkId],
    queryFn: async () => await customFetchDrinks.get(`/cocktails/${drinkId}`),
  }
}
export const Route = createFileRoute('/drinks/$drinkId')({
  component: RouteComponent,
  loader: async ({
    params: { drinkId },
    context: { queryClient },
  }): Promise<SingleCocktailResponse> => {
    try {
      const response = await queryClient.ensureQueryData(drinksQuery(drinkId))
      const data: SingleCocktailResponse = response.data
      const result = CocktailSchema.safeParse(data)
      if (!result.success)
        throw new Error('Some Error Occurred While Fetching Drinks')
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error
      }
      return {} as SingleCocktailResponse
    }
  },
})

function RouteComponent() {
  const { drinkId } = Route.useParams()
  const drinks = Route.useLoaderData()
  console.log(drinks)
  return <div>Hello "/drinks/{drinkId}"!</div>
}
