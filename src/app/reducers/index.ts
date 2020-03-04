import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '@environments/environment';
import * as fromProperties from '../property/reducers/property.reducer';
import * as fromModifyProperty from '../property/reducers/modify-property.reducer';

export interface State {
  properties: fromProperties.PropertiesState;
  modifyProperty: fromModifyProperty.ModifyPropertyState;
}

export const reducers: ActionReducerMap<State> = {
  properties: fromProperties.reducer,
  modifyProperty: fromModifyProperty.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getPropertiesState = createFeatureSelector<fromProperties.PropertiesState>('properties');
export const getModifyPropertyState = createFeatureSelector<fromModifyProperty.ModifyPropertyState>('modifyProperty');

export const getProperties = createSelector(
  getPropertiesState,
  fromProperties.getProperties
);

export const getIsPropertiesLoading = createSelector(
  getPropertiesState,
  fromProperties.getIsPropertiesLoading
);

export const getIsPropertyModifyProcess = createSelector(
  getModifyPropertyState,
  fromModifyProperty.getIsPropertyModifyProcess
);

export const getIsPropertyModified = createSelector(
  getModifyPropertyState,
  fromModifyProperty.getIsPropertyModified
);

