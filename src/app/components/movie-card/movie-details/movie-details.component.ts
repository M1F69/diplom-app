import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {DxPopupModule, DxTemplateModule, DxToastModule} from "devextreme-angular";
import {MovieCoverComponent} from "../../movie-cover";
import {DomSanitizer} from "@angular/platform-browser";
import {CreateDialogComponent} from "../../../pages/movies/create-dialog";
import {HttpClient} from "@angular/common/http";
import {getTypeBy} from "../../../utils/normalize-type";
import {getGenreBy, getGenresBy} from "../../../utils/normalize-genre";
import {confirm} from 'devextreme/ui/dialog';
import {AppService} from "../../../app.service";
import {AppComponent} from "../../../app.component";

@Component({
  standalone: true,
  selector: 'app-movie-details',
  imports: [
    DxPopupModule,
    DxTemplateModule,
    MovieCoverComponent,
    CreateDialogComponent,
    DxToastModule,
  ],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent {
  appService = inject(AppService);
  sanitizer = inject(DomSanitizer);
  httpClient = inject(HttpClient);
  trailerHref: string = '';
  viewed = false;

  @Input() set value(value: any) {
    value = {...value};

    this.trailerHref = this.sanitizeUrl(value.trailerHref) as string
    this._value = value;

    this.viewed = !!this.appService.user.viewed.find((x: any) => x.id === value.id)
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

  handleViewed() {
    const user = this.appService.user;
    this.httpClient.post(`/api/viewed`, { userId: user.id, movieId: this._value.id }).subscribe((user) => {
      this.appService.user = user;

      this.viewed = !!this.appService.user.viewed.find((x: any) => x.id === this._value.id)

      localStorage.setItem('user', JSON.stringify(user))
    });
  }
  handleUnViewed() {
    const user = this.appService.user;
    this.httpClient.post(`/api/unviewed`, { userId: user.id, movieId: this._value.id }).subscribe((user) => {
      this.appService.user = user;

      this.viewed = !!this.appService.user.viewed.find((x: any) => x.id === this._value.id)

      localStorage.setItem('user', JSON.stringify(user))
    });
  }

  handleEdit() {
    this.editing = true
  }

  handleDelete() {
    const id = this._value.id

    let result = confirm("<i>Удалить?</i>", "Подтверждение");
    result.then((dialogResult) => {
      if (dialogResult) {
        this.httpClient.delete(`/api/Movies(${id})`).subscribe(   {
            next: () => {
              this.appService.showToast("success","Фильм удалён")
              this.editing = false;
                this.close.emit();
                window.location.reload()
            },
            error: () =>{
            }
          })

      }
    });


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

    this.httpClient.patch(`/api/Movies(${id})`, payload).subscribe({
      next: () => {

        this.editing = false;
          this.close.emit();
          window.location.reload()
      },
      error: () =>{
      }
    })

  }

  constructor() {
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleViewed = this.handleViewed.bind(this)
    this.handleUnViewed = this.handleUnViewed.bind(this)
  }

  protected readonly getTypeBy = getTypeBy;
  protected readonly getGenreBy = getGenreBy;
  protected readonly getGenresBy = getGenresBy;
}
