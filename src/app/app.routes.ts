import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/home/home.component').then(
        (c) => c.HomeComponent
      )
  },
  {
    path: 'movie',
    loadComponent: () =>
      import('../app/pages/movie/movie.component').then(
        (c) => c.MovieComponent
      )
  }, {
    path: 'movies',
    loadComponent: () =>
      import('../app/pages/movies/movies.component').then(
        (c) => c.MoviesComponent
      )
  },
  {
    path: '**', redirectTo: ''
  }
];
