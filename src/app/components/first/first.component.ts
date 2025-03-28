import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from './library.service';
import { BehaviorSubject, Subject, take, tap } from 'rxjs';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SecondComponent } from '../../second/second.component';

@Component({
  selector: 'app-first',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    HighlightPipe,
    SpinnerComponent,
    SecondComponent
  ],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
  standalone: true,
})
export class FirstComponent {
  public readonly src = 'https://img.freepik.com/free-photo/beautiful-milky-way-night-sky_53876-139825.jpg?t=st=1742366760~exp=1742370360~hmac=33502b9c0c41d40f9e174e47d9e30b8e956a6cee78bfbfa401e33dbefc89a6d6&w=1380';
  searchHighlightString: string = '';
  data$!: Subject<any[]>;
  captions!: any[];
  selectedLibrary: any = null;
  public isLoading$: BehaviorSubject<boolean>;

  constructor(private libraryService: LibraryService) {
    this.data$ = libraryService.datasets$;
    this.isLoading$ = libraryService.isLoading;
    libraryService.captions$
      .pipe(
        take(1),
        tap(captions => this.captions = captions)
    )
    .subscribe()
  }

  onSubmit(form: NgForm) {
    // Initializing value for highlighting search value after submit event
    this.searchHighlightString = form.value.searchString;
    // we need to deselect library in aside block
    this.selectedLibrary = null;
    // sending input value to server
    this.libraryService.getLibraries(form.value.searchString);
  }

  onRowClick(item: any) {
    this.selectedLibrary = item;
  }
}
