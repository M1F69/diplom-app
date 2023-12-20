import {Component, Input} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-movie-card',
  styleUrl: './movie-card.component.scss',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {

  @Input() href: string = '';
  @Input() name: string = '';

}
