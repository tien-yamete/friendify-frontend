import { useEffect, useRef, useState, useMemo } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  const optionsString = useMemo(() => JSON.stringify(options), [options])

  useEffect(() => {
    const parsedOptions = JSON.parse(optionsString)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.1, ...parsedOptions }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [optionsString])

  return { ref, inView }
}
