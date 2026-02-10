import { createFileRoute } from "@tanstack/react-router"

function ContactPage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Get In Touch
        </h1>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})
