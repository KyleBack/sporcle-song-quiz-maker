import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConvertDatePipe } from "../../shared/pipes/convert-date.pipe";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { SanitizeHtmlPipe } from "../../shared/pipes/sanitize-html.pipe";
import { YoutubeVideoResource } from "../../shared/models/youtube.videos.list.response.model";

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
        SanitizeHtmlPipe
    ],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {

  @Input()
  videosList: YoutubeVideoResource[] = [];

  @Input()
  savedVideos: YoutubeVideoResource[] = [];

  @Output()
  savedVideosChange: EventEmitter<YoutubeVideoResource[]> = new EventEmitter<YoutubeVideoResource[]>();

  constructor() {}

  handleSaveVideo(video: YoutubeVideoResource): void {
    this.savedVideos.push(video);
    this.savedVideosChange.emit(this.savedVideos);
  }

  handleUnsaveVideo(video: YoutubeVideoResource): void {
    const index = this.savedVideos.indexOf(video);
    this.savedVideos.splice(index, 1);
    this.savedVideosChange.emit(this.savedVideos);
  }

  isVideoSaved(video: YoutubeVideoResource): boolean {
    return this.savedVideos.includes(video);
  }
}
