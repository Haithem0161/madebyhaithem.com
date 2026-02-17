import { Link } from "@tanstack/react-router"
import { GithubIcon } from "@/components/icons"

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Work", to: "/work" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
]

const socials = [
  { icon: GithubIcon, href: "https://github.com/Haithem0161", label: "GitHub" },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/5 bg-background-dark px-6 py-14 md:px-12 md:py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Main row */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left, Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="font-holland text-ghost-white text-4xl leading-none">
              Haithem
            </Link>
            <p className="font-display text-lg italic text-white/45">
              Design focused, developer driven.
            </p>
          </div>

          {/* Center, Nav links */}
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-mono-label text-sm uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right, Socials */}
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/35 transition-colors duration-300 hover:text-white"
              >
                <social.icon className="size-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 md:flex-row">
          <span className="font-mono-label text-xs uppercase tracking-[0.2em] text-white/35">
            &copy; {CURRENT_YEAR} Haithem Mustafa
          </span>
        </div>
      </div>
    </footer>
  )
}
