import { useEffect, useRef, useState } from 'react'

// Fades and lifts its children into view the first time they scroll on screen.
export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) {
      setShown(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal${shown ? ' is-visible' : ''}`} style={{ '--delay': `${delay}ms` }}>
      {children}
    </div>
  )
}
