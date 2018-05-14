import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Footer from './Footer'
// import RegionsPage from '../containers/RegionsPage'
// import Navigation from 'containers/Navigation/Navigation';
import ServiceFeedbackNotificationBar from 'containers/ServiceFeedbackNotificationBar';

const handleDismissClick = (e) => {
  e.preventDefault();
};

class App extends Component {
  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#1" onClick={handleDismissClick}>Dismiss</a>)
      </p>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <ServiceFeedbackNotificationBar />
        {/* <Navigation /> */}
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

App.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
});

export default connect(mapStateToProps, {
  // resetErrorMessage
})(App);
