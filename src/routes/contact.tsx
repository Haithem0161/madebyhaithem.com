import { createFileRoute } from "@tanstack/react-router"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Check, AlertCircle } from "lucide-react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { GithubIcon } from "@/components/icons"
import { staggerContainer, fadeInUp } from "@/lib/variants"
import { useContactMutation } from "@/lib/queries"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  subject: z.string().max(500, "Subject is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
})

const socials = [
  {
    icon: GithubIcon,
    href: "https://github.com/Haithem0161",
    label: "GitHub",
  },
]

function ContactPage() {
  const mutation = useContactMutation()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({
        name: value.name,
        email: value.email,
        subject: value.subject || undefined,
        message: value.message,
      })
    },
  })

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
                Let's <span className="italic">Connect.</span>
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
                  href="mailto:haithem.m.nadhir@gmail.com"
                >
                  haithem.m.nadhir@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30">
                  Location
                </span>
                <span className="font-body text-lg font-light text-white">
                  Baghdad, Iraq & Remote
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
          <AnimatePresence mode="wait">
            {mutation.isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6 py-20 text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <Check className="size-8 text-primary" />
                </div>
                <h3 className="font-display text-ghost-white text-2xl italic">
                  Message sent.
                </h3>
                <p className="font-body text-white/40">
                  I'll get back to you within 24-48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    mutation.reset()
                    form.reset()
                  }}
                  className="font-mono-label cursor-pointer text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="space-y-14"
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
              >
                {/* Global error */}
                {mutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3"
                  >
                    <AlertCircle className="size-4 shrink-0 text-red-400" />
                    <p className="font-body text-sm text-red-300">
                      Failed to send message. Please try again.
                    </p>
                  </motion.div>
                )}

                {/* Name + Email row */}
                <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
                  <form.Field name="name">
                    {(field) => (
                      <FormField
                        label="Full Name"
                        placeholder="Your name"
                        type="text"
                        value={field.state.value}
                        onChange={(v) => field.handleChange(v)}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                      />
                    )}
                  </form.Field>
                  <form.Field name="email">
                    {(field) => (
                      <FormField
                        label="Email Address"
                        placeholder="reach@example.com"
                        type="email"
                        value={field.state.value}
                        onChange={(v) => field.handleChange(v)}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                      />
                    )}
                  </form.Field>
                </div>

                {/* Subject */}
                <form.Field name="subject">
                  {(field) => (
                    <FormField
                      label="Nature of Enquiry"
                      placeholder="Project details or collaboration"
                      type="text"
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
                      onBlur={field.handleBlur}
                      errors={field.state.meta.errors}
                    />
                  )}
                </form.Field>

                {/* Message */}
                <form.Field name="message">
                  {(field) => (
                    <div className="group flex flex-col gap-3">
                      <label className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-white">
                        Your Message
                      </label>
                      <textarea
                        className="w-full resize-none border-0 border-b border-white/10 bg-transparent px-0 py-2 font-body text-base font-light text-white transition-colors duration-300 placeholder:text-white/20 focus:border-white focus:outline-none"
                        placeholder="Tell me about your project..."
                        rows={4}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {field.state.meta.errors.filter(Boolean).length > 0 && (
                        <p className="font-mono-label text-[10px] text-red-400">
                          {field.state.meta.errors
                            .filter(Boolean)
                            .map((e) =>
                              typeof e === "string"
                                ? e
                                : (e as { message: string }).message,
                            )
                            .join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                {/* Submit row */}
                <div className="flex items-center justify-between pt-6">
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative flex cursor-pointer items-center gap-4 overflow-hidden py-4 pr-12 font-mono-label text-[11px] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span className="relative z-10">
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                        <div className="absolute right-0 h-px w-8 bg-white opacity-50 transition-all duration-700 group-hover:w-full group-hover:bg-primary group-hover:opacity-100" />
                        <ArrowRight className="absolute right-0 size-3.5 transition-all duration-500 group-hover:-right-4 group-hover:text-primary" />
                      </button>
                    )}
                  </form.Subscribe>
                  <span className="font-mono-label hidden text-[9px] font-light uppercase italic tracking-[0.15em] text-white/20 md:block">
                    Estimated response: 24-48h
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>
    </div>
  )
}

function FormField({
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  errors,
}: {
  label: string
  placeholder: string
  type: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  errors: unknown[]
}) {
  const errorText =
    errors.filter(Boolean).length > 0
      ? errors
          .filter(Boolean)
          .map((e) =>
            typeof e === "string" ? e : (e as { message: string }).message,
          )
          .join(", ")
      : null

  return (
    <div className="group flex flex-col gap-3">
      <label className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-focus-within:text-white">
        {label}
      </label>
      <input
        className="w-full border-0 border-b border-white/10 bg-transparent px-0 py-2 font-body text-base font-light text-white transition-colors duration-300 placeholder:text-white/20 focus:border-white focus:outline-none"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {errorText && (
        <p className="font-mono-label text-[10px] text-red-400">
          {errorText}
        </p>
      )}
    </div>
  )
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})
