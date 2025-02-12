import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Account, AccountStatus, AccountType, Currency } from '@app/core/models/account.model'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-client-account-table',
  imports: [TableModule, ButtonModule, TagModule],
  templateUrl: './client-account-table.component.html',
  styleUrl: './client-account-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAccountTableComponent {
  @Input() accounts: Account[] = []
  @Input() isLoading = false

  @Output() addAccountClick = new EventEmitter<void>()

  readonly AccountType = AccountType
  readonly AccountStatus = AccountStatus
  readonly Currency = Currency
  readonly tableHeaders = ['Id', 'Account type', 'Currency', 'Status']

  getTypeSeverity(type: AccountType) {
    switch (type) {
      case AccountType.Current:
        return 'secondary'
      case AccountType.Savings:
        return 'info'
      case AccountType.Accrual:
        return 'warn'
    }
  }

  getStatusSeverity(status: AccountStatus) {
    switch (status) {
      case AccountStatus.Active:
        return 'success'
      case AccountStatus.Closed:
        return 'danger'
    }
  }

  onAddAccountClick() {
    this.addAccountClick.emit()
  }
}
