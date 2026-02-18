import { createRootRouteWithContext } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { FloatingNav } from "@/components/layout/floating-nav"
import { WipeTransition } from "@/components/layout/wipe-transition"
import {
  AnalyticsProvider,
  RouteAnalytics,
} from "@/lib/hooks/use-analytics"
import type { QueryClient } from "@tanstack/react-query"

export interface RouterContext {
  queryClient: QueryClient
}

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

function RootLayout() {
  return (
    <AnalyticsProvider>
      <div className="font-body antialiased min-h-screen">
        <RouteAnalytics />
        <FloatingNav />
        <WipeTransition />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </div>
    </AnalyticsProvider>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
