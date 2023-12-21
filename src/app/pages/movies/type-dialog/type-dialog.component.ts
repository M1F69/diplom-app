import {Component, Input} from "@angular/core";
import {DxButtonModule} from "devextreme-angular";

@Component({
  standalone: true,
  selector: 'app-type-dialog',
  imports: [
    DxButtonModule
  ],
  templateUrl: './type-dialog.component.html'
})
export class TypeDialogComponent {
  @Input() data: any;

  handle(type: string) {
    this.data(type)
  }
}
