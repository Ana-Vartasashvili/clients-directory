import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'
import { PanelModule } from 'primeng/panel'
import { AvatarModule } from 'primeng/avatar'
import { environment } from '@environments/environment'
import { ClientsStore } from '@app/core/store/clients.store'
import { ClientsTableComponent } from '@features/clients/components/clients-table/clients-table.component'
import { ButtonModule } from 'primeng/button'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { ClientsRequestFilters } from '@app/core/models/clients-http.model'
import { ActivatedRoute, Router } from '@angular/router'
import { take } from 'rxjs'
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@app/core/configs/configs'

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
    ButtonModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  readonly clientsStore = inject(ClientsStore)
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute)

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

  pageSizeOptions = PAGE_SIZE_OPTIONS
  defaultPageSize = DEFAULT_PAGE_SIZE

  ngOnInit(): void {
    const filterQuery = this.clientsStore.filter
    this.clientsStore.loadClientsByQuery(filterQuery)

    this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      this.clientsStore.updateFilterQuery(queryParams as ClientsRequestFilters)
    })
  }

  onFiltersChange(filters: ClientsRequestFilters) {
    this.clientsStore.updateFilterQuery(filters)
  }

  onClearFiltersClick() {
    const { Page, PageSize } = this.clientsStore.filter()
    this.clientsStore.updateFilterQuery({ PageSize, Page })
  }
}
