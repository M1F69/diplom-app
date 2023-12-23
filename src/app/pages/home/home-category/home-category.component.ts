import {Component, inject, Input, OnInit} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {MovieCardComponent} from "../../../components";
import {filterCategory} from "../../../utils/odata";

@Component({
  standalone: true,
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  imports: [
    MovieCardComponent,
    NgTemplateOutlet
  ]
})
export class HomeCategoryComponent implements OnInit {
  router = inject(Router);
  httpClient = inject(HttpClient);

  @Input() id!: string;
  @Input() title!: string;

  public collection: any[] = [];

  handleRouteMovies() {
    this.router.navigate(['movies'], {queryParams: { id: this.id }});
  }

  ngOnInit() {
    this.httpClient.get('/api/Movies/', {
      params: {
        $filter: filterCategory(this.id),
        $top: 6
      }
    }).subscribe({
      next: ({value}: any) => {
        this.collection = value;
      },
      error: () => {
      }
    })
  }
}
