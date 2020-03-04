import { createAction, props } from '@ngrx/store';

import { Property } from '@app/property/models/property.model';
import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';

export const LOAD_PROPERTIES = '[Properties] Load Properties';
export const LOAD_PROPERTIES_SUCCESS = '[Properties] Load Properties Success';
export const LOAD_PROPERTIES_FAIL = '[Properties] Load Properties Fail';

export const ADD_PROPERTY = '[Properties] Add Property';
export const ADD_PROPERTY_SUCCESS = '[Properties] Add Property Success';
export const ADD_PROPERTY_FAIL = '[Properties] Add Property Fail';

export const UPDATE_PROPERTY = '[Properties] Update Property';
export const UPDATE_PROPERTY_SUCCESS = '[Properties] Update Property Success';
export const UPDATE_PROPERTY_FAIL = '[Properties] Update Property Fail';

export const REMOVE_PROPERTY = '[Properties] Remove Property';
export const REMOVE_PROPERTY_SUCCESS = '[Properties] Remove Property Success';
export const REMOVE_PROPERTY_FAIL = '[Properties] Remove Property Fail';

export const loadProperties = createAction(
  LOAD_PROPERTIES
);

export const loadPropertiesSuccess = createAction(
  LOAD_PROPERTIES_SUCCESS,
  props<{data: Property[]}>()
);

export const loadPropertiesFail = createAction(
  LOAD_PROPERTIES_FAIL,
  props<{error: any}>()
);

export const addProperty = createAction(
  ADD_PROPERTY,
  props<{property: ModifyProperty}>()
);

export const addPropertySuccess = createAction(
  ADD_PROPERTY_SUCCESS,
  props<{property: Property}>()
);

export const addPropertyFail = createAction(
  ADD_PROPERTY_FAIL,
  props<{error: any}>()
);

export const updateProperty = createAction(
  UPDATE_PROPERTY,
  props<{propertyId: number, updatedFields: Partial<ModifyProperty>}>()
);

export const updatePropertySuccess = createAction(
  UPDATE_PROPERTY_SUCCESS,
  props<{property: Property}>()
);

export const updatePropertyFail = createAction(
  UPDATE_PROPERTY_FAIL,
  props<{error: any}>()
);

export const removeProperty = createAction(
  REMOVE_PROPERTY,
  props<{propertyId: number}>()
);

export const removePropertySuccess = createAction(
  REMOVE_PROPERTY_SUCCESS,
  props<{propertyId: number}>()
);

export const removePropertyFail = createAction(
  REMOVE_PROPERTY_FAIL,
  props<{error: any}>()
);


