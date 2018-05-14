import React, { Component, PropTypes } from 'react';
import autobind from 'class-autobind';
import Checkbox from 'material-ui/Checkbox';
import MapsLocalFlorist from 'material-ui/svg-icons/maps/local-florist';

export default class ListContestants extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  clickContestant(id) {
    return () => {
      this.props.onClickContestant(id);
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

    return (
      <div className="list-contestants row">
        {contestants.length === 0 &&
          <div className="rose-color">Girls selected in the previous week will show up here.</div>
        }
        {contestants.map(contestant =>
          // <ListItem key={contestant.name} primaryText={contestant.name} />,
          (<Checkbox
            key={contestant.name}
            checkedIcon={<MapsLocalFlorist style={{ fill: '#EF597B' }} />}
            uncheckedIcon={<MapsLocalFlorist style={{ fill: 'gray' }} />}
            label={contestant.name}
            style={styles.checkbox}
            checked={selectedContestants.indexOf(contestant.id) > -1}
            onCheck={this.clickContestant(contestant.id)}
            className="six columns"
          />),
        )}
        {/* </List> */}
      </div>
    );
  }
}
{
  const { arrayOf, shape, func, number } = PropTypes;

  ListContestants.propTypes = {
    contestants: arrayOf(shape({})).isRequired,
    selectedContestants: arrayOf(number).isRequired,
    onClickContestant: func.isRequired,
  };
}

ListContestants.defaultProps = {
};
