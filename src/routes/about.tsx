import { createFileRoute } from "@tanstack/react-router"

function AboutPage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground">About Me</h1>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
})
