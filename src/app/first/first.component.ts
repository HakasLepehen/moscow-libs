import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css',
  standalone: true,
})
export class FirstComponent {
public readonly src = 'https://img.freepik.com/free-photo/beautiful-milky-way-night-sky_53876-139825.jpg?t=st=1742366760~exp=1742370360~hmac=33502b9c0c41d40f9e174e47d9e30b8e956a6cee78bfbfa401e33dbefc89a6d6&w=1380';
}
