import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {MovieCoverComponent} from "../../movie-cover";

@Component({
  standalone: true,
  selector: 'app-movie-details',
  imports: [
    DxPopupModule,
    DxTemplateModule,
    MovieCoverComponent,
  ],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent {
  @Input() value: any;
  @Output() close = new EventEmitter();
}
