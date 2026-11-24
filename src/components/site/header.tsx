"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, type MouseEvent } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { smoothScrollTo } from "@/hooks/use-lenis";
import { siteConfig } from "@/lib/site";

const SCROLL_THRESHOLD = 32;
const NAV_OFFSET = -64;

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > SCROLL_THRESHOLD;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Scroll to an in-page section. On the home page this is a smooth scroll;
  // from any other page we navigate home first and scroll once landed.
  const goToSection = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      smoothScrollTo(`#${id}`, NAV_OFFSET);
      return;
    }
    router.push(`/#${id}`);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-5"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 720 : 1280,
          backgroundColor: scrolled
            ? "color-mix(in oklch, var(--background) 70%, transparent)"
            : "color-mix(in oklch, var(--background) 0%, transparent)",
          borderColor: scrolled
            ? "color-mix(in oklch, var(--foreground) 12%, transparent)"
            : "color-mix(in oklch, var(--foreground) 0%, transparent)",
          boxShadow: scrolled
            ? "0 8px 30px rgba(0,0,0,0.06)"
            : "0 0 0 rgba(0,0,0,0)",
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "blur(0px)",
        }}
        className="flex w-full items-center justify-between gap-4 rounded-full border px-4 sm:px-6"
      >
        <button
          type="button"
          onClick={goToSection("hero")}
          aria-label={siteConfig.name}
          className="group flex items-center"
          data-cursor="magnetic"
        >
          {/* A mask in the text colour, so the mark turns cream with the dark wall. */}
          <span
            aria-hidden
            className="size-9 bg-foreground transition-transform duration-500 [mask:url(/logo-dark.png)_center/contain_no-repeat] group-hover:scale-105"
          />
        </button>

        <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <NavButton onClick={goToSection("about")}>{t("about")}</NavButton>
          <NavLink href="/projects">{t("projects")}</NavLink>
          <NavButton onClick={goToSection("skills")}>{t("skills")}</NavButton>
          <NavButton onClick={goToSection("contact")}>{t("contact")}</NavButton>
        </nav>

        <LocaleSwitcher />
      </motion.div>
    </motion.header>
  );
}

function NavButton({
  onClick,
  children,
}: {
  onClick: (e: MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer uppercase transition-colors hover:text-foreground"
      data-cursor="magnetic"
    >
      {children}
    </button>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="cursor-pointer transition-colors hover:text-foreground"
      data-cursor="magnetic"
    >
      {children}
    </Link>
  );
}
