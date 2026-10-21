import { useEffect, useState } from 'react'

const DEBOUNCE_DELAY = 400

export const useDebounce = <T>(value: T, delay: number = DEBOUNCE_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
