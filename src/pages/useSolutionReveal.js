import { useLayoutEffect } from 'react'

// Geometry, not opacity, determines visibility. Keep each group in the layout
// while waiting, and remember its identity across responsive representations.
export default function useSolutionReveal(sectionRef, revision, isAutoScrolling, waitForArrival = false) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    const header = document.querySelector('.ongyeol-header')
    const seen = new Set()
    const observed = new Set()
    let frame
    let entryFrame
    let awaitingEntry = true
    let lastStart = -Infinity
    let disposed = false
    let arrived = !waitForArrival
    const flush = () => {
      frame = undefined
      if (disposed || awaitingEntry) return
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0
      if (!arrived) {
        arrived = section.getBoundingClientRect().top <= headerBottom + 1
        if (!arrived) return
      }
      const visible = [...observed].filter(node => {
        const bounds = node.getBoundingClientRect()
        return node.isConnected && node.dataset.solutionReveal === 'pending'
          && bounds.width > 0 && bounds.height > 0
          && bounds.bottom > headerBottom && bounds.top < window.innerHeight
      }).sort((a, b) => Number(a.dataset.solutionGroup) - Number(b.dataset.solutionGroup))
      if (!visible.length) return
      if (isAutoScrolling.current) {
        frame = requestAnimationFrame(flush)
        return
      }
      const now = performance.now()
      for (const node of visible) {
        const id = node.dataset.solutionGroup
        if (seen.has(id)) {
          node.dataset.solutionReveal = 'complete'
          continue
        }
        const start = Math.max(now, lastStart + 300)
        node.style.setProperty('--solution-reveal-delay', `${start - now}ms`)
        node.dataset.solutionReveal = 'visible'
        seen.add(id)
        lastStart = start
      }
    }
    const queue = () => {
      if (frame === undefined) frame = requestAnimationFrame(flush)
    }
    const observer = new IntersectionObserver(queue)
    const prepare = () => {
      for (const node of observed) {
        if (node.isConnected) continue
        observer.unobserve(node)
        observed.delete(node)
      }
      for (const node of section.querySelectorAll('[data-solution-group]')) {
        if (observed.has(node)) continue
        node.dataset.solutionReveal = seen.has(node.dataset.solutionGroup) ? 'complete' : 'pending'
        node.style.removeProperty('--solution-reveal-delay')
        // Cancel any animation belonging to the previous concern before paint.
        void getComputedStyle(node).opacity
        observed.add(node)
        observer.observe(node)
      }
      queue()
    }
    prepare()
    // A concern change also schedules a route/STEP 02 scroll on the next
    // frame. Let that request start before testing the old STEP 03 viewport.
    entryFrame = requestAnimationFrame(() => {
      entryFrame = requestAnimationFrame(() => {
        awaitingEntry = false
        queue()
      })
    })
    // Mobile keeps its existing product carousel. Newly selected product
    // articles participate once, without replaying previously viewed products.
    const mutations = new MutationObserver(prepare)
    mutations.observe(section, { childList: true, subtree: true })
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(entryFrame)
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [sectionRef, revision, isAutoScrolling, waitForArrival])
}
