import { AbstractControl, ValidationErrors } from '@angular/forms'

export function whitespaceValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const value = control.value as string
  if (value.trim().length === 0) {
    return {
      empty: true,
    } as ValidationErrors
  }
  return null
}
