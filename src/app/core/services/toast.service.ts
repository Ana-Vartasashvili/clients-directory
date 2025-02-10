import { inject, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageService = inject(MessageService)

  success(summary: string, detail?: string) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 2000,
      closeIcon: 'pi pi-times',
    })
  }

  error(summary: string, detail?: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 2000,
      closeIcon: 'pi pi-times',
    })
  }
}
