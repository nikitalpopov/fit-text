/**
 * Fits passed element into its parent's width
 * @param element Element to fit
 * @param step Value to (de)increase font size on each step (in vw)
 * @param delta Acceptable difference between element's and parent's widths (in px)
 */
export function fit(
  element: HTMLElement,
  step: number = 0.01,
  delta: number = 1,
): void {
  /* Check if element already has defined font size value */
  const fontSize = getComputedStyle(element).fontSize?.trim()
  /* If value is truthy, then parse it into vw, otherwise start from step */
  let value: number = fontSize
    ? (parseFloat(fontSize) * 100) / window.innerWidth
    : step
  const unit: string = 'vw'

  const parent = element.parentElement
  if (parent !== null) {
    let parentWidth = parent.clientWidth
    let childWidth = element.offsetWidth

    if (childWidth > parentWidth) {
      /* While child overflows parent, decrease font size */
      if (value < step) value = 100
      while (childWidth - parentWidth > delta && value > step) {
        value -= step
        element.style.fontSize = `${value}${unit}`
        childWidth = element.offsetWidth
        parentWidth = parent.clientWidth
      }
    } else {
      /* While parent wider than child, increase font size */
      while (parentWidth - childWidth > delta && value < 100) {
        value += step
        element.style.fontSize = `${value}${unit}`
        childWidth = element.offsetWidth
        parentWidth = parent.clientWidth
      }
      /* Last value will always cause overflow, so we should undo last step */
      value -= step
      element.style.fontSize = `${value - step}${unit}`
    }
  }
}
