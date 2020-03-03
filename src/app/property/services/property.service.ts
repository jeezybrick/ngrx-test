import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Property } from '@app/property/interfaces/property.interface';

const tempData: Property[] = [
  {
    id: 1,
    title: 'Title 1',
    description: '1111111111111111111111'
  }, {
    id: 2,
    title: 'Title 2',
    description: '22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222'
  }, {
    id: 3,
    title: 'Title 3',
    description: '3333333333333333333333333'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = tempData;

  public getProperties(): Observable<Property[]> {
    return of(this.properties);
  }

  public addProperty(property: Property): Observable<Property> {
    return of(property);
  }

  public updateProperty(propertyId: number): Observable<Property | null> {
    const index = this.getIndex(propertyId);

    if (index > -1) {
      return of(this.properties[index]);
    }

    return of(null);
  }

  public removeProperty(propertyId: number): Observable<Property | null> {
    const index = this.getIndex(propertyId);

    if (index > -1) {
      const removedItem = this.properties.splice(index, 1)[0];
      return of(removedItem);
    }

    return of(null);
  }

  private getIndex(itemId: number, list: Property[] = this.properties): number {
    return list.findIndex((property: Property) => property.id === itemId);
  }

}
