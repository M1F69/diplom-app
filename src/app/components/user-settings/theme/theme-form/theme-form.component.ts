import {Component, inject} from "@angular/core"
import {DxFormModule} from "devextreme-angular";
import {ThemeService} from "../theme.service";

@Component({
  standalone: true,
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  imports: [
    DxFormModule,
  ]
})
export class ThemeFormComponent {
  themeService = inject(ThemeService);
  value: Record<string, string> = {};

  constructor() {
    this.value = this.themeService.colors;
  }
}
