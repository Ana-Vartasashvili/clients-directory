import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Client, ClientGender } from '@app/core/models/client.model'
import { ClientsStore } from '@app/core/store/clients.store'
import { environment } from '@environments/environment'
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card'
import { PanelModule } from 'primeng/panel'
import { DividerModule } from 'primeng/divider'

@Component({
  selector: 'app-client-details',
  imports: [CardModule, AvatarModule, PanelModule, DividerModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsComponent implements OnInit {
  clientStore = inject(ClientsStore)
  route = inject(ActivatedRoute)

  readonly imageBaseUrl = environment.imageBaseUrl

  client = signal<Client>({} as Client)
  clientDetailItems: { label: string; value: string | number }[] = []

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
}
