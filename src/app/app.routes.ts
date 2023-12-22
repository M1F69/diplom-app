import {Routes} from '@angular/router';
import {AppGuard} from "./app.guard";

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('../app/pages/sign-in').then(
        (c) => c.SignInComponent
      )
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    canActivate: [AppGuard]
  },
  {
    path: 'movie',
    loadComponent: () =>
      import('../app/pages/movie/movie.component').then(
        (c) => c.MovieComponent
      ),
    canActivate: [AppGuard]
  }, {
    path: 'movies',
    loadComponent: () =>
      import('../app/pages/movies/movies.component').then(
        (c) => c.MoviesComponent
      ),
    canActivate: [AppGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];
