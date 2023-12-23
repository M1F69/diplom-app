import {Component, inject, ViewChild} from '@angular/core';
import {DxButtonModule, DxFormComponent, DxFormModule, DxLoadPanelModule, DxToastModule} from "devextreme-angular";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";


@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    DxFormModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxToastModule
  ]
})
export class SignInComponent {
  router = inject(Router)
  appService = inject(AppService)

  loading = false;
  isVisibleToast:boolean=false;
 type:"custom" | "error" | "info" | "success" | "warning" = 'error';
  message = 'Проверьте данные, логин или пароль не верны';

  @ViewChild(DxFormComponent) dxFormRef!: DxFormComponent

  handleSignIn(withUser: boolean) {
    if(withUser) {
      const { username, password } = this.dxFormRef.formData

      this.loading = true;

      this.appService.signIn(username, password).subscribe({
        next: () => {
          this.router.navigate([''])
          this.loading = false
        },
        error: () =>{
          this.isVisibleToast = true;
          this.loading = false
        }
      });
      return
    }

    this.appService.signInAnonymous()
    this.router.navigate([''])
  }

  handleSignUp() {
    this.router.navigate(['sign-up'])

  }

}
