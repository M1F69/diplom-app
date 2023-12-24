import {Component, EventEmitter, Output} from "@angular/core"
import {DxPopupModule} from "devextreme-angular";
import {ThemeFormComponent} from "./theme/theme-form/theme-form.component";

@Component({
  standalone: true,
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  imports: [
    DxPopupModule,
    ThemeFormComponent,
  ]
})
export class UserSettingsComponent {
  @Output() close = new EventEmitter();
}
