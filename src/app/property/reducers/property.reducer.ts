import { Action, createReducer, on } from '@ngrx/store';

import * as PropertiesListPageActions from '../actions/property.actions';
import { Property } from '@app/property/models/property.model';

export interface PropertiesState {
  data: Property[];
  isLoading: boolean;
}

const initialState: PropertiesState = {
  data: [],
  isLoading: false
};

const propertyReducer = createReducer(
  initialState,
  on(PropertiesListPageActions.loadProperties, (state: PropertiesState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(PropertiesListPageActions.loadPropertiesSuccess, (state: PropertiesState, {data}) => {
    return {
      ...state,
      data: [...state.data, ...data],
      isLoading: false
    };
  }),
  on(PropertiesListPageActions.loadPropertiesFail, (state: PropertiesState) => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(PropertiesListPageActions.addPropertySuccess, (state: PropertiesState, {property}) => {
    const list = [...state.data, property];

    return {
      ...state,
      data: list
    };
  }),
  on(PropertiesListPageActions.updatePropertySuccess, (state: PropertiesState, {property}) => {
    let list = [...state.data];
    const index = getIndex(property.id, list);

    if (index > -1) {
      list[index] = property;
    }

    return {
      ...state,
      data: list,
      isLoading: false
    };
  }),
  on(PropertiesListPageActions.removeProperty, (state: PropertiesState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(PropertiesListPageActions.removePropertySuccess, (state: PropertiesState, {propertyId}) => {
    const list = [...state.data].filter((item: Property) => item.id !== propertyId);

    return {
      ...state,
      data: list,
      isLoading: false
    };
  }),
);

export function reducer(state: PropertiesState | undefined, action: Action) {
  return propertyReducer(state, action);
}

export const getIsPropertiesLoading = (state: PropertiesState) => {
  return state.isLoading;
};

export const getProperties = (state: PropertiesState) => state.data;

function getIndex(itemId: number, list: Property[]) {
  return list.findIndex((property: Property) => property.id === itemId);
}
