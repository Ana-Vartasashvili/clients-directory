import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs'
import { ClientsHttpService } from '@app/core/services/clients-http.service'
import { Client } from '@app/core/models/client.model'

@Injectable({
  providedIn: 'root',
})
export class ClientDetailsResolver implements Resolve<Client> {
  constructor(private clientsHttpService: ClientsHttpService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    const clientId = route.paramMap.get('id')
    return this.clientsHttpService.getClientById(+clientId!)
  }
}
