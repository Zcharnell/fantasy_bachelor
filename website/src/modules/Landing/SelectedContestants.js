import React, { Component, PropTypes } from 'react';
import autobind from 'class-autobind';
import Checkbox from 'material-ui/Checkbox';
import MapsLocalFlorist from 'material-ui/svg-icons/maps/local-florist';

export default class SelectedContestants extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  clickContestant(name) {
    return () => {
      this.props.onClickContestant(name);
    };
  }

  render() {
    const {
      contestants,
      selectedContestants,
    } = this.props;

    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
        width: '',
        marginLeft: 0,
      },
    };

    const selectedContestantsMap = contestants.filter(
      contestant => selectedContestants.indexOf(contestant.id) > -1,
    );

    return (
      <div className="selected-contestants row">
        {selectedContestantsMap.map(contestant =>
          (<Checkbox
            key={contestant.id}
            checkedIcon={<MapsLocalFlorist style={{ fill: '#EF597B' }} />}
            label={contestant.name}
            style={styles.checkbox}
            checked
            onCheck={this.clickContestant(contestant.id)}
            className="six columns"
          />),
        )}
      </div>
    );
  }
}
{
  const { arrayOf, func, number, shape } = PropTypes;

  SelectedContestants.propTypes = {
    contestants: arrayOf(shape({})).isRequired,
    selectedContestants: arrayOf(number).isRequired,
    onClickContestant: func.isRequired,
  };
}

SelectedContestants.defaultProps = {
};
