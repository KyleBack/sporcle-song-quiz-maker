import { Component, Input } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { YoutubeVideoResource } from "../../shared/models/youtube.videos.list.response.model";
import { VideoListComponent } from "../video-list/video-list.component";

@Component({
  selector: 'app-saved-songs-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    VideoListComponent
  ],
  templateUrl: './saved-songs-modal.component.html',
  styleUrl: './saved-songs-modal.component.scss'
})
export class SavedSongsModalComponent {

  @Input()
  savedVideos: YoutubeVideoResource[] = [];
}
