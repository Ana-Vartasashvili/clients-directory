import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Client, ClientGender, CreatedClient } from '@app/core/models/client.model'
import { ClientsStore } from '@app/core/store/clients.store'
import { environment } from '@environments/environment'
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card'
import { PanelModule } from 'primeng/panel'
import { DividerModule } from 'primeng/divider'
import { ClientModalComponent } from '@features/clients/components/client-modal/client-modal.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormUtils } from '@app/core/utils/form.utils'
import { finalize } from 'rxjs'
import { ClientsHttpService } from '@app/core/services/clients-http.service'
import { ErrorHandler } from '@app/core/utils/error.utils'
import { ToastService } from '@app/core/services/toast.service'
import { ButtonModule } from 'primeng/button'
import { ClientAccountTableComponent } from './client-account-table/client-account-table.component'
import { ClientDetails } from '@app/core/models/clients-http.model'

@Component({
  selector: 'app-client-details',
  imports: [
    CardModule,
    AvatarModule,
    PanelModule,
    DividerModule,
    ClientModalComponent,
    ButtonModule,
    ClientAccountTableComponent,
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsComponent implements OnInit {
  clientStore = inject(ClientsStore)
  route = inject(ActivatedRoute)
  clientsHttpService = inject(ClientsHttpService)
  toastService = inject(ToastService)
  destroyRef = inject(DestroyRef)

  readonly imageBaseUrl = environment.imageBaseUrl

  client = signal<ClientDetails>({} as ClientDetails)
  clientDetailItems: { label: string; value: string | number }[] = []
  isModalShown = signal(false)
  isClientDataProcessing = signal(false)

  get clientName() {
    return this.client().firstName + ' ' + this.client().lastName
  }

  get clientImage() {
    return this.client().profileImageUrl ? this.imageBaseUrl + this.client().profileImageUrl : ''
  }

  constructor() {
    effect(() => {
      this.clientDetailItems = [
        { label: 'Id', value: this.client().id },
        { label: 'Gender', value: ClientGender[this.client().gender] },
        { label: 'Document Id', value: this.client().documentId },
        { label: 'Phone number', value: this.client().phoneNumber },
        { label: 'Legal address', value: this.getFullAddress(this.client(), 'legal') },
        { label: 'Actual address', value: this.getFullAddress(this.client(), 'actual') },
      ]
    })
  }

  ngOnInit(): void {
    this.client.set(this.route.snapshot.data['client'])
  }

  getFullAddress(client: Client, addressType: 'legal' | 'actual') {
    if (addressType === 'legal') {
      return `${client.legalAddressCountry}, ${client.legalAddressCity}, ${client.legalAddressLine}`
    } else {
      return `${client.actualAddressCountry}, ${client.actualAddressCity}, ${client.actualAddressLine}`
    }
  }

  onEditClick() {
    this.isModalShown.set(true)
  }

  onModalSubmit(client: CreatedClient) {
    this.isClientDataProcessing.set(true)
    const formData = FormUtils.getFormDataFromObject(client)

    this.clientsHttpService
      .updateClient(this.client().id, formData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isClientDataProcessing.set(false))
      )
      .subscribe({
        next: () => {
          this.handleClientRequestSuccess('Client edited successfully')
        },
        error: (error) => {
          this.handleClientRequestError(error)
        },
      })
  }

  private handleClientRequestSuccess(successMessage: string) {
    this.clientStore.updateFilterQuery({ Page: 1 })
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
}
