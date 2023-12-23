import {map} from "rxjs";

import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";

import {DxButtonModule, DxLoadIndicatorModule, DxPopupModule} from "devextreme-angular";

import {ModalModule} from 'ng-devui/modal';

import {filterCategory, filterType} from "../../utils/odata";
import {MovieCardComponent, MovieCoverComponent} from "../../components";

import {CreateDialogComponent} from "./create-dialog";
import {getGenreBy} from "../../utils/normalize-genre";
import {AppService} from "../../app.service";


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
    MovieCardComponent,
    MovieCoverComponent,
    DxButtonModule,
    DxPopupModule,
    DxLoadIndicatorModule,
    CreateDialogComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  router = inject(Router);
  httpClient = inject(HttpClient);
  appService = inject(AppService);

  category: string = '';
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

  public query() {
    this.loading = true;

    const filters: any = [];

    if (this.hasDefault) {
      filters.push(filterType("Default"))
    }

    if (this.hasSerial) {
      filters.push(filterType("Serial"))
    }

    if (this.hasAnime) {
      filters.push(filterType("Anime"))
    }

    if (this.hasCartoon) {
      filters.push(filterType("Cartoon"))
    }

    let params = new HttpParams()

    params = params.append("$filter", filters.length ? `(${filters.join(" or ")})` + ` and ${filterCategory(this.category)}` : filterCategory(this.category))

    this.httpClient.get('/api/Movies/', {
      params
    }).subscribe({
      next: ({value}: any) => {
        this.collection = value
        this.loading = false;
      },
      error: () => {
        this.collection = []
        this.loading = false;
      }
    })
  }


  constructor() {
    inject(ActivatedRoute).queryParams.pipe(
      map((params) => params['id'])
    ).subscribe((value) => {
      this.category = value;
      this.query();
    });
  }


    protected readonly getGenreBy = getGenreBy;
}
