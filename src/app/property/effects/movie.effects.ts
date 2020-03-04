import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as propertyActions from '../actions/property.actions';
import { PropertyService } from '@app/property/services/property.service';
import { Property } from '@app/property/models/property.model';

@Injectable()
export class PropertyEffects {

  constructor(
    private actions$: Actions,
    private propertyService: PropertyService
  ) {}

  loadProperties$ = createEffect(() => this.actions$.pipe(
    ofType(propertyActions.loadProperties),
    switchMap(() => {
      return this.propertyService.getProperties().pipe(
        map((properties: Property[]) => {
          return propertyActions.loadPropertiesSuccess({data: properties});
        }),
        catchError(error => of(propertyActions.loadPropertiesFail({ error })))
      );
    })
  ));

  addProperty$ = createEffect(() => this.actions$.pipe(
    ofType(propertyActions.addProperty),
    switchMap(({property}) => {
      return this.propertyService.addProperty(property).pipe(
        map((addedProperty: Property) => {
          return propertyActions.addPropertySuccess({property: addedProperty});
        }),
        catchError(error => of(propertyActions.addPropertyFail({ error })))
      );
    })
  ));

  updateProperty$ = createEffect(() => this.actions$.pipe(
    ofType(propertyActions.updateProperty),
    switchMap(({propertyId, updatedFields}) => {
      return this.propertyService.updateProperty(propertyId, updatedFields).pipe(
        map((updatedProperty: Property) => {
          return propertyActions.updatePropertySuccess({property: updatedProperty});
        }),
        catchError(error => of(propertyActions.updatePropertyFail({ error })))
      );
    })
  ));

  removeProperty$ = createEffect(() => this.actions$.pipe(
    ofType(propertyActions.removeProperty),
    switchMap(({propertyId}) => {
      return this.propertyService.removeProperty(propertyId).pipe(
        map((removedProperty: Property) => {
          return propertyActions.removePropertySuccess({propertyId: removedProperty.id});
        }),
        catchError(error => of(propertyActions.removePropertyFail({ error })))
      );
    })
  ));

}
