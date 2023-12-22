import {inject, Injectable} from "@angular/core";
import {AppService} from "./app.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class AppGuard {
  router = inject(Router);
  appService = inject(AppService);

  canActivate(): boolean {
    if (this.appService.user !== null) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
