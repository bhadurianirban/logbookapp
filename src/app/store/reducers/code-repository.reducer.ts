import { CodeRepositoryStore, INITIAL_CODE_REPOSITORY } from '../code-repository.store';
import { CodeRepositoryActionUnion, CodeRepositoryActions } from '../actions';

export function CodeRepositoryReducer(state: CodeRepositoryStore = INITIAL_CODE_REPOSITORY, action: CodeRepositoryActionUnion) {
    switch (action.type) {
        case CodeRepositoryActions.GET_ALL_CODES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case CodeRepositoryActions.GET_ALL_CODES_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { codeRepositoryData: { codes: action.payload  } });
        case CodeRepositoryActions.GET_ALL_CODES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case CodeRepositoryActions.GET_PENDING_CODES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case CodeRepositoryActions.GET_PENDING_CODES_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
            }, { codeRepositoryData: { pendingCodes: action.payload  } });
        case CodeRepositoryActions.GET_PENDING_CODES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
