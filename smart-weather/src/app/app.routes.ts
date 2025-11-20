import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  {
    path: 'notes',
    loadComponent: () => import('./pages/notes-page/notes-page').then((m) => m.NotesPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
