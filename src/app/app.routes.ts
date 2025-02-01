import { Routes } from '@angular/router';
import { SongSearchComponent } from "./song-search/song-search.component";

export const routes: Routes = [
  { path: '', redirectTo: 'song-search', pathMatch: 'full' },
  { path: 'song-search', component: SongSearchComponent }
];
