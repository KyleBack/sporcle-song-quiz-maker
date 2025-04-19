import { Routes } from '@angular/router';
import { SongSearchComponent } from "./song-search/song-search.component";
import { SongSpliceComponent } from "./song-splice/song-splice.component";
import { SongUploadComponent } from "./song-upload/song-upload.component";
import { TrimDurationComponent } from "./song-splice/trim-duration/trim-duration.component";
import { ArrangeSongsComponent } from "./song-splice/arrange-songs/arrange-songs.component";

export const SEARCH_ROUTE = 'search';
export const SPLICE_ROUTE = 'splice';
export const UPLOAD_ROUTE = 'upload';

export const routes: Routes = [
  {
    path: SEARCH_ROUTE,
    component: SongSearchComponent
  },
  {
    path: SPLICE_ROUTE, component: SongSpliceComponent,
    children: [
      { path: '', component: ArrangeSongsComponent },
      { path: ':id', component: TrimDurationComponent }
    ]
  },
  {
    path: UPLOAD_ROUTE, component: SongUploadComponent
  },
  {
    path: '', redirectTo: SEARCH_ROUTE, pathMatch: 'full'
  },
];
