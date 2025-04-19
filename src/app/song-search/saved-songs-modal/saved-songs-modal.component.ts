import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { VideoListComponent } from "../video-list/video-list.component";
import { SavedVideosService } from "../../shared/services/saved-videos.service";

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

  constructor(protected savedVideosService: SavedVideosService) {}
}
