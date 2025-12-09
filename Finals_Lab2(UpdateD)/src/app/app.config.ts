import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDU1o4nF4rZ-9NNv0V6oo5c4E4DDYMl4ag",
      authDomain: "disastertester-3b8d1.firebaseapp.com",
      projectId: "disastertester-3b8d1",
      storageBucket: "disastertester-3b8d1.firebasestorage.app",
      messagingSenderId: "753437223694",
      appId: "1:753437223694:web:fc82049b69840df2ec855f"
    })),
    provideFirestore(() => getFirestore())
  ]

};
