import { combineReducers } from 'redux';
import { serviceFeedback } from 'reducers/serviceFeedback';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  serviceFeedback,
  routing,
});

export default rootReducer;
