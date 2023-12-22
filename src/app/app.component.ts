import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DxButtonModule} from "devextreme-angular";
import {CreateDialogComponent} from "./pages/movies/create-dialog";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {AppService} from "./app.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DxButtonModule, CreateDialogComponent, UserCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  appService = inject(AppService)
}
