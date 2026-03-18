import '#app'
import '#vue-router'
export * from './icon'
export * from './navigation'
export * from './components'

declare module '#app' {
  interface PageMeta {
    /**
     * top margin in pixels for scrolling to an element
     * @default 70
     */
    scrollMargin?: number
  }
}
