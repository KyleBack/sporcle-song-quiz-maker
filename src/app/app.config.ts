import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

export const FIREBASE_CONFIG = {
  "projectId":"sporcle-song-quiz-maker",
  "appId":"1:166174334030:web:80a23b99ea2bfac036371f",
  "storageBucket":"sporcle-song-quiz-maker.firebasestorage.app",
  "apiKey":"AIzaSyBOHcqu3l6jYekRmGZM-QqGzpllnu7H-RE",
  "authDomain":"sporcle-song-quiz-maker.firebaseapp.com",
  "messagingSenderId":"166174334030",
  "measurementId":"G-9X6CK31LZ9"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService
  ]
};
