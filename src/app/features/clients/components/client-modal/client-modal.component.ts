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
import { InputComponent } from '@app/features/shared/components/input/input.component'

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
      FirstName: '',
      LastName: '',
      Gender: ClientGender.Male,
      DocumentId: '',
      PhoneNumber: null,
      LegalAddressCountry: '',
      LegalAddressCity: '',
      LegalAddressLine: '',
      ActualAddressCountry: '',
      ActualAddressCity: '',
      ActualAddressLine: '',
    })
  }

  onCloseModal() {
    this.closeModal.emit()
  }
}
