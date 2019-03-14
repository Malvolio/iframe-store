import { Action } from '@ngrx/store';
import * as CompanyActions from './company.actions'
import { CompanyState } from './company.state'

export function reducer(
  state: CompanyState = {
    commonInformation: 0,
    publicInformation: 0,
    privateInformation: 0,
  },
  action: CompanyActions.ActionsUnion,
): CompanyState {
  switch (action.type) {
    case CompanyActions.ActionTypes.UpdateCommonInformation: {
      return {
        ...state,
        commonInformation: state.commonInformation + action.change,
      };
    }
 
    case CompanyActions.ActionTypes.UpdatePublicInformation: {
      return {
        ...state,
        publicInformation: state.publicInformation + action.change,
      };
    }
 
    case CompanyActions.ActionTypes.UpdatePrivateInformation: {
      return {
        ...state,
        privateInformation: state.privateInformation + action.change,
      };
    }
 
    default: {
      return state;
    }
  }
}
