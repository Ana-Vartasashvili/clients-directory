import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TagModule } from 'primeng/tag'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { SelectModule } from 'primeng/select'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'
import { PanelModule } from 'primeng/panel'
import { AvatarModule } from 'primeng/avatar'
import { Client } from '@app/core/models/client.model'
import { environment } from '@environments/environment'

@Component({
  selector: 'app-clients-table',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
    PanelModule,
    AvatarModule,
  ],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableComponent {
  @Input({ required: true }) clients: Client[] = []
  @Input({ required: true }) isLoading = false
  @Input({ required: true }) pageSizeOptions: number[] = []
  @Input({ required: true }) pageSize = 0

  readonly imageBaseUrl = environment.imageBaseUrl
  readonly tableHeaders = [
    'Id',
    'Client',
    'Gender',
    'Document Id',
    'Phone',
    'Legal Address',
    'Actual Address',
  ]

  getFullAddress(client: Client, addressType: 'legal' | 'actual') {
    if (addressType === 'legal') {
      return `${client.legalAddressCountry}, ${client.legalAddressCity}, ${client.legalAddressLine}`
    } else {
      return `${client.actualAddressCountry}, ${client.actualAddressCity}, ${client.actualAddressLine}`
    }
  }
}
