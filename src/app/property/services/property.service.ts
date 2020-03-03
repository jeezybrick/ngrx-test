import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Property } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor() {
  }

  public getProperties(): Observable<Property[]> {
    return of([1, 2, 3]);
  }

  public addProperty(): Observable<Property> {
    return of({});
  }

  public updateProperty(): Observable<Property> {
    return of({});
  }

  public removeProperty(): Observable<Property> {
    return of({});
  }

}
