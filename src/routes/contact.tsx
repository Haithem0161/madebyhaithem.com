import { createFileRoute } from "@tanstack/react-router"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/variants"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

const socials = [
  { icon: GithubIcon, href: "https://github.com/madebyhaithem", label: "GitHub" },
  {
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/madebyhaithem",
    label: "LinkedIn",
  },
  {
    icon: XIcon,
    href: "https://twitter.com/madebyhaithem",
    label: "X (Twitter)",
  },
]

function ContactPage() {
  return (
    <div className="relative z-10 min-h-screen px-6 pt-28 pb-16 md:px-12 lg:px-20">
      <motion.main
        className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-16 lg:flex-row lg:gap-24 lg:py-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left — Info */}
        <div className="flex flex-col justify-between lg:w-1/2">
          <div className="space-y-10">
            {/* Availability + Heading */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <span className="font-mono-label text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
                Availability: Currently Open
              </span>
              <h1 className="font-display text-ghost-white text-6xl leading-[1.05] tracking-tight md:text-8xl">
                Let's{" "}
                <span className="italic">Connect.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="font-body max-w-sm text-lg leading-relaxed text-white/40 md:text-xl"
            >
              In pursuit of meaningful collaborations and elevated digital
              experiences.
            </motion.p>

            {/* Editorial line */}
            <motion.div
              variants={fadeInUp}
              className="h-px w-32 bg-linear-to-r from-white/10 to-transparent"
            />

            {/* Contact info */}
            <motion.div variants={fadeInUp} className="space-y-6 pt-2">
              <div className="flex flex-col gap-1">
                <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30">
                  Electronic Mail
                </span>
                <a
                  className="font-body text-lg font-light text-white transition-colors hover:text-white/60"
                  href="mailto:haithem@example.com"
                >
                  haithem@example.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30">
                  Location
                </span>
                <span className="font-body text-lg font-light text-white">
                  Tunis, TN & Remote
                </span>
              </div>
            </motion.div>
          </div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex items-center gap-6 lg:mt-0"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/30 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                <social.icon className="size-[18px]" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col justify-center lg:w-1/2"
        >
          <form className="space-y-14" onSubmit={(e) => e.preventDefault()}>
            {/* Name + Email row */}
            <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
              <FormField label="Full Name" placeholder="Your name" type="text" />
              <FormField
                label="Email Address"
                placeholder="reach@example.com"
                type="email"
              />
            </div>

            {/* Subject */}
            <FormField
              label="Nature of Enquiry"
              placeholder="Project details or collaboration"
              type="text"
            />

            {/* Message */}
            <div className="group flex flex-col gap-3">
              <label className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-white">
                Your Message
              </label>
              <textarea
                className="w-full resize-none border-0 border-b border-white/10 bg-transparent px-0 py-2 font-body text-base font-light text-white transition-colors duration-300 placeholder:text-white/20 focus:border-white focus:outline-none"
                placeholder="Tell me about your project..."
                rows={4}
              />
            </div>

            {/* Submit row */}
            <div className="flex items-center justify-between pt-6">
              <button
                type="submit"
                className="group relative flex cursor-pointer items-center gap-4 overflow-hidden py-4 pr-12 font-mono-label text-[11px] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:text-primary"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute right-0 h-px w-8 bg-white opacity-50 transition-all duration-700 group-hover:w-full group-hover:bg-primary group-hover:opacity-100" />
                <ArrowRight className="absolute right-0 size-3.5 transition-all duration-500 group-hover:-right-4 group-hover:text-primary" />
              </button>
              <span className="font-mono-label hidden text-[9px] font-light uppercase italic tracking-[0.15em] text-white/20 md:block">
                Estimated response: 24-48h
              </span>
            </div>
          </form>
        </motion.div>
      </motion.main>
    </div>
  )
}

function FormField({
  label,
  placeholder,
  type,
}: {
  label: string
  placeholder: string
  type: string
}) {
  return (
    <div className="group flex flex-col gap-3">
      <label className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-white">
        {label}
      </label>
      <input
        className="w-full border-0 border-b border-white/10 bg-transparent px-0 py-2 font-body text-base font-light text-white transition-colors duration-300 placeholder:text-white/20 focus:border-white focus:outline-none"
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})
