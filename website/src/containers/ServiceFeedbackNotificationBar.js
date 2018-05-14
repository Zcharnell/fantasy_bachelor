import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';
import NotificationBar from 'components/NotificationBar';

class ServiceFeedbackNotificationBar extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      flyDown: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastMessageReceivedAt !== nextProps.lastMessageReceivedAt) {
      this.triggerFlyDown(true);
    }
  }

  triggerFlyDown(value) {
    this.setState({ flyDown: value });

    if (value) {
      setTimeout(() => {
        this.triggerFlyDown(false);
      }, 3000);
    }
  }

  render() {
    const { serviceFeedbackMessage, isError } = this.props;
    const flyDown = this.state.flyDown;

    return (
      <NotificationBar
        value={serviceFeedbackMessage}
        isError={isError}
        flyDown={flyDown}
      />
    );
  }
}

ServiceFeedbackNotificationBar.propTypes = {
  serviceFeedbackMessage: PropTypes.string,
  lastMessageReceivedAt: PropTypes.number,
  isError: PropTypes.bool,
};

ServiceFeedbackNotificationBar.defaultProps = {
  serviceFeedbackMessage: '',
  lastMessageReceivedAt: null,
  isError: false,
};

const mapStateToProps = state => ({
  serviceFeedbackMessage: state.serviceFeedback.serviceFeedbackMessage,
  lastMessageReceivedAt: state.serviceFeedback.lastMessageReceivedAt,
  isError: state.serviceFeedback.isError,
});

export default connect(
  mapStateToProps,
  {},
)(ServiceFeedbackNotificationBar);
