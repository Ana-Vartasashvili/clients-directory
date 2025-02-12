import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { Dialog } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabelModule } from 'primeng/floatlabel'
import { SelectModule } from 'primeng/select'
import { GENDERS } from '@app/core/constants/constants'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { RadioButtonModule } from 'primeng/radiobutton'
import { AccordionModule } from 'primeng/accordion'
import { DividerModule } from 'primeng/divider'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Client, ClientGender, CreatedClient } from '@app/core/models/client.model'
import { InputComponent } from '@app/shared/components/input/input.component'
import { AppValidators } from '@app/shared/validators/app-validators'
import { FormUtils } from '@app/core/utils/form.utils'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmDialogService } from '@app/core/services/confirm-dialog.service'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AvatarModule } from 'primeng/avatar'
import { environment } from '@environments/environment'

@Component({
  selector: 'app-client-modal',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    SelectModule,
    FileUploadModule,
    RadioButtonModule,
    AccordionModule,
    DividerModule,
    ReactiveFormsModule,
    InputComponent,
    ConfirmDialogModule,
    AvatarModule,
  ],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientModalComponent implements OnInit {
  fb = inject(FormBuilder)
  confirmationService = inject(ConfirmDialogService)
  router = inject(Router)
  destroyRef = inject(DestroyRef)

  @Input() isVisible = false
  @Input() isLoading = false
  @Input() client = {} as Client
  @Input() mode: 'add' | 'edit' = 'add'

  @Output() closeModal = new EventEmitter<void>()
  @Output() submit = new EventEmitter<CreatedClient>()

  readonly genders = GENDERS
  readonly imageBaseUrl = environment.imageBaseUrl

  clientForm!: FormGroup
  selectedFile: File | null = null

  get profileImage() {
    return this.client?.profileImageUrl
      ? this.imageBaseUrl + this.client.profileImageUrl
      : undefined
  }

  get modalHeader() {
    return this.mode === 'add' ? 'Add Client' : 'Edit Client'
  }

  ngOnInit(): void {
    this.clientForm = this.initForm()

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.onCloseModal()
      })
  }

  private initForm() {
    return this.fb.group({
      firstName: [this.client.firstName || '', this.getNameValidators()],
      lastName: [this.client.lastName || '', this.getNameValidators()],
      gender: this.client.gender ?? ClientGender.Male,
      documentId: [this.client.documentId || '', this.getDocumentIdValidators()],
      phoneNumber: [this.client.phoneNumber || null, this.getPhoneNumberValidators()],
      legalAddressCountry: [this.client.legalAddressCountry || '', this.getBaseValidators()],
      legalAddressCity: [this.client.legalAddressCity || '', this.getBaseValidators()],
      legalAddressLine: [this.client.legalAddressLine || '', this.getBaseValidators()],
      actualAddressCountry: [this.client.actualAddressCountry || '', this.getBaseValidators()],
      actualAddressCity: [this.client.actualAddressCity || '', this.getBaseValidators()],
      actualAddressLine: [this.client.actualAddressLine || '', this.getBaseValidators()],
      profileImage: [null],
    })
  }

  private getBaseValidators() {
    return [AppValidators.required, AppValidators.noWhiteSpaces]
  }

  private getNameValidators() {
    return [
      ...this.getBaseValidators(),
      AppValidators.minLength(2),
      AppValidators.maxLength(50),
      AppValidators.onlyGeorgianOrLatin,
    ]
  }

  private getDocumentIdValidators() {
    return [...this.getBaseValidators(), AppValidators.onlyNumbers, AppValidators.length(11)]
  }

  private getPhoneNumberValidators() {
    return [AppValidators.required, AppValidators.validPhoneNumber]
  }

  onFileUpload(event: FileSelectEvent) {
    const file = event.files[0]
    if (file) {
      this.selectedFile = file
    }
  }

  getFileUrl(file: File | null) {
    if (!file) return ''

    return URL.createObjectURL(file)
  }

  onFileRemove() {
    this.selectedFile = null
  }

  onCloseModal() {
    if (this.clientForm.dirty || this.selectedFile) {
      console.log('close')
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
    console.log('submit')
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

  private handleSubmit() {
    const trimmedFormValues: CreatedClient = FormUtils.trimFormValues(
      this.clientForm.value
    ) as CreatedClient
    trimmedFormValues['profileImage'] = this.selectedFile

    this.submit.emit(trimmedFormValues as CreatedClient)
  }
}
