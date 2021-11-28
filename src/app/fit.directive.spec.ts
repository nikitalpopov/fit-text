/* eslint-disable no-undef */
import { ElementRef } from '@angular/core'
import { FitDirective } from './fit.directive'

describe('FitDirective', () => {
  it('should create an instance', () => {
    const directive = new FitDirective(new ElementRef(new HTMLElement()))
    expect(directive).toBeTruthy()
  })
})
