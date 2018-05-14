import _ from 'lodash';
import {
  POST_USER_DATA_REQUEST, POST_USER_DATA_SUCCESS, POST_USER_DATA_FAILURE,
} from 'actions/bachelor';

export function serviceFeedback(state = {
  serviceFeedbackMessage: '',
  lastMessageReceivedAt: 0,
  isError: false,
}, action) {
  let response;
  switch (action.type) {
    case POST_USER_DATA_REQUEST:
      return Object.assign({}, state, {
        serviceFeedbackMessage: 'Submitting...',
        isError: false,
      });
    case POST_USER_DATA_SUCCESS:
      response = action.response;
      if (response.errorMessage) {
        return Object.assign({}, state, {
          serviceFeedbackMessage: response.errorMessage,
          lastMessageReceivedAt: new Date().getTime(),
          isError: true,
        });
      }
      return Object.assign({}, state, {
        serviceFeedbackMessage: `Bracket submitted successfully for ${_.get(response, 'data.email', '')}!`,
        lastMessageReceivedAt: new Date().getTime(),
        isError: false,
      });
    case POST_USER_DATA_FAILURE:
      return Object.assign({}, state, {
        serviceFeedbackMessage: action.feedbackMessage + (action.error.error || ''),
        lastMessageReceivedAt: new Date().getTime(),
        isError: true,
      });
    default:
      if (action.feedbackMessage) {
        return Object.assign({}, state, {
          serviceFeedbackMessage: action.feedbackMessage + (action.error.error || ''),
          lastMessageReceivedAt: new Date().getTime(),
          isError: (!!action.error),
        });
      }
      return state;
  }
}

export default { serviceFeedback };
