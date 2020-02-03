import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SearchHighlightDirective } from './directives/search-highlight.directive';
import { RelativeTimeStampPipe } from './pipes/relative-time-stamp.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        AutofocusDirective,
        SearchHighlightDirective,
        RelativeTimeStampPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
