import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core'
import { Account, AccountStatus, AccountType, Currency } from '@app/core/models/account.model'
import { ConfirmDialogService } from '@app/core/services/confirm-dialog.service'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-client-account-table',
  imports: [TableModule, ButtonModule, TagModule, ConfirmDialogModule],
  templateUrl: './client-account-table.component.html',
  styleUrl: './client-account-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAccountTableComponent {
  confirmationService = inject(ConfirmDialogService)

  @Input() accounts: Account[] = []
  @Input() isLoading = false

  @Output() addAccountClick = new EventEmitter<void>()
  @Output() closeAccountClick = new EventEmitter<number>()

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

  onCloseAccountClick(accountId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to close this account?',
      header: 'Close account',
      acceptButtonProps: {
        label: 'Close account',
        severity: 'danger',
      },
      accept: () => {
        this.closeAccountClick.emit(accountId)
      },
    })
  }
}
