import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('useSettings - keyboardShortcuts', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  afterEach(() => {
    // Reset the singleton so the next test gets a fresh instance
    localStorage.clear()
    vi.resetModules()
  })

  describe('default value', () => {
    it('should default keyboardShortcuts to true', async () => {
      const { useSettings } = await import('../../../app/composables/useSettings')
      const { settings } = useSettings()
      expect(settings.value.keyboardShortcuts).toBe(true)
    })
  })

  describe('useKeyboardShortcuts composable', () => {
    it('should return true by default', async () => {
      const { useKeyboardShortcuts } = await import('../../../app/composables/useSettings')
      const enabled = useKeyboardShortcuts()
      expect(enabled.value).toBe(true)
    })

    it('should reflect changes made via settings', async () => {
      const { useSettings } = await import('../../../app/composables/useSettings')
      const { settings } = useSettings()
      const enabled = useKeyboardShortcuts()

      settings.value.keyboardShortcuts = false
      expect(enabled.value).toBe(false)

      settings.value.keyboardShortcuts = true
      expect(enabled.value).toBe(true)
    })

    it('should be reactive', async () => {
      const { useSettings } = await import('../../../app/composables/useSettings')
      const { useKeyboardShortcuts } = await import('../../../app/composables/useSettings')
      const { settings } = useSettings()
      const enabled = useKeyboardShortcuts()

      expect(enabled.value).toBe(true)

      settings.value.keyboardShortcuts = false
      expect(enabled.value).toBe(false)
    })
  })

  describe('persistence', () => {
    it('should persist keyboardShortcuts=false to localStorage', async () => {
      const { useSettings } = await import('../../../app/composables/useSettings')
      const { settings } = useSettings()
      settings.value.keyboardShortcuts = false

      const stored = JSON.parse(localStorage.getItem('npmx-settings') ?? '{}')
      expect(stored.keyboardShortcuts).toBe(false)
    })

    it('should persist keyboardShortcuts=true to localStorage', async () => {
      const { useSettings } = await import('../../../app/composables/useSettings')
      const { settings } = useSettings()
      settings.value.keyboardShortcuts = false
      settings.value.keyboardShortcuts = true

      const stored = JSON.parse(localStorage.getItem('npmx-settings') ?? '{}')
      expect(stored.keyboardShortcuts).toBe(true)
    })
  })
})
