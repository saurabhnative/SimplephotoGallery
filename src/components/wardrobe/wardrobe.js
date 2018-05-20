/**
 * Wardrobe Component
 */
import React, { Component } from 'react';
import './wardrobe.css';
import CloseIcon from 'react-icons/lib/fa/close';
class Wardrobe extends Component {
  constructor(props){
    super(props);
    this.state={
      fileIndex:parseInt(localStorage.getItem("filesUploaded"),10) || 0,
      imgArray:[]
    }
  }
  /**
   * Function to remove item from localStorage
   * @param  {integer} index [index of selected item]
   */
  removeItem(index){
    localStorage.removeItem(`img${index}`)
    localStorage.removeItem(`clothtype$${index}`)
    this.genImageArray();
  }
  componentDidMount(){
    this.genImageArray()
  }
  /**
   * Function to generate grid of uploaded images
   */
  genImageArray(){
    let imgArray=[];
    if(this.state.fileIndex>0){
      for(let i=0;i<this.state.fileIndex;i++){
        if(localStorage.getItem(`img${i}`)){
          imgArray.push(
            <div className="grid-item" key={`img${i}`}>
            <img className="img-upload" alt={`img${i}`} src={localStorage.getItem(`img${i}`)}/>
            <p><b>{localStorage.getItem(`clothtype${i}`)}</b></p>
            <button className='btn' onClick={(e)=>this.removeItem(i)}>
              <CloseIcon className="close-icon"/>
              Remove
            </button>
            </div>
          )
        }
      }
      this.setState({imgArray})
    }else{
      imgArray.push(
        <center>Please upload some images to view in your wardrobe</center>
      )
      this.setState({imgArray})
    }
  }
  render() {
    return (
      <div className="wardrobe-img-container">
        {this.state.imgArray}
      </div>
    );
  }
}

export default Wardrobe;
