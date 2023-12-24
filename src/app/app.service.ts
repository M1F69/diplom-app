import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AppService {
  httpClient = inject(HttpClient);

  user = signal<any>(null);
  public isVisibleToast: boolean = false;
  public type: "custom" | "error" | "info" | "success" | "warning" = 'error';
  public message = '';


  constructor() {
    const userRaw = localStorage.getItem('user');

    this.user.set(userRaw ? JSON.parse(userRaw) : null)
  }

  public signIn(username: string, password: string) {
    return this.httpClient.post('/api/sign-in', {username, password}).pipe(
      tap((data) => {
        this.user.set(data)
        localStorage.setItem('user', JSON.stringify(this.user()))
      })
    )
  }


  public showToast(type: "custom" | "error" | "info" | "success" | "warning",message:string) {
    this.type = type;
    this.message = message;
    this.isVisibleToast = true;


  }
  public signInAnonymous() {
    this.user.set({
      id: null,
      nickName: "Аноним",
      fullName: "Аноним",
      password: "",
      mail: "",
      viewed: []
    })
    localStorage.setItem('user', JSON.stringify(this.user()))
  }

  public signOut() {
    this.user.set(null);
    localStorage.removeItem('user')

    window.location.reload()
  }

}
