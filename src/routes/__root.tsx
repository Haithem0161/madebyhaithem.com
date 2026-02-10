import { createRootRoute, Outlet } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { FloatingNav } from "@/components/layout/floating-nav"

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/react-router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

function RootLayout() {
  return (
    <div className="bg-background font-display antialiased overflow-x-hidden min-h-screen">
      <FloatingNav />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  )
}

export const Route = createRootRoute({ component: RootLayout })
