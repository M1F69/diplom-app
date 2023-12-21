import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {MovieCoverComponent} from "../../../components";

@Component({
  standalone: true,
  selector: 'app-movie-dialog',
  imports: [
    DxPopupModule,
    DxTemplateModule,
    MovieCoverComponent
  ],
  templateUrl: './movie-dialog.component.html'
})
export class TypeDialogComponent {
  @Input() selection: any;
  @Output() close = new EventEmitter();
}
