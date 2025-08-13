import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="editor-container">
      <h2>{{ editingNote ? 'Edit Note' : 'New Note' }}</h2>
      <form (ngSubmit)="saveNote()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput [(ngModel)]="title" name="title" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Content</mat-label>
          <textarea matInput [(ngModel)]="content" name="content" rows="10" required></textarea>
        </mat-form-field>

        <div class="button-container">
          <button mat-button type="button" (click)="clearForm()">Clear</button>
          <button mat-raised-button color="primary" type="submit">
            {{ editingNote ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .editor-container {
      padding: 16px;
      background-color: white;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class NoteEditorComponent {
  @Input() editingNote: Note | null = null;
  title = '';
  content = '';

  constructor(private notesService: NotesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingNote']) {
      this.title = this.editingNote?.title || '';
      this.content = this.editingNote?.content || '';
    }
  }

  saveNote(): void {
    if (!this.title || !this.content || !this.notesService) return;

    if (this.editingNote) {
      this.notesService?.updateNote(this.editingNote.id, {
        title: this.title,
        content: this.content
      });
    } else {
      this.notesService.addNote({
        title: this.title,
        content: this.content
      });
    }

    this.clearForm();
  }

  clearForm(): void {
    this.title = '';
    this.content = '';
    this.editingNote = null;
  }
}
