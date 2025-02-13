import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { TableModule } from 'primeng/table'
import { BadgeModule } from 'primeng/badge'
import { OverlayBadgeModule } from 'primeng/overlaybadge'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-column-with-filter',
  imports: [TableModule, BadgeModule, OverlayBadgeModule, CommonModule],
  templateUrl: './column-with-filter.component.html',
  styleUrl: './column-with-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnWithFilterComponent {
  @Input() columnLabel = ''
  @Input() hasBadge = false

  @Output() onHide = new EventEmitter<void>()

  onFilterHide() {
    this.onHide.emit()
  }
}
