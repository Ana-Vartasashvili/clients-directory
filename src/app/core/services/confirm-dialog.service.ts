import { inject, Injectable } from '@angular/core'
import { Confirmation, ConfirmationService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  confirmationService = inject(ConfirmationService)

  confirm(dialogProps: Confirmation) {
    this.confirmationService.confirm({
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Close',
        severity: 'warn',
      },
      ...dialogProps,
    })
  }
}
