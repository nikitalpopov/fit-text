import { Directive, ElementRef, OnDestroy } from '@angular/core'
import { fit } from './fit'

@Directive({
  selector: '[fit]',
})
export class FitDirective implements OnDestroy {
  private mutationObserver = new MutationObserver(this.mutationCallback)
  private resizeObserver = new ResizeObserver(this.resizeCallback)

  // private previousLength = 0

  constructor(private el: ElementRef) {
    /**
     * Observes element's text (characterData) or style (attributes) changes
     */
    this.mutationObserver.observe(el.nativeElement, {
      characterData: true,
      attributes: true,
      subtree: false,
    })
    /**
     * Observes element's resizes
     */
    this.resizeObserver.observe(el.nativeElement)
  }

  public ngOnDestroy(): void {
    this.mutationObserver.disconnect()
    this.resizeObserver.disconnect()
  }

  private mutationCallback(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        // const currentLength = (mutation.target as Text).length
        /**
         * Since Open Sans is monospace font we can do this little optimization.
         * It works only if we assume that no CSS can be changed in runtime.
         */
        // if (this.previousLength !== currentLength) {
        //   this.previousLength = currentLength
        fit(mutation.target as HTMLElement)
        // }
      }

      if (mutation.type === 'attributes') {
        /**
         * In case we expect 'style' attribute of the element being updated from outside,
         * we should use this call. But it will happen on each update caused by fit() itself
         * which is not optimal by any means
         */
        // fit(mutation.target as HTMLElement)
      }
    })
  }

  private resizeCallback(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      fit(entry.target as HTMLElement)
    })
  }
}
