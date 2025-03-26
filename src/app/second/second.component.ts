import { Component, Input } from '@angular/core';
import { LibraryService } from '../components/first/library.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-second',
  imports: [CommonModule],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {
  @Input({ required: true })
  library!: any;
  @Input({ required: true })
  captions!: any[];
}
