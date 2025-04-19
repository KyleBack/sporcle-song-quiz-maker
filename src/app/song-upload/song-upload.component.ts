import { Component } from '@angular/core';
import { AudioSplicerService } from "./audio-splicer.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButton } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { SavedVideosService } from "../shared/services/saved-videos.service";
import { LoadingService } from "../shared/services/loading.service";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { MatDivider } from "@angular/material/divider";
import { MatFormField, MatInput } from "@angular/material/input";
import { MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";

@Component({
  selector: 'app-song-upload',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatButton,
    FormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption
  ],
  templateUrl: './song-upload.component.html',
  styleUrl: './song-upload.component.scss'
})
export class SongUploadComponent {

  // Splice Offset Controls
  spliceOffsetOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedSpliceOffset = 1;

  constructor(
    protected loadingService: LoadingService,
    protected savedVideosService: SavedVideosService,
    protected audioSplicerService: AudioSplicerService
  ) {}

  handleGenerateAudioFile() {
    this.audioSplicerService.resetGetSplicedAudioBlobResponse();
    this.audioSplicerService.getSplicedAudio(
      this.audioSplicerService.generateGetSplicedAudioRequest(
        this.savedVideosService.savedVideos,
        this.selectedSpliceOffset
      )
    );
  }
}
