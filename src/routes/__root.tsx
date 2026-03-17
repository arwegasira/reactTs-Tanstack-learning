import * as React from 'react'
import {
  Outlet,
  createRootRouteWithContext,
  type ErrorComponentProps,
  Link,
  useRouterState,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type RootRouteContext = {
  queryClient: QueryClient
}

function RootNotFoundComponent() {
  return (
    <div>
      <h2>404 - Page Not Found!</h2>
      <Link to='/'>Back Home</Link>
    </div>
  )
}

function getStatusMessage(status: number): string {
  switch (status) {
    case 401:
      return 'Unauthorized — you must be logged in to view this resource.'
    case 403:
      return 'Forbidden — you do not have permission to access this resource.'
    case 404:
      return 'Not Found — the requested resource does not exist.'
    case 500:
      return 'Server Error — something went wrong on the server.'
    default:
      return `Unexpected error (status ${status}).`
  }
}

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    return (
      <div>
        <h2>{status ? `Error ${status}` : 'Network Error'}</h2>
        <p>
          {status
            ? getStatusMessage(status)
            : 'A network error occurred. Please check your connection.'}
        </p>
        <button onClick={reset}>Try Again</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
})

function RootComponent() {
  const isLoading = useRouterState({
    select: (state) => state.status === 'pending',
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  )
}
