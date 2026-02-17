import { StrictMode, lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"
import { routeTree } from "./routeTree.gen"
import "./index.css"

// Lazy-load devtools — excluded from production bundle entirely via tree-shaking
const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-query-devtools").then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    )

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: { queryClient },
})

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      </QueryClientProvider>
    </StrictMode>,
  )
}
