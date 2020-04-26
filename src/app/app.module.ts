import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as Hammer from 'hammerjs';

import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SearchHighlightDirective } from './directives/search-highlight.directive';
import { RelativeTimeStampPipe } from './pipes/relative-time-stamp.pipe';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    overrides = {
        swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
        pinch: { enable: false },
        rotate: { enable: false }
    } as any;
}

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        AutofocusDirective,
        SearchHighlightDirective,
        RelativeTimeStampPipe,
        ConfirmationModalComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [{
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig,
    }],
    bootstrap: [AppComponent],
    entryComponents: [
        ConfirmationModalComponent
    ]
})

export class AppModule { }
