import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

import {ModalModule} from 'ng-devui/modal';

import {MovieCardComponent, MovieCoverComponent} from "../../components";
import {CreateDialogComponent} from "./create-dialog/create-dialog.component";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DxButtonModule, DxLoadIndicatorModule, DxPopupModule} from "devextreme-angular";
import {TypeDialogComponent} from "./movie-dialog/movie-dialog.component";

enum MovieTypeFlag {
  None = 0,
  Default = 1 << 0,
  Serial = 1 << 1,
  Anime = 1 << 2,
  Cartoon = 1 << 3,
  All = ~(~0 << 4)
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    ModalModule,
    TypeDialogComponent,
    MovieCardComponent,
    MovieCoverComponent,
    DxButtonModule,
    DxPopupModule,
    DxLoadIndicatorModule,
    TypeDialogComponent,
    CreateDialogComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  router = inject(Router);
  httpClient = inject(HttpClient);

  loading: boolean = false;
  creating: boolean = false;
  collection: any = []
  selection: any = null
  filter: MovieTypeFlag = MovieTypeFlag.None;

  get hasDefault() {
    return (this.filter & MovieTypeFlag.Default) === MovieTypeFlag.Default;
  }

  get hasSerial() {
    return (this.filter & MovieTypeFlag.Serial) === MovieTypeFlag.Serial;
  }

  get hasAnime() {
    return (this.filter & MovieTypeFlag.Anime) === MovieTypeFlag.Anime;
  }

  get hasCartoon() {
    return (this.filter & MovieTypeFlag.Cartoon) === MovieTypeFlag.Cartoon;
  }

  handleMovieClick(item: any) {
    this.selection = item;
  }

  handleRouteHome() {
    this.router.navigate(['']);
  }

  handleDefaultFilter() {
    this.hasDefault
      ? this.filter &= ~MovieTypeFlag.Default
      : this.filter |= MovieTypeFlag.Default;

    this.query();

  }

  handleSerialFilter() {
    this.hasSerial
      ? this.filter &= ~MovieTypeFlag.Serial
      : this.filter |= MovieTypeFlag.Serial;

    this.query();

  }

  handleAnimeFilter() {
    this.hasAnime
      ? this.filter &= ~MovieTypeFlag.Anime
      : this.filter |= MovieTypeFlag.Anime;

    this.query();

  }

  handleCartoonFilter() {
    this.hasCartoon
      ? this.filter &= ~MovieTypeFlag.Cartoon
      : this.filter |= MovieTypeFlag.Cartoon;

    this.query();

  }

  query() {
    this.loading = true;

    const filters: any = [];

    if (this.hasDefault) {
      filters.push("type eq Films.Types.MovieType\'Default\'")
    }

    if (this.hasSerial) {
      filters.push("type eq Films.Types.MovieType\'Serial\'")
    }

    if (this.hasAnime) {
      filters.push("type eq Films.Types.MovieType\'Anime\'")
    }

    if (this.hasCartoon) {
      filters.push("type eq Films.Types.MovieType\'Cartoon\'")
    }

    let params = new HttpParams()

    if(filters.length) {
      params = params.append("$filter", filters.join(" or "))
    }

    this.httpClient.get('/api/Movies/', {
      params
    }).subscribe({
      next: ({ value }: any) => {
        this.collection = value
        this.loading = false;
      },
      error: () => {
        this.collection = []
        this.loading = false;
      }
    })
  }

  handleSave({name, year, genre, description, file, type}: any) {
    const payload = new FormData();

    payload.append("name", name)
    payload.append("description", description)
    payload.append("year", year.getFullYear())
    payload.append(`type`, type)

    for (let i = 0; i < genre.length; i++) {
      payload.append(`genre[${i}]`, genre[i])
    }

    payload.append("files", file)

    this.httpClient.post("/api/Movies/", payload).subscribe(() => {
      this.query();
      this.creating = false;
    })
  }

  constructor() {
    this.query();
  }


}
