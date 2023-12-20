import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

import {DialogService, ModalModule} from 'ng-devui/modal';

import {ToggleComponent, MovieCardComponent} from "../../components";

import {TypeDialogComponent} from "./type-dialog/type-dialog.component";
import {CreateDialogComponent} from "./create-dialog/create-dialog.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    ModalModule,
    TypeDialogComponent,
    MovieCardComponent,
    ToggleComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  router = inject(Router);
  httpClient = inject(HttpClient);
  dialogService = inject(DialogService);

  arr = new Array(100)

  handleRouteHome() {
    this.router.navigate(['']);
  }

  handleAppendDialog() {
    const typeDialog = this.dialogService.open({
      title: 'Что вы хотите добавить?',
      width: `360px`,
      data: (type: string) => {
        typeDialog.modalInstance.hide();
        this.handleCreateDialog(type)
      },
      content: TypeDialogComponent,
      buttons: []
    });

  }

  handleCreateDialog(type: string) {
    const createDialog = this.dialogService.open({
      title: type,
      width: `450px`,
      maxHeight: `650px`,
      data: {
        type,
        handle: (payload: any) => {
          console.log({...payload, type})

          const formData = new FormData()

          formData.append("type", type)
          formData.append("name", payload.name)
          formData.append("year", payload.year.getFullYear())
          formData.append("genre", payload.genre.reduce(({ value }: any) => value))
          formData.append("files", payload.file)

          this.httpClient.post("/api/Movies/", formData).subscribe(() => {
            createDialog.modalInstance.hide();
          })

        }
      },
      content: CreateDialogComponent,
      buttons: []
    });
  }

}
