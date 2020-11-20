import { AsyncRequestModel } from '../shared/models/async-request.model';
import { ICodeRepository } from '../shared/models/code-base.model';

export interface CodeRepositoryStore extends AsyncRequestModel {
    codeRepositoryData: ICodeRepository;
}

export const INITIAL_CODE_REPOSITORY: CodeRepositoryStore = {
    codeRepositoryData: null,
    error: null,
    pending: false,
    issued: false
};
