import {Component} from '@angular/core';
import {MovieCardComponent} from "../../components";
import {HomeCategoryComponent} from "./home-category/home-category.component";
import {Category} from "../../utils/category";
import {DxGalleryModule} from "devextreme-angular";

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [
    MovieCardComponent,
    HomeCategoryComponent,
    DxGalleryModule
  ]
})
export class HomeComponent {
  Category = Category
}
