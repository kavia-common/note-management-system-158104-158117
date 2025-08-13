import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Notes App</span>
      <div class="search-container">
        <mat-form-field appearance="outline">
          <mat-label>Search notes</mat-label>
          <input matInput type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearch($event)">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      display: block;
    }
    mat-toolbar {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
    }
    .search-container {
      flex: 0 1 300px;
    }
    mat-form-field {
      width: 100%;
      font-size: 14px;
    }
    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
  `]
})
export class HeaderComponent {
  searchQuery = '';

  constructor(private notesService: NotesService) {}

  onSearch(query: string): void {
    if (this.notesService) {
      this.notesService.searchNotes(query);
    }
  }
}
