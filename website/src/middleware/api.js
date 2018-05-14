import translations from 'json/translations.json';

const API_ROOT = 'https://vcpc5u6a83.execute-api.us-west-2.amazonaws.com/dev/';
const callApi = (endpoint, requestOptions) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  // Method to run after receiving json
  const jsonThen = ((response, json) => {
    if (response && !response.ok) {
      return Promise.reject(json);
    }
    return Object.assign({},
      json,
      { },
    );
  });

  return fetch(fullUrl, requestOptions)
    .then((response) => {
      if (response.status === 204 || response.status === 201) {
        return response.status;
      }
      return response.json().then(json => jsonThen(response, json));
    });
};

export const CALL_API = 'Call API';

export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types } = callAPI;
  const { method, body, misc } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  if (method === 'POST' && body === undefined) {
    throw new Error('Expected POST request body to be defined.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const myHeaders = new Headers({
    'Content-Type': 'application/json',
  });

  const requestOptions = {
    method,
    headers: myHeaders,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({
    type: requestType,
    error: false,
    feedbackMessage: translations.en_us[requestType],
    misc,
  }));

  return callApi(endpoint, requestOptions).then(
    response => next(actionWith({
      response,
      type: successType,
      error: false,
      feedbackMessage: translations.en_us[successType],
      misc,
    })),
    error => next(actionWith({
      type: failureType,
      error: error || { message: 'Something bad happened' },
      feedbackMessage: translations.en_us[failureType],
      misc,
    })),
  );
};
