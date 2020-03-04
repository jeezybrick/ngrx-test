import { Action, createReducer, on } from '@ngrx/store';

import * as PropertiesListPageActions from '../actions/property.actions';

export interface ModifyPropertyState {
  isSubmitting: boolean;
  isSubmitted: boolean;
}

const initialState: ModifyPropertyState = {
  isSubmitting: false,
  isSubmitted: false
};

const modifyPropertyReducer = createReducer(
  initialState,
  on(PropertiesListPageActions.addProperty, (state: ModifyPropertyState) => {
    return getActionState(state);
  }),
  on(PropertiesListPageActions.addPropertySuccess, (state: ModifyPropertyState) => {
     return getSuccessActionState(state);
  }),
  on(PropertiesListPageActions.addPropertyFail, (state: ModifyPropertyState) => {
    return getFailActionState(state);
  }),
  on(PropertiesListPageActions.updateProperty, (state: ModifyPropertyState) => {
     return getActionState(state);
  }),
  on(PropertiesListPageActions.updatePropertySuccess, (state: ModifyPropertyState) => {
    return getSuccessActionState(state);
  }),
  on(PropertiesListPageActions.updatePropertyFail, (state: ModifyPropertyState) => {
    return getFailActionState(state);
  }),
  on(PropertiesListPageActions.removeProperty, (state: ModifyPropertyState) => {
     return getActionState(state);
  }),
  on(PropertiesListPageActions.removePropertySuccess, (state: ModifyPropertyState) => {
    return getSuccessActionState(state);
  }),
  on(PropertiesListPageActions.removePropertyFail, (state: ModifyPropertyState) => {
    return getFailActionState(state);
  })
);

export function reducer(state: ModifyPropertyState | undefined, action: Action) {
  return modifyPropertyReducer(state, action);
}

export const getIsPropertyModifyProcess = (state: ModifyPropertyState) => {
  return state.isSubmitting;
};

export const getIsPropertyModified = (state: ModifyPropertyState) => {
  return state.isSubmitted;
};

function getActionState(state: ModifyPropertyState) {
  return {
    ...state,
    isSubmitting: true
  };
}

function getSuccessActionState(state: ModifyPropertyState) {
  return {
    ...state,
    isSubmitting: false,
    isSubmitted: true
  };
}

function getFailActionState(state: ModifyPropertyState) {
  return {
    ...state,
    isSubmitting: false,
    isSubmitted: false
  };
}

