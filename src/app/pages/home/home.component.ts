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
  dataSourse = ['assets/1.jpg','assets/2.jpg','assets/3.jpeg', 'assets/4.jpeg', 'assets/5.jpeg', 'assets/6.jpeg','assets/7.jpeg','assets/8.jpeg','assets/9.jpeg','assets/10.jpeg', 'assets/11.jpeg',]
}
