/**
 * Wardrobe Component
 */
import React, { Component } from 'react';
import './wardrobe.css';
import TagIcon from 'react-icons/lib/fa/tag';
import DaySelect from './components/daySelect/daySelect';
class Wardrobe extends Component {
  constructor(props){
    super(props);
    this.state={
      fileIndex:parseInt(localStorage.getItem("filesUploaded"),10) || 0,
      lowerGarmentImgArray:[],
      upperGarmentImgArray:[],
      upperGarmentTag:undefined,
      lowerGarmentTag:undefined,
      selectedOption:'',
      tagsArray:localStorage.getItem(`tagsObj`)? JSON.parse(localStorage.getItem(`tagsObj`)).tagsArray:[]
    }
    this.handleDaySelect =  this.handleDaySelect.bind(this);
  }
  /**
   * Function to tag items based on selection
   * @param  {integer} index [index of selected item]
   */
  tagItem(index,clothtype){
    if(clothtype === "upperGarment"){
      this.setState({upperGarmentTag:index})
    }else{
      this.setState({lowerGarmentTag:index})
    }
  }
  componentDidMount(){
    this.genImageArray()
  }
  /**
   * Function to generate grid of uploaded images
   */
  genImageArray(){
    let upperGarmentImgArray=[],lowerGarmentImgArray=[];
    if(this.state.fileIndex>0){
      for(let i=0;i<this.state.fileIndex;i++){
        if(localStorage.getItem(`img${i}`)){
          if(localStorage.getItem(`clothtype${i}`) === "Upper Garment"){
            upperGarmentImgArray.push(
            <div className="grid-item" key={`img${i}`}>
            <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${i}`)}/>
            <p><b>{localStorage.getItem(`clothtype${i}`)}</b></p>
            <button className='btn' onClick={(e)=>this.tagItem(i,"upperGarment")}>
              <TagIcon className="close-icon"/>
              Tag
            </button>
            </div>
            )
          }else if(localStorage.getItem(`clothtype${i}`) === "Lower Garment"){
            lowerGarmentImgArray.push(
            <div className="grid-item" key={`img${i}`}>
            <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${i}`)}/>
            <p><b>{localStorage.getItem(`clothtype${i}`)}</b></p>
            <button className='btn' onClick={(e)=>this.tagItem(i,"lowerGarment")}>
              <TagIcon className="close-icon"/>
              Tag
            </button>
            </div>
            )
          }
        }
      }
      this.setState({upperGarmentImgArray,lowerGarmentImgArray})
    }
  }
  /**
   * Funtion to select day store selection
   * @param  {[type]} selectedOption [description]
   * @return {[type]}                [description]
   */
  handleDaySelect = (selectedOption) => {
    this.setState({ selectedOption:selectedOption });
    let dayTag = {
      day: selectedOption,
      upperGarmentIndex: this.state.upperGarmentTag,
      lowerGarmentIndex: this.state.lowerGarmentTag
    }
    let tagsArray=this.state.tagsArray;
    let tagExists = false;
    //Duplicacy check
    for(var i in tagsArray){
      if(tagsArray[i].day.value === selectedOption.value){
        tagExists = true;
        tagsArray[i]=dayTag;
        break;
      }
    }
    if(!tagExists){
      tagsArray.push(dayTag)
    }
    let tagsObj = {
      tagsArray:tagsArray
    }
    this.setState({tagsArray,upperGarmentTag:undefined,lowerGarmentTag:undefined})
    localStorage.setItem("tagsObj",JSON.stringify(tagsObj))
  }
  /**
   * Funtion to show tag selection options
   * @return {Object}
   */
  genTag(){
    if(this.state.upperGarmentTag>=0 && this.state.lowerGarmentTag>=0){
      return(
        <div className="day-select">
        <p>Select Tag</p>
        <DaySelect selectedOption={this.state.selectedOption} handleDaySelect={this.handleDaySelect}/>
        </div>
      )
    }else if(this.state.upperGarmentTag || this.state.lowerGarmentTag){
      return(
        <p>Select tag from other category to continue</p>
      )
    }else if(this.state.fileIndex==0){
      return(
        <p>Upload Images to preview</p>
      )
    }else{
      return(
        <p>Select image tags from above</p>
      )
    }
  }
  render() {
    return (
      <div>
        <div className="parent-img-container">
          <div className="garments-container">
            <div>
              <h3>Upper garments</h3>
            </div>
            <div className="wardrobe-img-container">
            {this.state.upperGarmentImgArray}
            </div>
          </div>
          <div className="garments-container">
            <div>
            <h3>Lower Garmnents</h3>
            </div>
            <div className="wardrobe-img-container">
            {this.state.lowerGarmentImgArray}
            </div>
          </div>
        </div>
        <div className="tags-container">
        {this.genTag()}
        </div>
      </div>
    );
  }
}

export default Wardrobe;
