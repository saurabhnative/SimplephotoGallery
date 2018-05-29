/**
 * Component to show image preview on upload
 */
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class DaySelect extends Component {
  render() {
    return (
      <React.Fragment>
      <div>
          <Select
          name="form-field-name"
          value={this.props.selectedOption}
          onChange={this.props.handleDaySelect}
          options={[
            { value: 0, label: 'Sunday' },
            { value: 1, label: 'Monday' },
            { value: 2, label: 'Tuesday' },
            { value: 3, label: 'Wednesday' },
            { value: 4, label: 'Thursday' },
            { value: 5, label: 'Friday' },
            { value: 6, label: 'Saturday' }
          ]}
        />
      </div>
      </React.Fragment>
    );
  }
}

export default DaySelect;
