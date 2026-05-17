type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js', target: string | Date, params?: GtagParams) => void
  }
}

export type ConversionEvent =
  | 'involucrado_opened'
  | 'newsletter_subscribed'
  | 'curso_inscripto'
  | 'articulo_leido'

export function trackEvent(name: ConversionEvent, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
