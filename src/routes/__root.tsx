import { createRootRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { FloatingNav } from "@/components/layout/floating-nav"
import { WipeTransition } from "@/components/layout/wipe-transition"

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

function RootLayout() {
  return (
    <div className="font-body antialiased overflow-x-hidden min-h-screen">
      <FloatingNav />
      <WipeTransition />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  )
}

export const Route = createRootRoute({ component: RootLayout })
