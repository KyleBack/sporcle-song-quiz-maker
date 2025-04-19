import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatFabButton, MatIconButton } from "@angular/material/button";
import { SongSearchService } from "./song-search.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { SlicePipe } from "@angular/common";
import { YoutubeVideoResource} from "../shared/models/responses/youtube.videos.list.response.model";
import { MatDialog} from "@angular/material/dialog";
import { SavedSongsModalComponent } from "./saved-songs-modal/saved-songs-modal.component";
import { VideoListComponent } from "./video-list/video-list.component";
import { LoadingService } from "../shared/services/loading.service";

@Component({
  selector: 'app-song-search',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSuffix,
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
    MatPaginator,
    SlicePipe,
    MatFabButton,
    VideoListComponent],
  templateUrl: './song-search.component.html',
  styleUrl: './song-search.component.scss'
})
export class SongSearchComponent {

  @Input()
  savedVideos: YoutubeVideoResource[] = [];

  @Output()
  savedVideosChange: EventEmitter<YoutubeVideoResource[]> = new EventEmitter<YoutubeVideoResource[]>();

  // Search Controls
  searchQueryInput = new FormControl<string | null>('');

  // Pagination Controls
  pageIndex = 0;
  resultsPerPageOptions = [5, 10, 25, 50]
  resultsPerPage = this.resultsPerPageOptions[0];
  pageStartIndex = () => this.pageEndIndex() - this.resultsPerPage;
  pageEndIndex = () => (this.pageIndex + 1) * this.resultsPerPage;

  constructor(
    protected loadingService: LoadingService,
    protected songSearchService: SongSearchService,
    private dialog: MatDialog
  ) {}

  handleClear(): void {
    this.songSearchService.resetResponses();
    this.searchQueryInput.reset();
  }

  handleSearch(): void {
    if (this.searchQueryInput.value && !this.loadingService.isLoading()) {
      this.songSearchService.resetResponses();
      this.songSearchService.getSearchList(this.searchQueryInput.value);
    }
  }

  handlePageEvent(e: PageEvent): void {
    this.resultsPerPage = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  handleShowSavedVideos(): void {
    // Opens saved songs modal
    this.dialog.open(
      SavedSongsModalComponent,
      {autoFocus: false}
    );
  }
}
