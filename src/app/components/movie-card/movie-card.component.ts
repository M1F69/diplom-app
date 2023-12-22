import {Component, ElementRef, inject, Input} from "@angular/core";
import {DxLoadIndicatorModule} from "devextreme-angular";
import {MovieCoverComponent} from "../movie-cover";
import {MovieDetailsComponent} from "./movie-details";
import {fromEvent} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-movie-card',
  styleUrl: './movie-card.component.scss',
  templateUrl: './movie-card.component.html',
  imports: [
    DxLoadIndicatorModule,
    MovieCoverComponent,
    MovieDetailsComponent,
  ],
})
export class MovieCardComponent {
  @Input() item: any;

  details = false;

  constructor() {
    fromEvent(inject(ElementRef).nativeElement, 'click').subscribe(() => this.details = true)
  }
}
