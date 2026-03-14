import { createFileRoute, Outlet } from '@tanstack/react-router'

import {
  customFetchDrinks,
  type DrinkResponse,
  type DrinkSearchParams,
  drinkResponseSchema,
  drinkSearchParamsSchema,
} from '../../utils'
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
      const errorMessage =
        error instanceof Error ? error.message : 'Something Went Wrong'
      console.log(errorMessage)
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
