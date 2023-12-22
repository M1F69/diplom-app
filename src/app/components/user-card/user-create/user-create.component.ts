import {Component} from "@angular/core"
import {DxFormModule, DxPopupModule} from "devextreme-angular";

@Component({
  standalone: true,
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  imports: [
    DxPopupModule,
    DxFormModule
  ]
})
export class UserCreateComponent {
  record: any = {};

  login() {
    // запрос логина
  }
}
