import {Component, inject} from '@angular/core';
import {MovieCardComponent} from "../../components";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [
    MovieCardComponent
  ]
})
export class HomeComponent {
  router = inject(Router);

  handleRouteMovies() {
    this.router.navigate(['movies']);
  }
}
