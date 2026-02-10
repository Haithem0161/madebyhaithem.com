import { createFileRoute } from "@tanstack/react-router"

function WorkPage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground">My Work</h1>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/work")({
  component: WorkPage,
})
