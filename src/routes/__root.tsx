import { createRootRouteWithContext } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { ReactLenis } from "lenis/react"
import { FloatingNav } from "@/components/layout/floating-nav"
import { WipeTransition } from "@/components/layout/wipe-transition"
import {
  AnalyticsProvider,
  RouteAnalytics,
} from "@/lib/hooks/use-analytics"
import { useScrollToTop } from "@/lib/hooks/use-scroll-to-top"
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

function ScrollToTop() {
  useScrollToTop()
  return null
}

function RootLayout() {
  return (
    <AnalyticsProvider>
      <ReactLenis root options={{ lerp: 0.1, syncTouch: false }}>
        <ScrollToTop />
        <div className="font-body antialiased min-h-screen">
          <RouteAnalytics />
          <FloatingNav />
          <WipeTransition />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </div>
      </ReactLenis>
    </AnalyticsProvider>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
