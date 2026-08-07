import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ErrorState, NotFound, RouteFallback } from '~/components/utility/states'

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    // Prefetch on hover/focus — makes navigation on a content site feel instant.
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 30_000,
    scrollRestoration: true,
    defaultNotFoundComponent: () => <NotFound />,
    defaultPendingComponent: () => <RouteFallback />,
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorState
        title="Something went wrong"
        description={
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while loading this page.'
        }
        onRetry={reset}
      />
    ),
  })
}
