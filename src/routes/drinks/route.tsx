import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import {
  customFetchDrinks,
  type DrinkResponse,
  type DrinkSearchParams,
  drinkResponseSchema,
  drinkSearchParamsSchema,
} from '../../utils'
function RootNotFoundComponent() {
  return (
    <div>
      <h2>404 - Page Not Found!</h2>
      <Link to='/'>Back Home</Link>
    </div>
  )
}
const buildAPiParams = (params: DrinkSearchParams) => {
  const { name, alcoholic, page, glass_type } = params
  const apiParams = new URLSearchParams()
  if (name) apiParams.append('name', name)
  if (alcoholic !== undefined)
    apiParams.append('alcoholic', alcoholic.toString())
  if (glass_type) apiParams.append('glass_type', glass_type.toString())
  apiParams.append('page', page ? page.toString() : '1')
  return apiParams.toString()
}
const drinkQuery = (params: DrinkSearchParams) => {
  const { name, alcoholic, page, glass_type } = params
  return {
    queryKey: [
      'drinks',
      name ? name : '',
      alcoholic !== undefined ? alcoholic.toString() : '',
      page ? page.toString() : '1',
      glass_type ? glass_type.toString() : '',
    ],

    queryFn: async () =>
      await customFetchDrinks.get(`/cocktails?${buildAPiParams(params)}`),
  }
}
export const Route = createFileRoute('/drinks')({
  component: RouteComponent,
  notFoundComponent: RootNotFoundComponent,
  validateSearch: (search) => drinkSearchParamsSchema.parse(search),
  loaderDeps: ({ search: { name, alcoholic, page, glass_type } }) => ({
    name,
    alcoholic,
    page,
    glass_type,
  }),
  loader: async ({
    deps: { name, alcoholic, page, glass_type },
    context: { queryClient },
  }): Promise<DrinkResponse> => {
    try {
      const params: DrinkSearchParams = { name, alcoholic, page, glass_type }
      const response = await queryClient.ensureQueryData(drinkQuery(params))
      const data: DrinkResponse = response.data
      const result = drinkResponseSchema.safeParse(data)
      console.log(result)
      if (!result.success) {
        throw new Error('Something Went Wrong')
      }
      return data
    } catch (error) {
      if (error instanceof AxiosError) throw error
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      console.error(errorMessage)
      return { pagination: { count: 0, pages: 0 } }
    }
  },
})

function RouteComponent() {
  return (
    <div>
      Hello "/drinks"!
      <Outlet />
    </div>
  )
}
