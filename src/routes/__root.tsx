import { createRootRouteWithContext } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { FloatingNav } from "@/components/layout/floating-nav"
import { WipeTransition } from "@/components/layout/wipe-transition"
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
    <div className="font-body antialiased min-h-screen">
      <FloatingNav />
      <WipeTransition />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
