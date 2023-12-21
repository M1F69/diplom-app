import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {ButtonModule, DatepickerModule, FormModule, SelectModule, TextInputModule, UploadModule} from "ng-devui";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  DxButtonModule,
  DxDropDownBoxModule,
  DxFormComponent,
  DxFormModule, DxListModule,
  DxPopupModule,
  DxSelectBoxModule
} from "devextreme-angular";
import ArrayStore from "devextreme/data/array_store";


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
    ReactiveFormsModule,
    DxFormModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxDropDownBoxModule,
    DxListModule
  ],
  templateUrl: './create-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateDialogComponent {
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  @ViewChild(DxFormComponent) dxFormRef!: DxFormComponent;

  file: File | null = null;
  href: string | null = null;
  record: any = {};
  genres: any[] = [];

  genreStore = new ArrayStore({
    key: 'id',
    data: [
      {id: 0, name: "Фантастика"},
      {id: 1, name: "Ужасы"},
      {id: 2, name: "Семейный"},
      {id: 3, name: "Мюзикл"},
      {id: 4, name: "Криминал"},
      {id: 5, name: "Мелодрама"},
      {id: 6, name: "Комедия"},
      {id: 7, name: "Документальный"},
      {id: 8, name: "Боевик"},
      {id: 9, name: "Военный"},
      {id: 10, name: "Детектив"},
    ]
  })

  typeStore = new ArrayStore({
    key: 'id',
    data: [
      {id: 0, name: "Фильм"},
      {id: 1, name: "Мультфильм"},
      {id: 2, name: "Сериал"},
      {id: 3, name: "Аниме"},
    ]
  })

  handleSave() {
    const validation = this.dxFormRef.instance.validate()

    if(!validation.isValid || !this.file) {
      return;
    }
    this.save.emit({...this.dxFormRef.formData, genre: [...this.genres], file: this.file});

    this.record = {}
    this.genres = []
  }

  handleUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
      const input = (e.target as HTMLInputElement);
      this.file = input.files![0];
      this.href = URL.createObjectURL(this.file);
    }

    input.click();
  }

  constructor() {
    this.handleSave = this.handleSave.bind(this)
  }

}
