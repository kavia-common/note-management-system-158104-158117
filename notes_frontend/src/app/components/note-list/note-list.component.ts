import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="notes-container">
      @for (note of notes$ | async; track note?.id) {
        <mat-card class="note-card" (click)="selectNote(note)">
          <mat-card-header>
            <mat-card-title>{{ note.title }}</mat-card-title>
            <mat-card-subtitle>
              Updated: {{ note.updatedAt | date:'short' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ note.content | slice:0:100 }}{{ note.content.length > 100 ? '...' : '' }}</p>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-icon-button color="warn" (click)="deleteNote(note.id); $event.stopPropagation()">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .notes-container {
      padding: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
    .note-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .note-card:hover {
      transform: translateY(-2px);
    }
    mat-card-content {
      margin-top: 16px;
    }
  `]
})
export class NoteListComponent {
  notes$: Observable<Note[]>;

  constructor(private notesService: NotesService) {
    this.notes$ = this.notesService.getNotes();
  }

  selectNote(note: Note): void {
    if (!note) return;
    // This will be handled by the parent component
  }

  deleteNote(id: string): void {
    if (this.notesService) {
      this.notesService.deleteNote(id);
    }
  }
}
