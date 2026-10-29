// ScrollTo uses CSS pixels; its read-back offset may be rounded to an integer
// even on high-DPI screens. Nearest rounding can expose the previous section.
export function getSectionScrollTop(section, header) {
  const position = header && getComputedStyle(header).position
  const headerBottom = position === 'sticky' || position === 'fixed'
    ? header.getBoundingClientRect().bottom
    : 0
  const top = window.scrollY + section.getBoundingClientRect().top - headerBottom
  // Choose the first representable offset that fully meets the header edge.
  // The epsilon only absorbs floating-point noise at an exact pixel boundary.
  return Math.max(0, Math.ceil(top - 1e-7))
}
