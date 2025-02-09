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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ColumnWithFilterComponent } from '@app/features/shared/components/column-with-filter/column-with-filter.component'
import { ClientsRequestFilters } from '@app/core/models/clients-http.model'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormUtils } from '@app/core/utils/form.utils'

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
  ],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableComponent {
  fb = inject(FormBuilder)
  destroyRef = inject(DestroyRef)

  @Input({ required: true }) clients: Client[] = []
  @Input({ required: true }) isLoading = false
  @Input({ required: true }) pageSizeOptions: number[] = []
  @Input({ required: true }) pageSize = 0
  @Input({ required: true }) tableHeaders: string[] = []

  @Output() filtersChange = new EventEmitter<ClientsRequestFilters>()

  readonly Gender = ClientGender
  readonly imageBaseUrl = environment.imageBaseUrl
  readonly genders = [
    { name: ClientGender[ClientGender.Male], code: ClientGender.Male },
    { name: ClientGender[ClientGender.Female], code: ClientGender.Female },
  ]

  filtersForm = this.initFiltersForm()

  ngOnInit(): void {
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
    return this.fb.group({
      Id: null,
      Name: null,
      Gender: null,
      DocumentId: null,
      PhoneNumber: null,
      LegalAddressCountry: null,
      LegalAddressCity: null,
      LegalAddressLine: null,
      ActualAddressCountry: null,
      ActualAddressCity: null,
      ActualAddressLine: null,
    })
  }

  getFullAddress(client: Client, addressType: 'legal' | 'actual') {
    if (addressType === 'legal') {
      return `${client.legalAddressCountry}, ${client.legalAddressCity}, ${client.legalAddressLine}`
    } else {
      return `${client.actualAddressCountry}, ${client.actualAddressCity}, ${client.actualAddressLine}`
    }
  }
}
