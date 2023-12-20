import {Component, Input} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-type-dialog',
  templateUrl: './type-dialog.component.html'
})
export class TypeDialogComponent {
  @Input() data: any;

  handle(type: string) {
    this.data(type)
  }
}
