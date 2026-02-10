import type { createRouter } from "@tanstack/react-router"
import type { routeTree } from "./routeTree.gen"

type Router = ReturnType<typeof createRouter<typeof routeTree>>

declare module "@tanstack/react-router" {
  interface Register {
    router: Router
  }
}
