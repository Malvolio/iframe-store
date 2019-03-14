import { Action } from '@ngrx/store';
 
export enum ActionTypes {
  UpdateCommonInformation = '[Company] Update Common Information',
  UpdatePublicInformation = '[Company] Update Public Information',
  UpdateProtectedInformation = '[Company] Update Protected Information',
  UpdatePrivateInformation = '[Company] Update Private Information',
}

export class UpdateCommonInformation implements Action {
  readonly type = ActionTypes.UpdateCommonInformation;
  constructor(readonly change: number) {}
}

export class UpdatePublicInformation implements Action {
  readonly type = ActionTypes.UpdatePublicInformation;
  constructor(readonly change: number) {}
}
 
export class UpdateProtectedInformation implements Action {
  readonly type = ActionTypes.UpdateProtectedInformation;
  constructor(readonly change: number) {}
}
 
export class UpdatePrivateInformation implements Action {
  readonly type = ActionTypes.UpdatePrivateInformation;
  constructor(readonly change: number) {}
}

export type ActionsUnion = UpdateCommonInformation | UpdatePublicInformation | UpdateProtectedInformation | UpdatePrivateInformation ;
