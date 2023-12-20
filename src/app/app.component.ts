import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DevUIModule} from "ng-devui";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DevUIModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
