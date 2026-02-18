import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react"
import { useLocation } from "@tanstack/react-router"

const API_URL = "https://api.madebyhaithem.com"

interface AnalyticsAPI {
  trackPageView: (page?: string, title?: string) => void
  trackEvent: (
    type: string,
    category: string,
    label?: string,
    value?: number,
  ) => void
  trackExternalClick: (url: string, label: string) => void
}

const AnalyticsContext = createContext<AnalyticsAPI | null>(null)

function beacon(url: string, body: object) {
  try {
    navigator.sendBeacon(url, JSON.stringify(body))
  } catch {
    // analytics must never crash the app
  }
}

async function safeFetch(url: string, body: object): Promise<unknown> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return res.json()
  } catch {
    return null
  }
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const sessionId = useRef<string | null>(
    localStorage.getItem("torch_session_id"),
  )
  const pageViewCount = useRef(0)
  const startTime = useRef(Date.now())
  const sessionInitPromise = useRef<Promise<void> | null>(null)

  const ensureSession = useCallback(async () => {
    if (sessionId.current) return
    // Deduplicate concurrent init calls
    if (sessionInitPromise.current) {
      await sessionInitPromise.current
      return
    }

    sessionInitPromise.current = (async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const data = (await safeFetch(`${API_URL}/analytics/session`, {
          first_page: window.location.pathname,
          referrer: document.referrer,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
        })) as { success?: boolean; session_id?: string } | null

        if (data?.success && data.session_id) {
          sessionId.current = data.session_id
          localStorage.setItem("torch_session_id", data.session_id)
        }
      } finally {
        sessionInitPromise.current = null
      }
    })()

    await sessionInitPromise.current
  }, [])

  const trackPageView = useCallback(
    async (page?: string, title?: string) => {
      await ensureSession()
      if (!sessionId.current) return
      pageViewCount.current++

      beacon(`${API_URL}/analytics/pageview`, {
        session_id: sessionId.current,
        page: page ?? window.location.pathname,
        title: title ?? document.title,
      })
    },
    [ensureSession],
  )

  const trackEvent = useCallback(
    async (
      type: string,
      category: string,
      label?: string,
      value?: number,
    ) => {
      await ensureSession()
      if (!sessionId.current) return

      beacon(`${API_URL}/analytics/track`, {
        session_id: sessionId.current,
        events: [
          {
            event_type: type,
            event_category: category,
            event_label: label,
            event_value: value,
            page: window.location.pathname,
          },
        ],
      })
    },
    [ensureSession],
  )

  const trackExternalClick = useCallback(
    (url: string, label: string) => {
      trackEvent("click", "external_link", `${label}|${url}`)
    },
    [trackEvent],
  )

  // End session on tab close / navigate away
  useEffect(() => {
    const endSession = () => {
      if (!sessionId.current) return
      const totalTime = Math.round((Date.now() - startTime.current) / 1000)
      beacon(`${API_URL}/analytics/session/${sessionId.current}`, {
        last_page: window.location.pathname,
        page_count: pageViewCount.current,
        total_time: totalTime,
        is_bounce: pageViewCount.current <= 1,
      })
    }

    window.addEventListener("beforeunload", endSession)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") endSession()
    })

    return () => {
      window.removeEventListener("beforeunload", endSession)
    }
  }, [])

  return (
    <AnalyticsContext value={{ trackPageView, trackEvent, trackExternalClick }}>
      {children}
    </AnalyticsContext>
  )
}

export function useAnalytics(): AnalyticsAPI {
  const ctx = useContext(AnalyticsContext)
  if (!ctx)
    throw new Error("useAnalytics must be used within AnalyticsProvider")
  return ctx
}

/** Auto-tracks page views on every route change. Place inside AnalyticsProvider. */
export function RouteAnalytics() {
  const { trackPageView } = useAnalytics()
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location.pathname, trackPageView])

  return null
}
