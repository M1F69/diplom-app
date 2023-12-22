import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {MovieCoverComponent} from "../../movie-cover";
import {DomSanitizer} from "@angular/platform-browser";
import {CreateDialogComponent} from "../../../pages/movies/create-dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-movie-details',
  imports: [
    DxPopupModule,
    DxTemplateModule,
    MovieCoverComponent,
    CreateDialogComponent,
  ],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent {
  sanitizer = inject(DomSanitizer);
  httpClient = inject(HttpClient);
  trailerHref: string = '';

  @Input() set value(value: any) {
    value = {...value};

    this.trailerHref = this.sanitizeUrl(value.trailerHref) as string
    this._value = value;


  }

  @Output() close = new EventEmitter();

  _value: any = {};
  editing: boolean = false;


  sanitizeUrl(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
      let sepratedID = match[2];
      let embedUrl = '//www.youtube.com/embed/' + sepratedID;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return '';
  }

  handleEdit() {
    this.editing = true
  }

  handleUpdate({name, year, genre, description, file, trailerHref, type}: any) {
    const id = this._value.id

    const payload = new FormData();

    year = new Date(year);
    payload.append("name", name)
    payload.append("trailerHref", trailerHref)
    payload.append("description", description)
    payload.append("year", year.getFullYear())
    payload.append(`type`, type)

    for (let i = 0; i < genre.length; i++) {
      payload.append(`genre[${i}]`, genre[i])
    }

    payload.append("files", file)

    this.httpClient.patch(`/api/Movies(${id})`, payload).subscribe(() => {
      this.editing = false;
    })
    // }
    // http://84.54.44.140/api/Movies(002fb8cd-89ad-4f38-857f-5885bf74b8fb)
    // save change in movie entity (mb by id)
  }

  constructor() {
    this.handleEdit = this.handleEdit.bind(this)
  }
}
