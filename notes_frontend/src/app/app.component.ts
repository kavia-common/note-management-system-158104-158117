import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { Note } from './models/note';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HeaderComponent,
    NoteListComponent,
    NoteEditorComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="content-container">
        <app-note-list class="note-list"></app-note-list>
        <app-note-editor class="note-editor"></app-note-editor>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .content-container {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    .note-list {
      flex: 2;
      overflow-y: auto;
    }
    .note-editor {
      flex: 1;
      min-width: 300px;
      max-width: 500px;
    }
  `]
})
export class AppComponent {
  selectedNote: Note | null = null;
}
