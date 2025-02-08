import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core'
import { ClientsStore } from '../../core/store/clients.store'
import { TagModule } from 'primeng/tag'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { SelectModule } from 'primeng/select'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'
import { Skeleton } from 'primeng/skeleton'

@Component({
  selector: 'app-clients',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
    Skeleton,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  readonly clientsStore = inject(ClientsStore)

  clientsTableHeaders = [
    'Id',
    'Client',
    'Gender',
    'Document Id',
    'Phone',
    'Legal Address',
    'Actual Address',
  ]

  ngOnInit(): void {
    this.clientsStore.loadClientsByQuery()
  }
}
