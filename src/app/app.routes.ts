import { Routes } from '@angular/router';
import { SongSearchComponent } from "./song-search/song-search.component";
import { SongTrimComponent } from "./song-trim/song-trim.component";
import { SongUploadComponent } from "./song-upload/song-upload.component";

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SongSearchComponent },
  { path: 'trim', component: SongTrimComponent },
  { path: 'upload', component: SongUploadComponent }
];
