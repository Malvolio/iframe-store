import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CompanyState } from './company.state';
import { AppState } from './app.state';

export const selectCompanyState = createFeatureSelector<AppState, CompanyState>('company');


export const commonInformationSelector = createSelector(selectCompanyState,
                                                        state => state.commonInformation);

export const privateInformationSelector = createSelector(selectCompanyState,
                                                         state => state.privateInformation);

export const publicInformationSelector = createSelector(selectCompanyState,
                                                        state => state.publicInformation);

export const all = createSelector(selectCompanyState,
                                  state => state);


export const openInformationSelector = createSelector(selectCompanyState,
                                                      state => ({
                                                        publicInformation: state.publicInformation,
                                                        commonInformation: state.commonInformation,
                                                      }) as CompanyState);


