import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'
import { PanelModule } from 'primeng/panel'
import { AvatarModule } from 'primeng/avatar'
import { environment } from '@environments/environment'
import { ClientsStore } from '@app/core/store/clients.store'
import { ClientsTableComponent } from '@features/clients/components/clients-table/clients-table.component'

@Component({
  selector: 'app-clients',
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    PanelModule,
    AvatarModule,
    ClientsTableComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  readonly clientsStore = inject(ClientsStore)
  readonly imageBaseUrl = environment.imageBaseUrl

  pageSize = signal(10)
  pageSizeOptions = [10, 20, 50]

  ngOnInit(): void {
    this.clientsStore.loadClientsByQuery()
  }
}
