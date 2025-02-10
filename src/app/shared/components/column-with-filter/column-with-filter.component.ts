import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { TableModule } from 'primeng/table'

@Component({
  selector: 'app-column-with-filter',
  imports: [TableModule],
  templateUrl: './column-with-filter.component.html',
  styleUrl: './column-with-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnWithFilterComponent {
  @Input() columnLabel = ''

  @Output() onHide = new EventEmitter<void>()

  onFilterHide() {
    this.onHide.emit()
  }
}
