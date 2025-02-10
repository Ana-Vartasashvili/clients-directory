import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-input',
  imports: [FloatLabelModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' | 'tel' = 'text'
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
}
