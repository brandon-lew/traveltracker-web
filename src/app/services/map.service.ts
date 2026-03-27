import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// CONFIGS
import { Configs } from '../configs/configs.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private configs = inject(Configs);
  private httpClient = inject(HttpClient);

  private currentApiStatus: BehaviorSubject<boolean>;
  obsCurrentApiStatus: Observable<boolean>;

  constructor() {
    this.currentApiStatus = new BehaviorSubject(false);
    this.obsCurrentApiStatus = this.currentApiStatus.asObservable();

    // SEND GOOGLE API KEY
    this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          this.configs.googleMapsApiKey,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe((loaded) => {
        this.currentApiStatus.next(loaded);
      });
  }
}
