import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import WeekView from 'modules/Landing/WeekView';
import { postUserData } from 'actions/bachelor';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
import autobind from 'class-autobind';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import bachelorData from 'json/bachelor_data.json';

class LandingContainer extends Component {
  componentWillMount() {
    autobind(this);

    // Declare constants
    this.weeks = bachelorData.weekOrder.map(weekId => bachelorData.weeks[weekId]);
    this.numberOfRoses = _.zipObject(
      bachelorData.weekOrder,
      this.weeks.map(week => week.numberOfRoses),
    );

    this.contestants = _.sortBy(
      Object.keys(bachelorData.contestants).map(
        contestantId => bachelorData.contestants[contestantId],
      ),
      ['name'],
    );

    // Declare state
    this.state = {
      ..._.zipObject(
        bachelorData.weekOrder,
        this.weeks.map(() => []),
      ),
      // week3: [],
      // week4: [],
      // week5: [],
      // week6: [],
      // week7: [],
      // week8: [],
      // week9: [],
      // week10: [],
      email: '',
      confirmEmail: '',
      name: '',
      errorText: '',
    };
  }

  onClickContestant(week) {
    return (contestantId) => {
      const selectedContestants = _.clone(this.state[week]);
      const index = selectedContestants.indexOf(contestantId);
      if (index === -1) {
        if (this.numberOfRoses[week] > selectedContestants.length) {
          selectedContestants.push(contestantId);
        }
      } else {
        selectedContestants.splice(index, 1);
      }

      this.setState({
        [week]: selectedContestants,
      });
    };
  }

  onSubmit() {
    this.setState({
      errorText: '',
    });
    if (this.checkErrors()) {
      return;
    }

    const payload = {
      email: this.state.email,
      name: this.state.name,
      contestants: {
        week3: this.state.week3,
        week4: this.state.week4,
        week5: this.state.week5,
        week6: this.state.week6,
        week7: this.state.week7,
        week8: this.state.week8,
        week9: this.state.week9,
        week10: this.state.week10,
      },
      league: 'Olivia',
    };
    this.props.postUserData(payload);
  }

  getTabLabel(week) {
    if (this.state[week.id].length === this.numberOfRoses[week.id]) {
      return (
        <span>
          <span style={{ display: 'inline-block', height: '24px', width: '8px' }}>
            {week.number}
          </span>
          <ActionDone
            style={{ position: 'relative', top: '5px' }}
            color={'#00FF00'}
            viewBox="0 0 24 24"
          />
        </span>);
    }
    return week.number;
  }

  handleChange(stateProp) {
    return (event) => {
      this.setState({
        [stateProp]: event.target.value,
      });
    };
  }

  checkErrors() {
    if (!this.state.name) {
      this.setState({
        errorText: 'Please enter a name.',
      });
      return true;
    }
    if (!this.state.email) {
      this.setState({
        errorText: 'Please enter an email.',
      });
      return true;
    }
    if (this.state.email !== this.state.confirmEmail) {
      this.setState({
        errorText: 'Emails do not match, please check the emails you entered.',
      });
      return true;
    }
    if (!this.checkAllRosesGiven(this.weeks)) {
      this.setState({
        errorText: 'All selections for future rose ceremonies must be made before you can submit!',
      });
      return true;
    }

    return false;
  }

  checkRosesGivenForWeek(weekId) {
    if (this.state[weekId].length === this.numberOfRoses[weekId]) return true;
    return false;
  }

  checkAllRosesGiven(weeks) {
    for (let i = 0; i < weeks.length; i += 1) {
      const week = weeks[i];
      if (!this.checkRosesGivenForWeek(week.id)) {
        // console.log('Roses left for ' + week.id);
        return false;
      }
    }
    // console.log('All roses given');
    return true;
  }

  render() {
    const { submitFeedback, isError } = this.props;
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      header: {
        fontWeight: 300,
      },
    };

    const weeks = this.weeks;
    const allRosesGiven = this.checkAllRosesGiven(weeks);

    const submitButtonStyle = (allRosesGiven)
      ? {
        backgroundColor: '#01BCD5',
        marginLeft: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
      }
      : {
        marginLeft: '15px',
        backgroundColor: '#E5E5E5',
        boxShadow: 'none',
      };
    const submitButtonStyleLabel = (allRosesGiven)
      ? '#FFF'
      : '#A0A0A0';

    return (
      <div className="landing">
        <div className="nav">
          <h2 style={styles.header}>Fantasy Bachelor Bracket</h2>
        </div>
        <div className="landing-body">
          <div>
            <h2 className="header">Enter User Info</h2>
            <div>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
              />
            </div>
            <div>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </div>
            <div>
              <TextField
                hintText="Email"
                floatingLabelText="Confirm Email"
                value={this.state.confirmEmail}
                onChange={this.handleChange('confirmEmail')}
              />
            </div>
          </div>

          <h2 className="header">Select Girls</h2>
          <h3 style={{ fontWeight: '400' }}>
            Rose Ceremonies
            <RaisedButton
              label="Submit Bracket"
              onClick={this.onSubmit}
              style={{ boxShadow: 'none' }}
              buttonStyle={submitButtonStyle}
              labelColor={submitButtonStyleLabel}
            />
          </h3>
          {submitFeedback && !isError &&
            <div className="blue-color" style={{ marginBottom: '10px' }}>
              {submitFeedback}
            </div>
          }
          {submitFeedback && isError &&
            <div className="rose-color" style={{ marginBottom: '10px' }}>
              {submitFeedback}
            </div>
          }
          {this.state.errorText &&
            <div className="rose-color" style={{ marginBottom: '10px' }}>
              {this.state.errorText}
            </div>
          }
          <Tabs>
            {weeks.map(week =>
              (<Tab label={this.getTabLabel(week)} key={week.id}>
                <WeekView
                  contestants={this.contestants.filter(
                    contestant => (week.previousWeekId
                      ? this.state[week.previousWeekId].indexOf(contestant.id) > -1
                      : true
                    ),
                  )}
                  selectedContestants={this.state[week.id]}
                  weekId={week.id}
                  weekLabel={week.label}
                  numberOfRoses={this.numberOfRoses[week.id]}
                  onClickContestant={this.onClickContestant}
                />
              </Tab>),
            )}
          </Tabs>
        </div>
      </div>
    );
  }
}

{
  const { func, string, bool } = PropTypes;
  LandingContainer.propTypes = {
    postUserData: func.isRequired,
    submitFeedback: string.isRequired,
    isError: bool.isRequired,
  };
}

const mapStateToProps = state => ({
  submitFeedback: _.get(state, 'serviceFeedback.serviceFeedbackMessage'),
  isError: _.get(state, 'serviceFeedback.isError'),
});

export default connect(
  mapStateToProps,
  { postUserData },
)(LandingContainer);
