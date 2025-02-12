import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Account, CreatedAccount } from '@core/models/account.model'
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AccountsHttpService {
  readonly http = inject(HttpClient)

  createAccount(clientId: number, account: CreatedAccount) {
    return this.http.post<Account>(`${environment.apiUrl}/Clients/${clientId}/accounts`, account)
  }

  closeAccount(accountId: number) {
    return this.http.put(`${environment.apiUrl}/Clients/accounts/${accountId}/close`, {})
  }

  getAccountsForClient(clientId: number) {
    return this.http.get<Account[]>(`${environment.apiUrl}/Clients/${clientId}/accounts`)
  }
}
