import { Component } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatIconButton} from "@angular/material/button";
import { SongSearchService } from "./song-search.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { SanitizeHtmlPipe } from "../shared/pipes/sanitize-html.pipe";
import { MatList, MatListItem } from "@angular/material/list";
import { MatDivider } from "@angular/material/divider";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { SlicePipe } from "@angular/common";

@Component({
  selector: 'app-song-search',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatSuffix, MatIcon, MatIconButton, SanitizeHtmlPipe, MatList, MatListItem, MatDivider, MatProgressSpinner, MatPaginator, SlicePipe],
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

  constructor(protected songSearchService: SongSearchService) {}

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

  getStartIndexOfPage(): number {
    return this.getEndIndexOfPage() - this.resultsPerPage;
  }

  getEndIndexOfPage(): number {
    return (this.pageIndex + 1) * this.resultsPerPage;
  }
}
