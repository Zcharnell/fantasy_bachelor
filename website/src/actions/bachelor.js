import { CALL_API } from '../middleware/api';

export const POST_USER_DATA_REQUEST = 'POST_USER_DATA_REQUEST';
export const POST_USER_DATA_SUCCESS = 'POST_USER_DATA_SUCCESS';
export const POST_USER_DATA_FAILURE = 'POST_USER_DATA_FAILURE';

const postUserDataAction = body => ({
  [CALL_API]: {
    types: [POST_USER_DATA_REQUEST, POST_USER_DATA_SUCCESS, POST_USER_DATA_FAILURE],
    endpoint: 'user',
    method: 'POST',
    body,
  },
});

export const postUserData = body => dispatch => dispatch(postUserDataAction(body));
