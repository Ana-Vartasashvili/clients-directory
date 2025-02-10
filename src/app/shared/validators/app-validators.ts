import { AbstractControl, Validators } from '@angular/forms'

export class AppValidators extends Validators {
  static override minLength(length: number): any {
    return (control: AbstractControl) =>
      super.minLength(length)(control)
        ? { minLength: `Field length can not be less than ${length}.` }
        : undefined
  }

  static override maxLength(length: number): any {
    return (control: AbstractControl) =>
      super.maxLength(length)(control)
        ? { maxLength: `Field length can not be more than ${length}.` }
        : undefined
  }

  static override length(length: number): any {
    return (control: AbstractControl) => {
      if (control.value == null) return null
      return control.value.length === length ? null : { length: `Field length must be ${length}.` }
    }
  }

  static override required(control: AbstractControl): any {
    return super.required(control) ? { required: 'Field is required.' } : undefined
  }

  static onlyNumbers(control: AbstractControl) {
    if (control.value == null) return null
    const regexNumbersOnly = /^[0-9]+$/

    return regexNumbersOnly.test(control.value)
      ? null
      : { onlyNumbers: 'Field can contain only numbers.' }
  }

  static noWhiteSpaces(control: AbstractControl) {
    if (control.value == null) return null

    return control.value.trim().length
      ? null
      : { whiteSpace: 'Field can not contain only white spaces.' }
  }

  static onlyGeorgianOrLatin(control: AbstractControl) {
    if (control.value == null) return null

    const georgianRegex = /^[\u10A0-\u10FF]+$/
    const latinRegex = /^[A-Za-z]+$/

    if (georgianRegex.test(control.value)) {
      return null
    }

    if (latinRegex.test(control.value)) {
      return null
    }

    return { onlyGeorgianOrLatin: 'Only Georgian or Latin letters are allowed.' }
  }

  static validPhoneNumber(control: AbstractControl) {
    if (control.value == null) return null

    const phoneNumberRegex = /^5\d{8}$/

    return phoneNumberRegex.test(control.value)
      ? null
      : { validPhoneNumber: 'Value must start with 5 and be 9 digits long.' }
  }
}
