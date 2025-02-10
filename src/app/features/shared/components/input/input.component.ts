import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-input',
  imports: [FloatLabelModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'tel' = 'text'
  @Input({ required: true }) name = ''
  @Input({ required: true }) label = ''
}
