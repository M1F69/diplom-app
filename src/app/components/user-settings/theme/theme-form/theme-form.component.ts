import {Component, inject} from "@angular/core"
import {DxColorBoxModule, DxFormModule} from "devextreme-angular";
import {ThemeService} from "../theme.service";

@Component({
  standalone: true,
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  imports: [
    DxFormModule,
    DxColorBoxModule
  ]
})
export class ThemeFormComponent {
  themeService = inject(ThemeService);
  value: Record<string, string> = {};

  constructor() {
    this.value = this.themeService.colors;

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange() {
    this.themeService.setColors(this.value)
  }
}
