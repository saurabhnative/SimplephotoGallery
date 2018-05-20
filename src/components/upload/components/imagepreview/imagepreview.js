/**
 * Component to show image preview on upload
 */
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class ImagePreview extends Component {
  constructor() {
    super()
    this.state = {
       selectedOption: '',
     }
  }
  /**
   * Save selected option for an image
   * @param  {Object} selectedOption [option selected by user]
   */
  handleChange = (selectedOption) => {
    this.setState({ selectedOption:selectedOption });
    localStorage.setItem(`clothtype${this.props.index}`,selectedOption.value)
  }
  render() {
    return (
      <React.Fragment>
      <p>{this.props.file.name}</p>
      <img className="img-upload" alt={this.props.file.name} src={window.URL.createObjectURL(this.props.file)}/>
      <div>
          <Select
          name="form-field-name"
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={[
            { value: 'Upper Garment', label: 'Upper Garment' },
            { value: 'Lower Garment', label: 'Lower Garment' },
          ]}
        />
      </div>
      </React.Fragment>
    );
  }
}

export default ImagePreview;
