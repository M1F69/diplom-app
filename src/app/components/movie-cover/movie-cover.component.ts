import {Component, inject, Input} from "@angular/core";
import {DxLoadIndicatorModule} from "devextreme-angular";
import {MovieCoverService} from "./movie-cover.service";


@Component({
  standalone: true,
  selector: 'app-movie-cover',
  templateUrl: './movie-cover.component.html',
  imports: [
    DxLoadIndicatorModule
  ],
  providers: [
    MovieCoverService
  ]
})
export class MovieCoverComponent {
  service = inject(MovieCoverService);

  href: string | null = null;
  loading: boolean = false;

  @Input() set id(id: string) {
    this.loading = true;
    this.service.get(`${id}`).subscribe({
      next: (blob) => {
        this.href = URL.createObjectURL(blob);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })

  }

}
