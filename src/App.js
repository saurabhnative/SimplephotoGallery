/**
 * Main modules file
 */
import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/upload';
import Wardrobe from './components/wardrobe/wardrobe';
import DaysGarments from './components/daysGarments/daysGarments.js';
import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;
class App extends Component {
  constructor(props){
    super(props);
    let content=[];
    content.push(
      <React.Fragment key="content">
        <Upload />
      </React.Fragment>
    )
    this.state = {
      content:content
    }
  }
  /**
   * [Function to switch between tabs]
   * @param  {Object} item [selected item]
   * @param  {String} key  [selected item key]
   * @return {array} React component
   */
  handleSelect(item,key){
    let content = []
    if(item.key === "upload"){
      content.push(
        <React.Fragment key='content'>
          <Upload />
        </React.Fragment>
      )
    }else if(item.key === "wardrobe"){
      content.push(
        <React.Fragment key='content'>
          <Wardrobe />
        </React.Fragment>
      )
    }
    else {
      content.push(
        <React.Fragment key='content'>
          <DaysGarments />
        </React.Fragment>
      )
    }
    this.setState({content})
  }
  render() {
    return (
      <div className="App">
      <Layout className="layout">
       <Header>
         <div className="logo">Cloths</div>
         <Menu
           theme="dark"
           mode="horizontal"
           defaultSelectedKeys={['upload']}
           style={{ lineHeight: '64px' }}
           onSelect={(item)=>this.handleSelect(item)}
         >
           <Menu.Item key="upload">Upload Images</Menu.Item>
           <Menu.Item key="wardrobe">Wardrobe</Menu.Item>
           <Menu.Item key="daysGarments">DaysGarments</Menu.Item>
         </Menu>
       </Header>
       <Content className="content">
         {this.state.content}
       </Content>
      </Layout>
      </div>
    );
  }
}

export default App;
