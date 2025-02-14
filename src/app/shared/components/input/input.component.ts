import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input } from '@angular/core'
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-input',
  imports: [FloatLabelModule, InputTextModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  parentContainer = inject(ControlContainer)

  @Input() type: 'text' | 'number' | 'tel' | 'password' = 'text'
  @Input({ required: true }) name = ''
  @Input({ required: true }) label = ''

  value: string | number = ''
  disabled: boolean = false

  onChange = (value: string | number) => {}
  onTouched = () => {}

  writeValue(value: string | number): void {
    this.value = value
    this.onChange(value)
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChange(this.value)
  }

  onBlur(): void {
    this.onTouched()
  }

  getFormControl(): AbstractControl | null {
    const formGroup = (this.parentContainer as FormGroupDirective).form as FormGroup
    return formGroup?.get(this.name) ?? null
  }

  isInvalidAndTouched(): boolean {
    const control = this.getFormControl()
    return !!control && control.invalid && control.touched
  }

  hasError(): boolean {
    return !!this.getFormControl()?.errors
  }

  errorMessage(): string {
    const errors = this.getFormControl()?.errors
    return errors ? (Object.values(errors)[0] as string) : ''
  }
}
