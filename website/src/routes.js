import React from 'react';
import { Route } from 'react-router';
import App from 'components/App';
import LandingContainer from 'modules/Landing/LandingContainer';

export default <Route component={App}>
  <Route
    path="/"
    component={LandingContainer}
  />
</Route>;
