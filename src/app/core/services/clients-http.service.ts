import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { ClientsRequestFilters, ClientsResponse } from '@core/models/clients-http.model'

@Injectable({
  providedIn: 'root',
})
export class ClientsHttpService {
  readonly http = inject(HttpClient)

  getClients(filters: ClientsRequestFilters) {
    let params = this.getQueryParamsFrom(filters)

    return this.http.get<ClientsResponse>(`${environment.apiUrl}/Clients`, { params })
  }

  private getQueryParamsFrom(filters: ClientsRequestFilters) {
    let params = new HttpParams()

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof ClientsRequestFilters]
      if (value != null) {
        params = params.set(key, value.toString())
      }
    })

    return params
  }

  addClient(clientFormData: FormData) {
    return this.http.post(`${environment.apiUrl}/Clients`, clientFormData)
  }
}
