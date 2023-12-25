import {Component, computed, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DxButtonModule, DxDropDownButtonModule, DxTextAreaModule, DxToastModule} from "devextreme-angular";
import {CreateDialogComponent} from "./pages/movies/create-dialog";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {AppService} from "./app.service";
import {HomeCategoryComponent} from "./pages/home/home-category/home-category.component";
import {HttpClient} from "@angular/common/http";
import {MoviesComponent} from "./pages/movies/movies.component";
import {ThemeService} from "./components/user-settings/theme/theme.service";
import {ItemClickEvent} from "devextreme/ui/drop_down_button";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DxButtonModule, DxTextAreaModule, CreateDialogComponent, UserCardComponent, HomeCategoryComponent, DxToastModule, DxDropDownButtonModule, UserSettingsComponent],
  providers: [MoviesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  appService = inject(AppService)
  themeService = inject(ThemeService)
  httpClient = inject(HttpClient);
  moviesComponent = inject(MoviesComponent);

  creating: boolean = false;
  settings: boolean = false;

  buttons = computed(() => {
    const user = this.appService.user();
    if (!user) return [];

    return user.id !== null ? [
      {value: 'append', text: 'Добавить'},
      {value: 'settings', text: 'Настройки'},
      {value: 'sign-out', text: 'Выйти'}
    ] : [
      {value: 'settings', text: 'Настройки'},
      {value: 'sign-out', text: 'Выйти'}
    ]
  })

  constructor() {
    this.themeService.initTheme();
  }

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
          this.appService.showToast("success", "Фильм успешно добавлен ")

          this.moviesComponent.query();
          this.creating = false;
        },
        error: () => {
          this.appService.showToast("success", "Фильм не добавлен ")
        }
      })
  }

  handleAction(event: ItemClickEvent) {
    switch (event.itemData.value) {
      case 'append':
        this.creating = true;
        break;
      case 'settings':
        this.settings = true;
        break;
      case 'sign-out':
        this.appService.signOut();
        break;
    }
  }
}
