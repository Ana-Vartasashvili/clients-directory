import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core'
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
import { finalize, take } from 'rxjs'
import {
  DEFAULT_PAGE_SIZE,
  FILTERS_NOT_TO_RESET,
  PAGE_SIZE_OPTIONS,
} from '@app/core/constants/constants'
import { ToastModule } from 'primeng/toast'
import { PaginatorState } from 'primeng/paginator'
import { ClientsTableHeaderComponent } from '@features/clients/components/clients-table-header/clients-table-header.component'
import { ClientModalComponent } from './components/client-modal/client-modal.component'
import { Client, CreatedClient } from '@app/core/models/client.model'
import { ClientsHttpService } from '@app/core/services/clients-http.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormUtils } from '@app/core/utils/form.utils'
import { ErrorHandler } from '@app/core/utils/error.utils'
import { ToastService } from '@app/core/services/toast.service'

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
    ClientModalComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  readonly clientsStore = inject(ClientsStore)
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute)
  readonly clientsHttpService = inject(ClientsHttpService)
  readonly destroyRef = inject(DestroyRef)
  readonly toastService = inject(ToastService)

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS
  readonly defaultPageSize = DEFAULT_PAGE_SIZE
  readonly ClientsSortBy = ClientsSortBy
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

  isModalShown = signal(false)
  isClientDataProcessing = signal(false)
  clientToEdit = signal<Client>({} as Client)
  modalMode = signal<'add' | 'edit'>('add')

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

  onAddButtonClick() {
    this.modalMode.set('add')
    this.isModalShown.set(true)
    this.clientToEdit.set({} as Client)
  }

  onModalSubmit(client: CreatedClient) {
    this.isClientDataProcessing.set(true)
    const formData = FormUtils.getFormDataFromObject(client)
    const clientHttpRequest = this.getClientHttpRequest(formData)

    clientHttpRequest(formData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isClientDataProcessing.set(false))
      )
      .subscribe({
        next: () => {
          const successMessage = `Client ${
            this.modalMode() === 'add' ? 'added' : 'edited'
          } successfully`
          this.handleClientRequestSuccess(successMessage)
        },
        error: (error) => {
          this.handleClientRequestError(error)
        },
      })
  }

  private getClientHttpRequest(formData: FormData) {
    if (this.modalMode() === 'add') {
      return this.clientsHttpService.addClient.bind(this.clientsHttpService, formData)
    } else {
      return this.clientsHttpService.updateClient.bind(
        this.clientsHttpService,
        this.clientToEdit().id
      )
    }
  }

  private handleClientRequestSuccess(successMessage: string) {
    this.clientsStore.updateFilterQuery({ Page: 1 })
    this.isModalShown.set(false)
    this.toastService.success(successMessage)
  }

  private handleClientRequestError(error: any) {
    this.toastService.error(
      ErrorHandler.getErrorMessageSummary(error),
      ErrorHandler.getErrorMessageDetails(error)
    )
  }

  onCloseModal() {
    this.isModalShown.set(false)
  }

  onEditClick(client: Client) {
    this.modalMode.set('edit')
    this.clientToEdit.set(client)
    this.isModalShown.set(true)
  }

  onDeleteClick(clientId: number) {
    this.clientsHttpService
      .deleteClient(clientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.handleClientRequestSuccess('Client deleted successfully')
        },
        error: (error) => {
          this.handleClientRequestError(error)
        },
      })
  }
}
