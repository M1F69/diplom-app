import {Component} from "@angular/core"
import {DxFormModule, DxPopupModule} from "devextreme-angular";
import {UserCreateComponent} from "./user-create/user-create.component";

@Component({
  standalone: true,
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  imports: [
    DxPopupModule,
    DxFormModule,
    UserCreateComponent
  ]
})
export class UserCardComponent {
  creatingUser:boolean = false
  record: any = {};

  login() {
  this.creatingUser =true
    // запрос логина
  }

constructor() {

  this.login = this.login.bind(this)
}
}
