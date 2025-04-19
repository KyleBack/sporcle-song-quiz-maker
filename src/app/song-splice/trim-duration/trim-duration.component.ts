import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { YoutubeVideoResource } from "../../shared/models/responses/youtube.videos.list.response.model";
import { ActivatedRoute } from "@angular/router";
import { YouTubePlayer } from "@angular/youtube-player";
import { FormsModule } from "@angular/forms";
import { ConvertSecondsToTimestampPipe } from "../../shared/pipes/convert-seconds-to-timestamp.pipe";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  MatCard,
  MatCardContent, MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { SavedVideosService } from "../../shared/services/saved-videos.service";
import Utils from "../../shared/utils/utils";

@Component({
  selector: 'app-trim-duration',
  standalone: true,
  imports: [
    YouTubePlayer,
    FormsModule,
    ConvertSecondsToTimestampPipe,
    MatButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatCardSubtitle,
    MatCardFooter
  ],
  templateUrl: './trim-duration.component.html',
  styleUrl: './trim-duration.component.scss'
})
export class TrimDurationComponent implements OnInit {

  selectedVideo: YoutubeVideoResource | null = null;

  // Clip Duration Controls
  clipStartSeconds = 0;
  clipEndSeconds = 0;

  @ViewChild(YouTubePlayer)
  youtubePlayer: YouTubePlayer | null = null;

  constructor(
    protected savedVideosService: SavedVideosService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Updates the selected video based on the video ID provided in route
    const selectedVideoId = this.route.snapshot.paramMap.get('id');
    if (selectedVideoId) {
      this.selectedVideo = this.savedVideosService.getSavedVideoById(selectedVideoId);
      this.clipStartSeconds = this.selectedVideo?.startTime ?? 0;
      this.clipEndSeconds = this.selectedVideo?.endTime ?? 0;
    }
  }

  get currentTime(): number {
    // Gets the current time of the video player in seconds (with millisecond precision)
    return Utils.reducePrecision(this.youtubePlayer?.getCurrentTime() ?? 0, 3);
  }

  handleUpdateStartTime(): void {
    const time = this.currentTime;
    if (time < this.clipEndSeconds) {
      this.clipStartSeconds = time;
    }
  }

  handleUpdateEndTime(): void {
    const time = this.currentTime;
    if (time > this.clipStartSeconds) {
      this.clipEndSeconds = time;
    }
  }

  handlePlayClip(): void {
    this.youtubePlayer?.seekTo(this.clipStartSeconds, true);
  }

  handleSaveTimes(): void {
    if (this.selectedVideo) {
      // Updates selected video's start and end time
      this.selectedVideo.startTime = this.clipStartSeconds;
      this.selectedVideo.endTime = this.clipEndSeconds;
      this.selectedVideo.isClipEdited = true;
      this.savedVideosService.updateSavedVideo(this.selectedVideo);

      this.handleNavigateBack();
    }
  }

  handleNavigateBack(): void {
    // Navigates back to arrange songs view
    this.location.back();
  }
}
