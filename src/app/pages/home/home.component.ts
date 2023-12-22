import {Component} from '@angular/core';
import {MovieCardComponent} from "../../components";
import {HomeCategoryComponent} from "./home-category/home-category.component";
import {Category} from "../../utils/category";

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [
    MovieCardComponent,
    HomeCategoryComponent
  ]
})
export class HomeComponent {
  Category = Category
}
