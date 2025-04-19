import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSuffix } from "@angular/material/form-field";
import { YoutubeVideoResource } from "../../shared/models/responses/youtube.videos.list.response.model";
import { Router } from "@angular/router";
import { ConvertSecondsToTimestampPipe } from "../../shared/pipes/convert-seconds-to-timestamp.pipe";
import { SavedVideosService } from "../../shared/services/saved-videos.service";

@Component({
  selector: 'app-arrange-songs',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    MatButton,
    MatIcon,
    MatSuffix,
    ConvertSecondsToTimestampPipe
  ],
  templateUrl: './arrange-songs.component.html',
  styleUrl: './arrange-songs.component.scss'
})
export class ArrangeSongsComponent {

  constructor(
    protected savedVideosService: SavedVideosService,
    private router: Router
  ) {}

  handleDrop(event: CdkDragDrop<YoutubeVideoResource[], any>) {
    // Updates drag and drop list based on event
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  handleTrimVideo(id: string) {
    // Navigates to the splice view
    void this.router.navigate(['splice', id]);
  }
}
