import { AfterViewChecked, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from "@angular/material/stepper"
import { CdkStepper, StepperSelectionEvent } from "@angular/cdk/stepper";
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { SEARCH_ROUTE, SPLICE_ROUTE, UPLOAD_ROUTE } from "./app.routes";
import { MatIcon } from "@angular/material/icon";
import { SavedVideosService } from "./shared/services/saved-videos.service";
import Utils from "./shared/utils/utils";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatStepper, MatStep, MatIcon, RouterOutlet, RouterLink, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: CdkStepper, useClass: CdkStepper }]
})
export class AppComponent implements OnInit, AfterViewChecked {

  readonly title = 'sporcle-song-quiz-maker';

  // Stepper labels
  readonly INVALID_LABEL = '';
  readonly SEARCH_LABEL = 'Search for Songs';
  readonly SPLICE_LABEL ='Splice Selections';
  readonly UPLOAD_LABEL = 'Upload to SoundCloud';

  // Order of the stepper labels
  readonly STEP_LABEL_ORDER = [
    this.SEARCH_LABEL,
    this.SPLICE_LABEL,
    this.UPLOAD_LABEL,
  ]

  // Map that associates each stepper label with a route
  readonly LABEL_TO_ROUTE = new Map<string, string>([
    [this.SEARCH_LABEL, SEARCH_ROUTE],
    [this.SPLICE_LABEL, SPLICE_ROUTE],
    [this.UPLOAD_LABEL, UPLOAD_ROUTE],
  ]);

  // Map that associates each route with a stepper label (based on the map above)
  readonly ROUTE_TO_LABEL = Utils.reverseMap(this.LABEL_TO_ROUTE);

  previousStepLabel = signal(this.INVALID_LABEL);
  nextStepLabel = signal(this.getLabelAtIndex(1));

  @ViewChild('stepper')
  stepper: MatStepper | undefined;
  stepperIndex = 0;

  constructor(private router: Router, protected savedVideosService: SavedVideosService) {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        const label = this.ROUTE_TO_LABEL.get(Utils.getRouteFromUrl(routerEvent.url));

        // Update index of stepper based on route
        this.stepperIndex = label ? this.STEP_LABEL_ORDER.indexOf(label) : this.stepperIndex;
      }
    });
  }

  ngOnInit(): void {
    // Refresh saved videos from local storage (if any)
    this.savedVideosService.refreshSavedVideos();
  }

  ngAfterViewChecked() {
    // Refresh interacted status of each step so that progress is maintained
    this.stepper?.steps.forEach((step, stepIndex) => {
      if (stepIndex < this.stepperIndex) {
        step.interacted = true;
      }
    });
  }

  handleStepChange(stepper: StepperSelectionEvent): void {
    this.previousStepLabel.set(this.getLabelAtIndex(stepper.selectedIndex - 1));
    this.nextStepLabel.set(this.getLabelAtIndex(stepper.selectedIndex + 1));

    // Update route based on index of stepper
    void this.router.navigate([
      this.LABEL_TO_ROUTE.get(stepper.selectedStep.label)
    ]);
  }

  getLabelAtIndex(index: number): string {
    if (index < 0 || index > this.STEP_LABEL_ORDER.length - 1) {
      return this.INVALID_LABEL;
    }
    return this.STEP_LABEL_ORDER[index];
  }

  canUserProgress(): boolean {
    return this.savedVideosService.savedVideos.length >= 1;
  }

  handlePreviousStep(): void {
    this.stepper?.previous();
  }

  handleNextStep(): void {
    this.stepper?.next();
  }
}
