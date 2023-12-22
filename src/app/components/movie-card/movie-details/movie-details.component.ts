import {Component, EventEmitter, inject, Input, Output, SecurityContext} from "@angular/core";
import {DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {MovieCoverComponent} from "../../movie-cover";
import {DomSanitizer} from "@angular/platform-browser";

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

  sanitizer = inject(DomSanitizer);

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
