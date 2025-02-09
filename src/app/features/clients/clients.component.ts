import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { ButtonModule } from 'primeng/button'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { ClientsRequestFilters } from '@app/core/models/clients-http.model'
import { ActivatedRoute, Router } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
  readonly destroyRef = inject(DestroyRef)

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

  pageSize = signal(10)
  pageSizeOptions = [10, 20, 50]
  tableSkeletonRows = computed(() => Array.from({ length: this.pageSize() }, (_, i) => i))

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.clientsStore.loadClientsByQuery(params as ClientsRequestFilters)
    })
  }

  onFiltersChange(filters: ClientsRequestFilters) {
    this.router.navigate([], {
      queryParams: filters,
      queryParamsHandling: 'merge',
    })
  }

  onClearFiltersClick() {
    this.router.navigate([], { queryParams: {} })
  }
}
