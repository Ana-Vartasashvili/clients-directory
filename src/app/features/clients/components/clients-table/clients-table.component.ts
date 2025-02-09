import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core'
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
import { SkeletonModule } from 'primeng/skeleton'
import { Client, ClientGender } from '@app/core/models/client.model'
import { environment } from '@environments/environment'
import { InputNumber } from 'primeng/inputnumber'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ColumnWithFilterComponent } from '@app/features/shared/components/column-with-filter/column-with-filter.component'
import { ClientsRequestFilters } from '@app/core/models/clients-http.model'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormUtils } from '@app/core/utils/form.utils'
import { PaginatorModule, PaginatorState } from 'primeng/paginator'
import { ClientsStore } from '@app/core/store/clients.store'

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
    SkeletonModule,
    InputNumber,
    ReactiveFormsModule,
    InputTextModule,
    ColumnWithFilterComponent,
    PaginatorModule,
  ],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableComponent {
  fb = inject(FormBuilder)
  destroyRef = inject(DestroyRef)
  clientsStore = inject(ClientsStore)

  @Input({ required: true }) clients: Client[] = []
  @Input({ required: true }) isLoading = false
  @Input({ required: true }) pageSizeOptions: number[] = []
  @Input({ required: true }) pageSize = 10
  @Input({ required: true }) tableHeaders: string[] = []
  @Input({ required: true }) totalRecords = 0

  @Output() filtersChange = new EventEmitter<ClientsRequestFilters>()
  @Output() pageChange = new EventEmitter<PaginatorState>()

  readonly Gender = ClientGender
  readonly imageBaseUrl = environment.imageBaseUrl
  readonly genders = [
    { name: ClientGender[ClientGender.Male], code: ClientGender.Male },
    { name: ClientGender[ClientGender.Female], code: ClientGender.Female },
  ]

  filtersForm!: FormGroup

  ngOnInit(): void {
    this.filtersForm = this.initFiltersForm()
    this.handleFiltersChange()
  }

  private handleFiltersChange() {
    this.filtersForm.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        debounceTime(250),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        const trimmedValue = FormUtils.trimFormValues(value)
        this.filtersChange.emit(trimmedValue as ClientsRequestFilters)
      })
  }

  private initFiltersForm() {
    const gender =
      this.clientsStore.filter().Gender != null ? Number(this.clientsStore.filter().Gender) : null

    return this.fb.group({
      Id: this.clientsStore.filter().Id,
      Name: this.clientsStore.filter().Name,
      Gender: gender,
      DocumentId: this.clientsStore.filter().DocumentId,
      PhoneNumber: this.clientsStore.filter().PhoneNumber,
      LegalAddressCountry: this.clientsStore.filter().LegalAddressCountry,
      LegalAddressCity: this.clientsStore.filter().LegalAddressCity,
      LegalAddressLine: this.clientsStore.filter().LegalAddressLine,
      ActualAddressCountry: this.clientsStore.filter().ActualAddressCountry,
      ActualAddressCity: this.clientsStore.filter().ActualAddressCity,
      ActualAddressLine: this.clientsStore.filter().ActualAddressLine,
    })
  }

  getFullAddress(client: Client, addressType: 'legal' | 'actual') {
    if (addressType === 'legal') {
      return `${client.legalAddressCountry}, ${client.legalAddressCity}, ${client.legalAddressLine}`
    } else {
      return `${client.actualAddressCountry}, ${client.actualAddressCity}, ${client.actualAddressLine}`
    }
  }

  onPageChange(paginatorState: PaginatorState) {
    this.pageChange.emit(paginatorState)
  }
}
