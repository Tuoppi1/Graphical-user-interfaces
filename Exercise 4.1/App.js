import React, { Component } from 'react'
import './App.css'
import { Paper } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

class App extends Component {
  constructor(){

    super();
    this.state={
      n:1
    }
  }

  sliderChange=(e,v)=>{
    this.setState({n:v})
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper class="App" style={{width:500}}>
          <div style={{ maxWidth: 1000,maxHeight: 400 }}>
            <img src={require("./public_folder/Cat"+this.state.n+".jpg")} style={{ maxWidth: 1000 }}/>
          </div>
          <div style={{marginTop:200}}>
            <Slider 
              axis="y" 
              style={{width:700}} 
              step={1} min={1} 
              max={5} 
              value={this.state.n}
              onChange={this.sliderChange}/>
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default App;
