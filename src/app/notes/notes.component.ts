import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MediaMatcher } from '@angular/cdk/layout';
import { NotesService } from './notes.service';
import { Note } from './note';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit, OnDestroy {

    @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

    mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;

    allNotes: Note[];
    currentTime = new Date().toString();
    noteTime: string;
    isNewNote = true;
    currentNoteIndex: number;

    searchKeyControl = new FormControl('');

    noteForm = new FormGroup({
        title: new FormControl('', [
            Validators.required
        ]),
        description: new FormControl('', [
            Validators.required
        ]),
    });

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private notesService: NotesService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    addnewNote(snav) {
        if (this.mobileQuery.matches) {
            snav.close();
        }

        this.isNewNote = true;

        this.currentTime = new Date().toString();
        this.noteForm.patchValue({
            title: '',
            description: ''
        });
    }

    showNote(note: Note, index: number, snav: any, fromAddNote?: boolean) {
        this.isNewNote = false;
        this.currentNoteIndex = index;
        this.noteTime = note.time.toString();

        this.noteForm.patchValue({
            title: note.title,
            description: note.description
        });

        if (this.mobileQuery.matches) {
            snav.close();
        }

        if (fromAddNote) {
            snav.open();
        }
    }

    addNote(snav) {
        const addedNote = this.notesService.addNote({
            title: this.noteForm.value.title,
            description: this.noteForm.value.description,
            time: new Date()
        });

        this.getNotes(this.searchKeyControl.value);

        this.showNote(addedNote.note, addedNote.index, snav, true);
    }

    updateNote(snav) {
        this.notesService.updateNote({
            title: this.noteForm.value.title,
            description: this.noteForm.value.description,
            time: new Date(this.noteTime)
        }, this.currentNoteIndex);

        this.getNotes(this.searchKeyControl.value);
        snav.open();
    }

    getNotes(searchkey?: string) {
        this.allNotes = this.notesService.getAllNotes(searchkey);
    }

    search(snav) {
        this.getNotes(this.searchKeyControl.value);
        snav.open();
    }

    clearSearch() {
        this.searchKeyControl.patchValue('');
        this.getNotes();
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

    ngOnInit() {
        this.allNotes = this.notesService.getAllNotes();
    }

}
