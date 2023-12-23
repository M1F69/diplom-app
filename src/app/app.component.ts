import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DxButtonModule, DxToastModule} from "devextreme-angular";
import {CreateDialogComponent} from "./pages/movies/create-dialog";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {AppService} from "./app.service";
import {Category} from "./utils/category";
import {HomeCategoryComponent} from "./pages/home/home-category/home-category.component";
import {HttpClient} from "@angular/common/http";
import {MoviesComponent} from "./pages/movies/movies.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DxButtonModule, CreateDialogComponent, UserCardComponent, HomeCategoryComponent, DxToastModule],
  providers: [MoviesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  appService = inject(AppService)


  protected readonly Category = Category;


  httpClient = inject(HttpClient);
  moviesComponent = inject(MoviesComponent);


  creating: boolean = false;

  handleSave({name, year, genre, description, file, trailerHref, type}: any) {
    const payload = new FormData();

    payload.append("name", name)
    payload.append("trailerHref", trailerHref)
    payload.append("description", description)
    payload.append("year", year.getFullYear())
    payload.append(`type`, type)

    for (let i = 0; i < genre.length; i++) {
      payload.append(`genre[${i}]`, genre[i])
    }

    payload.append("files", file)

    this.httpClient.post("/api/Movies/", payload).subscribe(
      {
        next: () => {
this.appService.showToast("success","Фильм успешно добавлен ")

          this.moviesComponent.query();
            this.creating = false;
        },
        error: () => {
          this.appService.showToast("success","Фильм не добавлен ")


        }
      })
  }

}
