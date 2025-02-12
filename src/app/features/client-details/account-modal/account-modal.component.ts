import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ACCOUNT_TYPES, CURRENCIES } from '@app/core/constants/constants'
import { CreatedAccount } from '@app/core/models/account.model'
import { ConfirmDialogService } from '@app/core/services/confirm-dialog.service'
import { AppValidators } from '@app/shared/validators/app-validators'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { SelectModule } from 'primeng/select'

@Component({
  selector: 'app-account-modal',
  imports: [DialogModule, ButtonModule, SelectModule, ReactiveFormsModule],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountModalComponent {
  fb = inject(FormBuilder)
  confirmationService = inject(ConfirmDialogService)

  @Input() isVisible = false
  @Input() isLoading = false

  @Output() closeModal = new EventEmitter<void>()
  @Output() submit = new EventEmitter<CreatedAccount>()

  readonly accountTypes = ACCOUNT_TYPES
  readonly currencies = CURRENCIES

  accountForm = this.fb.group({
    type: [null, AppValidators.required],
    currency: [null, AppValidators.required],
  })

  onCloseModal() {
    if (this.accountForm.dirty) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to close the form without saving?',
        header: 'Discard Changes',
        accept: () => {
          this.closeModal.emit()
        },
      })
    } else {
      this.closeModal.emit()
    }
  }

  onSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save the changes?',
      header: 'Save Changes',
      acceptButtonProps: {
        label: 'Save',
        severity: 'primary',
      },
      accept: () => {
        this.handleSubmit()
      },
    })
  }

  handleSubmit() {
    this.submit.emit(this.accountForm.value as unknown as CreatedAccount)
  }
}
