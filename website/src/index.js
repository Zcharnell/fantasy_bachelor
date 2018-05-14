import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import middlewareApi from 'middleware/api';
// import { loadColumnConfig } from 'actions/tableConfig'
// import { loadAllRegions } from './actions/regions'
import styles from 'index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from 'routes';
import { Router } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import columnConfig from './json/dataColumns.json'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware, middlewareApi, loggerMiddleware),
      // DevTools.instrument()
    ),
  );

  return store;
};

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// store.dispatch(loadAllRegions())
// store.dispatch(loadColumnConfig(columnConfig))

render(
  <Provider store={store}>
    <div>
      <MuiThemeProvider>
        <Router history={history} routes={routes} />
      </MuiThemeProvider>
    </div>
  </Provider>,
  document.getElementById('root'),
);
