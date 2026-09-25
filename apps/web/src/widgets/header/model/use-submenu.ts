import { useState } from 'react'

type SubmenuState = {
  key: string | null
  isOpen: boolean
}

export function useSubmenu() {
  const [{ key, isOpen }, setState] = useState<SubmenuState>({ key: null, isOpen: false })

  return {
    activeKey: key,
    isOpen,
    isExpanded: (itemKey: string) => isOpen && key === itemKey,
    open: (itemKey: string) => setState({ key: itemKey, isOpen: true }),
    toggle: (itemKey: string) =>
      setState((current) =>
        current.isOpen && current.key === itemKey
          ? { ...current, isOpen: false }
          : { key: itemKey, isOpen: true },
      ),
    close: () => setState((current) => ({ ...current, isOpen: false })),
  }
}
