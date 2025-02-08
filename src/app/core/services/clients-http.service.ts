import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { ClientsResponse } from '../models/clients-http.model'

@Injectable({
  providedIn: 'root',
})
export class ClientsHttpService {
  readonly http = inject(HttpClient)

  getClients() {
    return this.http.get<ClientsResponse>(`${environment.apiUrl}/Clients`)
  }
}
