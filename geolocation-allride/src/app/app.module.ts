import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        FormsModule,
        GoogleMapsModule,
        AppComponent
    ],
    providers: [],
    // bootstrap: [AppComponent]
})
export class AppModule { }
