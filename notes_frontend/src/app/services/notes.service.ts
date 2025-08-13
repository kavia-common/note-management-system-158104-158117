import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    // Initialize with some sample notes
    this.addNote({
      id: '1',
      title: 'Welcome Note',
      content: 'Welcome to your notes app! Start creating notes by using the form on the right.',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Partial<Note>): void {
    const newNote: Note = {
      id: Date.now().toString(),
      title: note.title || '',
      content: note.content || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes = [newNote, ...this.notes];
    this.notesSubject.next(this.notes);
  }

  updateNote(id: string, updatedNote: Partial<Note>): void {
    const index = this.notes.findIndex(note => note.id === id);
    if (index !== -1) {
      this.notes[index] = {
        ...this.notes[index],
        ...updatedNote,
        updatedAt: new Date()
      };
      this.notesSubject.next([...this.notes]);
    }
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }

  searchNotes(query: string): void {
    if (!query) {
      this.notesSubject.next(this.notes);
      return;
    }
    const filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    this.notesSubject.next(filteredNotes);
  }
}
