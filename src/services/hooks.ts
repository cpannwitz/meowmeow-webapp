import { useState } from 'react'

export function useToggleState(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  function toggleValue() {
    setValue(!value)
  }

  return [value, toggleValue]
}
