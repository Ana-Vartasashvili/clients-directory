import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ClientsSortBy } from '@app/core/models/clients-http.model'
import { ButtonModule } from 'primeng/button'
import { SelectChangeEvent, SelectModule } from 'primeng/select'

@Component({
  selector: 'app-clients-table-header',
  imports: [ButtonModule, SelectModule, FormsModule],
  templateUrl: './clients-table-header.component.html',
  styleUrl: './clients-table-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableHeaderComponent {
  @Input() sortBy: ClientsSortBy = ClientsSortBy.CreatedAtDesc

  @Output() clearButtonClick = new EventEmitter<void>()
  @Output() sortByChange = new EventEmitter<ClientsSortBy>()

  sortByOptions = [
    { name: 'Oldest First', code: ClientsSortBy.CreatedAt },
    { name: 'Newest First', code: ClientsSortBy.CreatedAtDesc },
    { name: 'Last Name (A-Z)', code: ClientsSortBy.lastName },
    { name: 'Last Name (Z-A)', code: ClientsSortBy.lastNameDesc },
  ]

  onClearButtonClick() {
    this.clearButtonClick.emit()
  }

  onSortByChange(event: SelectChangeEvent) {
    this.sortByChange.emit(event.value as ClientsSortBy)
  }
}
