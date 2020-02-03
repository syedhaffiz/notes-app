import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Note } from './note';

@Injectable({
    providedIn: 'root'
})

export class NotesService {

    private STORAGE_KEY = 'NOTES';

    constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

    addNote(note: Note) {

        const currentNotesList: Note[] = this.storageService.get(this.STORAGE_KEY) || [];

        currentNotesList.unshift({
            title: note.title,
            description: note.description,
            time: note.time
        });

        this.storageService.set(this.STORAGE_KEY, currentNotesList);

        return note;
    }

    updateNote(note: Note, index: number): void {
        const currentNotesList: Note[] = this.storageService.get(this.STORAGE_KEY) || [];

        if (currentNotesList.length > 0 && currentNotesList[index]) {
            currentNotesList[index] = {
                title: note.title,
                description: note.description,
                time: note.time
            };
        }

        this.storageService.set(this.STORAGE_KEY, currentNotesList);
    }

    deleteNote(index: number): void {
        const currentNotesList: Note[] = this.storageService.get(this.STORAGE_KEY) || [];

        currentNotesList.splice(index, 1);

        this.storageService.set(this.STORAGE_KEY, currentNotesList);
    }

    getAllNotes(searchKey?: string): Note[] {
        let notes = this.storageService.get(this.STORAGE_KEY) || [];

        if (searchKey && searchKey !== '' && notes.length > 0) {
            searchKey = searchKey.trim();
            notes = notes.filter(note => {
                return note.title.includes(searchKey) || note.description.includes(searchKey);
            });
        }
        return notes;
    }
}
