import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DevUIModule} from "ng-devui";
import {DxiItemModule, DxiToolbarItemModule} from "devextreme-angular/ui/nested";
import {DxButtonModule} from "devextreme-angular";
import {CreateDialogComponent} from "./pages/movies/create-dialog";
import {UserCardComponent} from "./components/user-card/user-card.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DevUIModule, DxiItemModule, DxiToolbarItemModule, DxButtonModule, CreateDialogComponent, UserCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  login:boolean = false
  handleUser() {
    this.login=true
  }


}
