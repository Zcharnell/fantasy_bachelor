import React, { Component, PropTypes } from 'react';
import autobind from 'class-autobind';
import ListContestants from 'modules/Landing/ListContestants';
import SelectedContestants from 'modules/Landing/SelectedContestants';

export default class WeekView extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {
      weekId,
      weekLabel,
      contestants,
      selectedContestants,
      onClickContestant,
      numberOfRoses,
    } = this.props;

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    return (
      <div className="use-skeleton" style={{ marginTop: '25px' }}>
        <div className="row">
          {/* <h2 style={styles.headline} className="heading ">{weekLabel}</h2> */}
          <div className="row">
            <div className="six columns">
              <h3>
                Girls
                <span className="number-left mobile-only">
                  {selectedContestants.length} of {numberOfRoses} roses given.
                </span>
              </h3>
              <ListContestants
                selectedContestants={selectedContestants}
                onClickContestant={onClickContestant(weekId)}
                contestants={contestants}
              />
            </div>
            <div className="six columns">
              <h3>
                Selections
                <span className="number-left">
                  {selectedContestants.length} of {numberOfRoses} roses given.
                </span>
              </h3>
              <SelectedContestants
                selectedContestants={selectedContestants}
                onClickContestant={onClickContestant(weekId)}
                contestants={contestants}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
{
  const { arrayOf, shape, func, number, string } = PropTypes;

  WeekView.propTypes = {
    contestants: arrayOf(shape({})).isRequired,
    selectedContestants: arrayOf(number).isRequired,
    onClickContestant: func.isRequired,
    weekId: string.isRequired,
    weekLabel: string.isRequired,
    numberOfRoses: number.isRequired,
  };
}

WeekView.defaultProps = {
};
