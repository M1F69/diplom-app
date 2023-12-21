import {Component, inject} from '@angular/core';
import {MovieCardComponent} from "../../components";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../utils/category";
import {filterCategory} from "../../utils/odata";

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [
    MovieCardComponent
  ]
})
export class HomeComponent {
  router = inject(Router);
  httpClient = inject(HttpClient);

  handleRouteMovies(category: string) {
    this.router.navigate(['movies'], { queryParams: { category } });
  }

  fantastic: { title: string, collection: any[] } = { title: 'Фантастика', collection: [] };
  horror: { title: string, collection: any[] } = { title: 'Ужасы', collection: [] };
  family: { title: string, collection: any[] } = { title: 'Семейный', collection: [] };
  musical: { title: string, collection: any[] } = { title: 'Мюзикл', collection: [] };
  crime: { title: string, collection: any[] } = { title: 'Криминал', collection: [] };
  melodrama: { title: string, collection: any[] } = { title: 'Мелодрама', collection: [] };
  comedy: { title: string, collection: any[] } = { title: 'Комедия', collection: [] };
  documentary: { title: string, collection: any[] } = { title: 'Документальный', collection: [] };
  actionmovie: { title: string, collection: any[] } = { title: 'Боевик', collection: [] };
  military: { title: string, collection: any[] } = { title: 'Военный', collection: [] };
  detective: { title: string, collection: any[] } = { title: 'Детектив', collection: [] };

  data: { collection: any[], title: string, id: string }[] = []

  constructor() {
    Category.forEach(([id, title]) => {
      this.httpClient.get('/api/Movies/', {
        params: {
          $filter: filterCategory(id),
          $top: 5
        }
      }).subscribe({
        next: ({value}: any) => {
          (this as any)[id.toLowerCase()] = { title: title, collection: value };
        },
        error: () => {

        }
      })
    })
  }
}
