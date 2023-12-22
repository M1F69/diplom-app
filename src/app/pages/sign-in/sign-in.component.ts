import {Component, inject, ViewChild} from '@angular/core';
import {DxButtonModule, DxFormComponent, DxFormModule, DxLoadPanelModule} from "devextreme-angular";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";


@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    DxFormModule,
    DxButtonModule,
    DxLoadPanelModule
  ]
})
export class SignInComponent {
  router = inject(Router)
  appService = inject(AppService)

  loading = false;

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
