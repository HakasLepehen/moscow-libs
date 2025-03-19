import { inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends BaseService {
  private readonly datasets = `datasets/526`;
  private readonly datasetsWithRows = `datasets/526/rows`;
  public datasets$: Subject<any> = new Subject();

  constructor() {
    const http: HttpClient = inject(HttpClient);
    super(http);
  }

  getLibraries(): void {
    this.getData(this.datasetsWithRows)
      .pipe(tap(val => this.datasets$.next(val)))
      .subscribe();
  }

  getLibsData() {
    return this.getData(this.datasetsWithRows);
  }
}
