import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LibraryService } from './library.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-first',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
  standalone: true,
})
export class FirstComponent {
  public readonly src = 'https://img.freepik.com/free-photo/beautiful-milky-way-night-sky_53876-139825.jpg?t=st=1742366760~exp=1742370360~hmac=33502b9c0c41d40f9e174e47d9e30b8e956a6cee78bfbfa401e33dbefc89a6d6&w=1380';
  searchQuery: string = '';
  data$!: any;

  constructor(private libraryService: LibraryService) {
    this.data$ = libraryService.datasets$;
  }

  onSearch() {
    this.libraryService.getLibraries()
  }
}
