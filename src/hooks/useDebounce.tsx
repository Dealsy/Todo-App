import { useEffect, useState } from 'react'

//  Takes two parameters, the value and the delay
const useDebouce = (value: string, delay: number) => {
  //  State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    //  Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    //  Cancel the timeout if value changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebouce
