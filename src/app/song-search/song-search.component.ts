import { Component } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import { SongSearchService } from "./song-search.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { SanitizeHtmlPipe } from "../shared/pipes/sanitize-html.pipe";
import { MatList, MatListItem } from "@angular/material/list";
import { MatDivider } from "@angular/material/divider";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { SlicePipe } from "@angular/common";
import { YoutubeVideoResource} from "../shared/models/youtube.videos.list.response.model";
import { MatDialog} from "@angular/material/dialog";
import { SavedSongsModalComponent } from "./saved-songs-modal/saved-songs-modal.component";
import { VideoListComponent } from "./video-list/video-list.component";

@Component({
  selector: 'app-song-search',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatSuffix, MatIcon, MatIconButton, MatProgressSpinner, MatPaginator, SlicePipe, MatFabButton, VideoListComponent],
  templateUrl: './song-search.component.html',
  styleUrl: './song-search.component.scss'
})
export class SongSearchComponent {

  // Search Controls
  searchButtonClicked = false;
  searchQueryInput = new FormControl<string | null>('');

  // Pagination Controls
  pageIndex = 0;
  resultsPerPageOptions = [5, 10, 25, 50]
  resultsPerPage = this.resultsPerPageOptions[0];
  pageStartIndex = () => this.pageEndIndex() - this.resultsPerPage;
  pageEndIndex = () => (this.pageIndex + 1) * this.resultsPerPage;

  // Saved Videos
  savedVideos: YoutubeVideoResource[] = [];

  constructor(protected songSearchService: SongSearchService, private dialog: MatDialog) {}

  handleClear(): void {
    this.searchButtonClicked = false;
    this.songSearchService.resetResponses();
    this.searchQueryInput.reset();
  }

  handleSearch(): void {
    if (this.searchQueryInput.value) {
      this.searchButtonClicked = true;
      this.songSearchService.resetResponses();
      this.songSearchService.getSearchList(this.searchQueryInput.value);
    }
  }

  handlePageEvent(e: PageEvent): void {
    this.resultsPerPage = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  handleShowSavedVideos(): void {
    const savedSongsModal = this.dialog.open(
      SavedSongsModalComponent,
      {autoFocus: false}
    );
    savedSongsModal.componentInstance.savedVideos = this.savedVideos;
  }
}
