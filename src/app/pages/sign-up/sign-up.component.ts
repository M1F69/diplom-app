import {Component, inject, ViewChild} from '@angular/core';
import {DxButtonModule, DxFormComponent, DxFormModule, DxLoadPanelModule} from "devextreme-angular";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    DxFormModule,
    DxButtonModule,
    DxLoadPanelModule
  ]
})
export class SignUpComponent {
  router = inject(Router)
  appService = inject(AppService)
  httpClient = inject(HttpClient)

  loading = false;

  @ViewChild(DxFormComponent) dxFormRef!: DxFormComponent

  handleSignIn() {
    this.router.navigate(['sign-in'])
  }

  handleSignUp() {
   const x = this.dxFormRef.instance.validate();
   if(!x.isValid){
     return
   }
    const {nickname, password, mail, fullname} = this.dxFormRef.formData

    this.loading = true
    this.httpClient.post('/api/users', {nickname, password, mail, fullname}).subscribe({
      next: () => {
        this.router.navigate(['sign-in'])
        this.loading = false
      },
      error: () => {
        this.loading = false
      }
    });

  }
}
