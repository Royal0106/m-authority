import * as React from 'react'

export type SubmitStatus = 'idle' | 'success' | 'error'

/**
 * Stand-in for a real mutation.
 *
 * Frontend-only build: this resolves after a short delay so every form exercises
 * its pending, success and reset states. Replace `submit` with a `fetch` (or a
 * TanStack server function) and the components stay untouched.
 */
export function useMockSubmit(resetAfterMs = 6000) {
  const [status, setStatus] = React.useState<SubmitStatus>('idle')
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const submit = React.useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 850))
      setStatus('success')
    } catch {
      setStatus('error')
    }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), resetAfterMs)
  }, [resetAfterMs])

  return { status, submit }
}
