import {
  ChangeDetectionStrategy,
  Component,
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
import { FileUploadModule } from 'primeng/fileupload'
import { RadioButtonModule } from 'primeng/radiobutton'
import { AccordionModule } from 'primeng/accordion'
import { DividerModule } from 'primeng/divider'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ClientGender } from '@app/core/models/client.model'
import { InputComponent } from '@app/shared/components/input/input.component'
import { AppValidators } from '@app/shared/validators/app-validators'

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
  ],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientModalComponent implements OnInit {
  fb = inject(FormBuilder)

  @Input() isVisible = false

  @Output() closeModal = new EventEmitter<void>()

  readonly genders = GENDERS
  clientForm!: FormGroup

  ngOnInit(): void {
    this.clientForm = this.initForm()
  }

  private initForm() {
    return this.fb.group({
      FirstName: ['', this.getNameValidators()],
      LastName: ['', this.getNameValidators()],
      Gender: ClientGender.Male,
      DocumentId: ['', this.getDocumentIdValidators()],
      PhoneNumber: [null, this.getPhoneNumberValidators()],
      LegalAddressCountry: ['', this.getBaseValidators()],
      LegalAddressCity: ['', this.getBaseValidators()],
      LegalAddressLine: ['', this.getBaseValidators()],
      ActualAddressCountry: ['', this.getBaseValidators()],
      ActualAddressCity: ['', this.getBaseValidators()],
      ActualAddressLine: ['', this.getBaseValidators()],
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
    return [...this.getBaseValidators(), AppValidators.onlyNumbers, AppValidators.maxLength(11)]
  }

  private getPhoneNumberValidators() {
    return [AppValidators.required, AppValidators.validPhoneNumber]
  }

  onCloseModal() {
    this.closeModal.emit()
  }
}
