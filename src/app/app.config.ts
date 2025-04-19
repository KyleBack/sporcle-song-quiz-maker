import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { LoadingInterceptor } from "./shared/interceptors/loading-interceptor.service";

export const FIREBASE_CONFIG = {
  "projectId":"sporcle-song-quiz-maker",
  "appId":"1:166174334030:web:80a23b99ea2bfac036371f",
  "storageBucket":"sporcle-song-quiz-maker.firebasestorage.app",
  "apiKey":"REPLACE_ME",
  "authDomain":"sporcle-song-quiz-maker.firebaseapp.com",
  "messagingSenderId":"166174334030",
  "measurementId":"G-9X6CK31LZ9"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
  ]
};
