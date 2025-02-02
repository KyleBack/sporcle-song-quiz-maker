import { Component } from '@angular/core';
import { MatStep, MatStepper } from "@angular/material/stepper"
import { SongSearchComponent } from "./song-search/song-search.component";
import { SongTrimComponent } from "./song-trim/song-trim.component";
import { SongUploadComponent } from "./song-upload/song-upload.component";
import { Router } from "@angular/router";
import { StepperSelectionEvent } from "@angular/cdk/stepper";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatStepper, MatStep, SongSearchComponent, SongTrimComponent, SongUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title = 'sporcle-song-quiz-maker';

  readonly SEARCH_LABEL = 'Search for Songs';
  readonly TRIM_LABEL ='Trim Selections';
  readonly UPLOAD_LABEL = 'Upload to SoundCloud';

  constructor(private router: Router) {}

  handleStepChange(stepper: StepperSelectionEvent): void {
    switch (stepper.selectedIndex) {
      case 0:
        void this.router.navigate(['/search']);
        break;
      case 1:
        void this.router.navigate(['/trim']);
        break;
      case 2:
        void this.router.navigate(['/upload']);
        break;
    }
  }
}
