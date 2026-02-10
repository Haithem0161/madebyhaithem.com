import type { createRouter } from "@tanstack/react-router"
import type { QueryClient } from "@tanstack/react-query"
import type { routeTree } from "./routeTree.gen"

type RouterContext = { queryClient: QueryClient }

type Router = ReturnType<
  typeof createRouter<typeof routeTree, "preserve", RouterContext>
>

declare module "@tanstack/react-router" {
  interface Register {
    router: Router
  }
}
