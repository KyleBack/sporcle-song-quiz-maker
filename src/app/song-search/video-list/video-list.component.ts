import { Component, Input } from '@angular/core';
import { ConvertDatePipe } from "../../shared/pipes/convert-date.pipe";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { YoutubeVideoResource } from "../../shared/models/responses/youtube.videos.list.response.model";
import { YouTubePlayer } from "@angular/youtube-player";
import { SavedVideosService } from "../../shared/services/saved-videos.service";

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [
    ConvertDatePipe,
    MatCard,
    MatCardContent,
    MatDivider,
    MatIcon,
    MatIconButton,
    YouTubePlayer
  ],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {

  @Input()
  videosList: YoutubeVideoResource[] = [];

  @Input()
  showVideoPlayer = false;

  constructor(private savedVideosService: SavedVideosService) {}

  handleSaveVideo(video: YoutubeVideoResource): void {
    this.savedVideosService.addSavedVideo(video);
  }

  handleUnsaveVideo(video: YoutubeVideoResource): void {
    this.savedVideosService.removeSavedVideo(video);
  }

  isVideoSaved(video: YoutubeVideoResource): boolean {
    return this.savedVideosService.savedVideos.includes(video);
  }
}
