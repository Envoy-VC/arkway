import { AuthSig } from '@/types';
import { LitState } from '@/components/layout';

export enum ActionType {
	SET_AUTH_SIG = 'SET_AUTH_SIG',
}

export interface SetAuthSig {
	type: ActionType.SET_AUTH_SIG;
	payload: AuthSig;
}

export function reducer(state: LitState, action: SetAuthSig): LitState {
	switch (action.type) {
		case ActionType.SET_AUTH_SIG:
			return {
				...state,
				authSig: action.payload,
			};
		default:
			return state;
	}
}
