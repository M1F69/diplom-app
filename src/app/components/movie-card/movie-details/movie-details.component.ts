import {Component, EventEmitter, inject, Input, OnInit, Output, SecurityContext} from "@angular/core";
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
export class MovieDetailsComponent implements OnInit {
  @Input() value: any;
  @Output() close = new EventEmitter();

  sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.value.trailerHref = this.sanitizeUrl(this.value.trailerHref)
  }

  sanitizeUrl(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
      console.log(match[2]);
      let sepratedID = match[2];
      let embedUrl = '//www.youtube.com/embed/' + sepratedID;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return '';
  }
}
