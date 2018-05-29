/**
 * Component to show tagged items
 */
import React, { Component } from 'react';
import DaySelect from '../wardrobe/components/daySelect/daySelect';
import './daysGarments.css'
class DaysGarments extends Component {
  constructor() {
    super()
    this.state = {
       selectedOption: '',
       imgArray:[]
     }
     this.handleDaySelect = this.handleDaySelect.bind(this);
  }
  /**
   * Show all tagged items
   */
  componentDidMount(){
    let imgArray=[];
    if(localStorage.getItem(`tagsObj`)){
      let tagsArray = JSON.parse(localStorage.getItem(`tagsObj`)).tagsArray
      for(var i in tagsArray){
        imgArray.push(
          <div>
          <div>
            <h2>
            {tagsArray[i].day.label}
            </h2>
          </div>
          <div className="tagged-img-container" key={i}>
            <div className="garments-container">
                <div>
                  <h3>Upper garment</h3>
                </div>
                <div className="wardrobe-img-container">
                <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${tagsArray[i].upperGarmentIndex}`)}/>
                </div>
            </div>
            <div className="garments-container">
                <div>
                <h3>Lower Garmnent</h3>
                </div>
                <div className="wardrobe-img-container">
                <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${tagsArray[i].lowerGarmentIndex}`)}/>
                </div>
            </div>
          </div>
          </div>
        )
      }
      this.setState({imgArray})
    }
  }
  /**
   * Save selected option for day and show relevants tagged items
   * @param  {Object} selectedOption [option selected by user]
   */
  handleDaySelect = (selectedOption) => {
    this.setState({ selectedOption:selectedOption });
    let tagsArray = JSON.parse(localStorage.getItem(`tagsObj`)).tagsArray
    let noTag = true;
    let imgArray=[];
    for(var i in tagsArray){
      if(selectedOption.value === tagsArray[i].day.value){
        imgArray.push(
          <div>
          <div className="tagged-img-container" key={i}>
            <div className="garments-container">
                <div>
                  <h3>Upper garment</h3>
                </div>
                <div className="wardrobe-img-container">
                <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${tagsArray[i].upperGarmentIndex}`)}/>
                </div>
            </div>
            <div className="garments-container">
                <div>
                <h3>Lower Garmnent</h3>
                </div>
                <div className="wardrobe-img-container">
                <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${tagsArray[i].lowerGarmentIndex}`)}/>
                </div>
            </div>
          </div>
          </div>
        )
        noTag = false
        break;
      }
    }
    if(noTag){
      imgArray.push(
        <div className="no-tag-container" key={"notag"}>
          No cloths are tagged for the day
        </div>
      )
    }
    this.setState({imgArray})
  }
  render() {
    return (
      <div className="container">
        <div className="days-selection">
        <h2>Select tag</h2>
        <DaySelect selectedOption={this.state.selectedOption} handleDaySelect={this.handleDaySelect}/>
        </div>
        <div className="days-img-container">
          {this.state.imgArray}
        </div>
      </div>
    );
  }
}

export default DaysGarments;
