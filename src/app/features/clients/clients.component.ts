import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'
import { PanelModule } from 'primeng/panel'
import { AvatarModule } from 'primeng/avatar'
import { environment } from '@environments/environment'
import { ClientsStore } from '@app/core/store/clients.store'
import { ClientsTableComponent } from '@features/clients/components/clients-table/clients-table.component'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { ClientsRequestFilters, ClientsSortBy } from '@app/core/models/clients-http.model'
import { ActivatedRoute, Router } from '@angular/router'
import { take } from 'rxjs'
import {
  DEFAULT_PAGE_SIZE,
  FILTERS_NOT_TO_RESET,
  PAGE_SIZE_OPTIONS,
} from '@app/core/configs/configs'
import { ToastModule } from 'primeng/toast'
import { ClientsTableHeaderComponent } from './components/clients-table-header/clients-table-header.component'
import { PaginatorState } from 'primeng/paginator'

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
    ToastModule,
    ClientsTableHeaderComponent,
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

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS
  readonly defaultPageSize = DEFAULT_PAGE_SIZE
  readonly ClientsSortBy = ClientsSortBy

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

  onPageChange({ page, rows }: PaginatorState) {
    this.router.navigate([], { queryParams: { Page: page, PageSize: rows } })
    this.clientsStore.updateFilterQuery({ Page: page! + 1, PageSize: rows })
  }

  onClearFiltersClick() {
    this.clientsStore.updateFilterQuery(this.getEmptyFilters())
  }

  private getEmptyFilters() {
    const filterKeys = Object.keys(this.clientsStore.filter()) as (keyof ClientsRequestFilters)[]
    const emptyFilters: ClientsRequestFilters = { ...this.clientsStore.filter() }
    filterKeys.forEach((key) => {
      if (!FILTERS_NOT_TO_RESET.includes(key)) {
        emptyFilters[key] = null
      }
    })

    return emptyFilters
  }

  onSortByChange(sortBy: ClientsSortBy) {
    this.clientsStore.updateFilterQuery({ SortBy: sortBy })
  }
}
