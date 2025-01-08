import './polyfills';  // Asegúrate de que esto esté presente.
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Asegúrate de que AppComponent esté exportado correctamente

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
