import { inject } from '@angular/core'
import { Subject } from 'rxjs'
import { ConfirmDialogService } from '@core/services/confirm-dialog.service'

export class GuardUtils {
  static handleComponentDeactivate(): Subject<boolean> {
    const deactivateSubject = new Subject<boolean>()

    inject(ConfirmDialogService).confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to leave this page?',
      acceptButtonProps: {
        label: 'Leave',
        severity: 'contrast',
      },
      accept: () => {
        deactivateSubject.next(true)
      },
      reject: () => {
        deactivateSubject.next(false)
      },
    })

    return deactivateSubject
  }
}
