import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private rootURL = 'https://apidata.mos.ru/v1/'

  constructor(protected http: HttpClient) { }

  protected getData<T>(url: string, qp?: HttpParams ): Observable<T> {
    return this.http.get<T>(this.rootURL + url, { params: qp });
  }
}
