import { useLayoutEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

export function useToggleState(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  function toggleValue() {
    setValue(!value)
  }

  return [value, toggleValue]
}

export function useFullScreenSize() {
  const { height } = useWindowSize()
  useLayoutEffect(() => {
    document.body.style.height = height + 'px'
  }, [height])
  return true
}
