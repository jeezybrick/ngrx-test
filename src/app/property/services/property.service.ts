import { Injectable } from '@angular/core';

import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';

import { Property } from '@app/property/models/property.model';
import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';
import { StorageService } from '@shared/services/storage.service';

const propertiesListStorageKey = 'properties';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertiesSource: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>(this.getPropertiesFromStorage());
  private readonly fakeDelay: number = 500;

  constructor(private storageService: StorageService) {}

  public getProperties(): Observable<Property[]> {
    return this.propertiesSource.asObservable()
      .pipe(
        map((properties: Property[]) => {
          return properties.sort((a: Property, b: Property) => {
            return a.createdAt - b.createdAt;
          });
        })
      );
  }

  public addProperty(property: ModifyProperty): Observable<Property> {
    const item = new Property(property);

    return of(item).pipe(
      delay(this.fakeDelay),
      tap(() => {
        this.setProperties([...this.getPropertiesAsValue(), item]);
      })
    );
  }

  public updateProperty(propertyId: number, updatedFields: Partial<ModifyProperty>): Observable<Property> {
    const index = this.getIndex(propertyId);

    if (index > -1) {
      const list = this.getPropertiesAsValue();
      const updatedItem = this.getUpdatedItem(list[index], updatedFields);
      const listWithUpdatedItem = [...list.filter((item: Property) => item.id !== propertyId), updatedItem];

      return of(updatedItem).pipe(
        delay(this.fakeDelay),
        tap(() => {
          this.setProperties(listWithUpdatedItem);
        })
      );
    }

    return NEVER;
  }

  public removeProperty(propertyId: number): Observable<Property | null> {
    const index = this.getIndex(propertyId);

    if (index > -1) {
      const list = this.getPropertiesAsValue();
      const removedItem = {...list[index]};
      const listWithoutRemovedItem = list.filter((item: Property) => item.id !== propertyId);

      return of(removedItem).pipe(
        delay(this.fakeDelay),
        tap(() => {
          this.setProperties(listWithoutRemovedItem);
        })
      );
    }

    return NEVER;
  }

  private getIndex(itemId: number, list: Property[] = this.getPropertiesAsValue()): number {
    return list.findIndex((property: Property) => property.id === itemId);
  }

  private getUpdatedItem(item: Property, updatedFields: Partial<ModifyProperty>): Property {
    return {
      ...item,
      ...updatedFields
    };
  }

  private getPropertiesAsValue(): Property[] {
    return this.propertiesSource.getValue();
  }

  private setProperties(list: Property[], isWriteToStorage: boolean = true): void {
    this.propertiesSource.next(list);

    if(isWriteToStorage) {
      this.setPropertiesToStorage(list);
    }

  }

  private getPropertiesFromStorage(): Property[] {
    return JSON.parse(this.storageService.getItem(propertiesListStorageKey)) || [];
  }

  private setPropertiesToStorage(list: Property[]): void {
    this.storageService.setItem(propertiesListStorageKey, JSON.stringify(list));
  }

}
