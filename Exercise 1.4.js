import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';



class App extends Component {
  constructor(){
    super();
    this.state={
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      heading1: ""
    };
  }

  adjustCheckbox1 = (event,isChecked) =>{
    this.setState({checkbox1: isChecked});
  }
  adjustCheckbox2 = (event,isChecked) =>{
    this.setState({checkbox2: isChecked});
  }
  adjustCheckbox3 = (event,isChecked) =>{
    this.setState({checkbox3: isChecked});
  }

  mouseListener = (event) =>{
    if(this.state.checkbox1){
      this.setState({heading1: "Last event was a mouse click"});
    }
  }

  mouseMotionListener = (event) =>{
    let xx = event.clientX;
    let yy = event.clientY;
    if(this.state.checkbox2){
      this.setState({heading1: "Current mouse coordinates = "+xx+", "+yy});
    }
  }

  mouseWheelListener = (event) =>{
    if(this.state.checkbox3){
      this.setState({heading1: "Mousewheel was moved"});
    }
  }

  render() {
    return (
      <div className="App" style={{width: 500,height: 1000, marginLeft: 700}}onMouseMove={this.mouseMotionListener} onMouseDown={this.mouseListener} onWheel={this.mouseWheelListener}>
      <MuiThemeProvider>
        <Paper style={{widht: 800,height: 300, align: "center"}}>
          <div className="checkBox"><Checkbox align="midle" onCheck={this.adjustCheckbox1}label="Mouse listener"/></div>
          <div className="checkBox"><Checkbox onCheck={this.adjustCheckbox2} label="Mouse motion listener"/></div>
          <div className="checkBox"><Checkbox onCheck={this.adjustCheckbox3}label="Mouse wheel listener"/></div>
          <div> <TextField style={{width: 500}} value={this.state.heading1} /></div>
      
        <header className="App-header" style={{align: "right"}}>
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </header>
        </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
