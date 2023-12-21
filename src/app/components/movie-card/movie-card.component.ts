import {Component, Input} from "@angular/core";
import {DxLoadIndicatorModule} from "devextreme-angular";
import {MovieCoverComponent} from "../movie-cover";

@Component({
  standalone: true,
  selector: 'app-movie-card',
  styleUrl: './movie-card.component.scss',
  templateUrl: './movie-card.component.html',
  imports: [
    DxLoadIndicatorModule,
    MovieCoverComponent
  ],
})
export class MovieCardComponent {
  @Input() item: any;
}
