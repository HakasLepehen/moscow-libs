import { inject, Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, Subject, take, tap } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface ILibrary {
  FullName: string;
  Address: string;
  Details: any
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends BaseService {
  private readonly datasets = `datasets/526`;
  private readonly datasetsWithRows = `datasets/526/rows`;
  public datasets$: Subject<any> = new Subject();
  public rows$: Subject<any> = new Subject();

  constructor() {
    const http: HttpClient = inject(HttpClient);
    super(http);
  }

  getLibraries(str: string = ''): void {
    let params;
    if (!!str) {
      params = new HttpParams().append('$filter', `FullName eq \'${str}\'`)
    }

    this.datasets$.next([]);

    forkJoin([this.getData(this.datasetsWithRows, params), this.getData(this.datasets)])
      .pipe(
        take(1),
        tap(([val, category]) => {
          const obj = (<any>category).Columns.map((el: any) => {
            return {
              Name: el.Name,
              Caption: el.Caption
            }
          })
          const map: Array<ILibrary> = (<Array<any>>val).map(({ Cells }) => {
            const mappedAddress: string = Cells.ObjectAddress.reduce((acc: any, address: {Address: string}) => {
              acc.push(address.Address);
              return acc;
            }, []).join('; ')
            return {
              FullName: Cells.FullName,
              Address: mappedAddress,
              Details: {}
            }
          })
          this.datasets$.next(map)
          return of()
        })
      )
      .subscribe()

    // .pipe(
    //   take(1),
    //   map(val => {
    //     return val
    //   }))
    // .subscribe();
  }

  // getLibsData() {
  //   this.getData(this.datasets)
  //     .pipe(mergeMap(x => this.getLibraries().pipe(y => y)))
  //     .subscribe(val => console.log(val))
  // }
}
const a = {
  "global_id": 2639269522,
  "Number": 1,
  "Cells": {
    "Category": "Библиотека",
    "CommonName": "Библиотека №184",
    "FullName": "Государственное бюджетное учреждение культуры города Москвы «Объединение культурных центров Юго-Западного административного округа», Библиотека №184",
    "ShortName": "ГБУК г. Москвы «ОКЦ ЮЗАО», Библиотека №184",
    "OrgInfo": [
      {
        "is_deleted": 0,
        "ChiefPhone": [
          {
            "is_deleted": 0,
            "global_id": 153306,
            "ChiefPhone": "(495) 420-05-37"
          }
        ],
        "FullName": "Государственное бюджетное учреждение культуры города Москвы «Объединение культурных центров Юго-Западного административного округа»",
        "INN": "7728812089",
        "KPP": "772801001",
        "OGRN": "1127746506634",
        "LegalAddress": "117513, город Москва, Ленинский проспект, дом 127",
        "ChiefName": "Корчагин Олег Николаевич",
        "ChiefPosition": "генеральный директор",
        "global_id": 139570
      }
    ],
    "ObjectAddress": [
      {
        "is_deleted": 0,
        "AdmArea": "Юго-Западный административный округ",
        "District": "район Тёплый Стан",
        "PostalCode": "117133",
        "Address": "Российская Федерация, город Москва, внутригородская территория муниципальный округ Теплый Стан, улица Академика Варги, дом 38",
        "global_id": 264278
      }
    ],
    "ChiefOrg": "Департамент культуры города Москвы",
    "ChiefName": "Астанина Евгения Алексеевна",
    "ChiefPosition": "заведующий",
    "PublicPhone": [
      {
        "is_deleted": 0,
        "PublicPhone": "(495) 339-86-77",
        "global_id": 199890
      },
      {
        "is_deleted": 0,
        "PublicPhone": "(495) 337-05-22",
        "global_id": 200382
      }
    ],
    "Fax": [
      {
        "is_deleted": 0,
        "Fax": "(495) 339-51-55",
        "global_id": 136572
      }
    ],
    "Email": [
      {
        "is_deleted": 0,
        "Email": "okcuzao-lib-184@culture.mos.ru",
        "global_id": 148002
      }
    ],
    "WorkingHours": [
      {
        "is_deleted": 0,
        "DayWeek": "понедельник",
        "WorkHours": "выходной",
        "global_id": 1001174
      },
      {
        "is_deleted": 0,
        "DayWeek": "вторник",
        "WorkHours": "12:00-22:00",
        "global_id": 1003580
      },
      {
        "is_deleted": 0,
        "DayWeek": "среда",
        "WorkHours": "12:00-22:00",
        "global_id": 1001671
      },
      {
        "is_deleted": 0,
        "DayWeek": "четверг",
        "WorkHours": "12:00-22:00",
        "global_id": 1003827
      },
      {
        "is_deleted": 0,
        "DayWeek": "пятница",
        "WorkHours": "12:00-22:00",
        "global_id": 999555
      },
      {
        "is_deleted": 0,
        "DayWeek": "суббота",
        "WorkHours": "12:00-22:00",
        "global_id": 1001195
      },
      {
        "is_deleted": 0,
        "DayWeek": "воскресенье",
        "WorkHours": "12:00-20:00",
        "global_id": 999797
      }
    ],
    "ClarificationOfWorkingHours": "Санитарный день: последний вторник месяца",
    "WebSite": "kulturauzao.ru",
    "NumOfSeats": 34,
    "NumOfReaders": 3194,
    "NumOfVisitors": 25374,
    "global_id": 2639269522,
    "geoData": {
      "coordinates": [
        [
          37.479713392,
          55.633015181
        ]
      ],
      "type": "MultiPoint"
    }
  }
}
