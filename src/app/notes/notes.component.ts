import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Note } from './note';
import { NotesService } from './notes.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

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
        description: new FormControl('')
    });

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private notesService: NotesService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    showDeleteHintForMobile() {
        this.snackBar.open('Hint: Swipe right or left on the note to delete it!', null, {
            duration: 5000
        });
    }

    addnewNote(snav, fromAddNote?: boolean) {
        if (this.mobileQuery.matches && !fromAddNote) {
            snav.close();
        }

        if (fromAddNote) {
            snav.open();
        }

        this.isNewNote = true;

        this.currentTime = new Date().toString();
        this.noteForm.patchValue({
            title: '',
            description: ''
        });
    }

    showNote(note: Note, index: number, snav: any) {
        this.noteForm.disable();
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
    }

    addNote(snav) {
        const addedNote = this.notesService.addNote({
            title: this.noteForm.value.title,
            description: this.noteForm.value.description,
            time: new Date()
        });

        this.getNotes(this.searchKeyControl.value);

        this.addnewNote(snav, true);
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

    deleteNote(index: number, snav) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: this.mobileQuery.matches ? '80%' : '30%',
            disableClose: true,
            data: {
                message: 'Are you sure you want to delete the note?',
                submitButton: 'Yes',
                cancelButton: 'No'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.isTrue) {
                this.notesService.deleteNote(index);
                this.getNotes(this.searchKeyControl.value);

                this.addnewNote(snav, true);
            }
        });
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
        if (this.mobileQuery.matches) {
            this.showDeleteHintForMobile();
        }
    }

}
