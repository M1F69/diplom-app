import {Component, Input, ViewEncapsulation} from "@angular/core";
import {
  ButtonModule,
  DatepickerModule,
  FormLayout,
  FormModule,
  IFileOptions, IUploadOptions,
  SelectModule,
  TextInputModule,
  UploadModule
} from "ng-devui";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppendToBodyDirection} from "ng-devui/utils";

@Component({
  standalone: true,
  selector: 'app-create-dialog',
  imports: [
    FormModule,
    TextInputModule,
    FormsModule,
    DatepickerModule,
    SelectModule,
    UploadModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateDialogComponent {
  @Input() data!: { type: string, handle: (payload: any) => void }

  href: string | null = null;

  layoutDirection: FormLayout = FormLayout.Vertical;

  appendToBodyDirections: AppendToBodyDirection[] = ['centerDown', 'centerUp'];
  fileOptions: IFileOptions = {multiple: false, accept: '.png,.zip,.jpg',};
  uploadOptions: IUploadOptions = { uri: '', maximumCount: 1, maximumSize: Number.MAX_SAFE_INTEGER};

  formGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    year: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    genre: new FormControl<Array<{ name: string, value: number }>>([], { nonNullable: true }),
    file: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  })

  options = [
    {value: 0, name: "фантастика"},
    {value: 1, name: "ужасы"},
    {value: 2, name: "семейный"},
    {value: 3, name: "мюзикл"},
    {value: 4, name: "криминал"},
    {value: 5, name: "мелодрама"},
    {value: 6, name: "комедия"},
    {value: 7, name: "документальный"},
    {value: 8, name: "боевик"},
    {value: 9, name: "военный"},
    {value: 10, name: "детектив"},
  ];

  file!: File

  handleDrop(file: File) {
    this.file = file
    this.href = URL.createObjectURL(file);
  }

  handleSave() {
    this.formGroup.markAllAsTouched();

    if(!this.formGroup.valid) {
      return
    }

    this.data.handle({ ...this.formGroup.value, file: this.file });
  }
}
