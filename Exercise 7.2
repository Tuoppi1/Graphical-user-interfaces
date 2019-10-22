import React, { Component } from 'react'
import './App.css'
import { Paper, TextField,Radio,} from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

class App extends Component {
  
  constructor(){
    super();
    this.state={
      spinner:0,
      from:"£",
      to:"$",
      selectedValue:"$",
      result:0.00,
      date: new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
    }
  }

  handleRadio = event => {
    let v = event.target.value
    this.setState({selectedValue:v},()=>{
      if(v==="$"){
        this.setState({to:"$",from:"£"},()=>{this.rateCalculator()})
      }else{
        this.setState({to:"£",from:"$"},()=>{this.rateCalculator()})
      }
      
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value },()=>{
      this.rateCalculator()
    });
  }

  rateCalculator=()=>{
    if(this.state.to==="$"){
      this.setState({result:this.state.spinner * 1.304360,date:new Date().toLocaleString("en-US", {timeZone: "America/New_York"})})
    }else{
      this.setState({result:this.state.spinner * 0.766661,date:new Date().toLocaleString("en-gb")})
    }

  }


  render() {
    return (
      <MuiThemeProvider>
        <Paper class="App" style={{width:1000}}>
          <div style={{ maxWidth: 1000,maxHeight: 400 }}>
          Exchange rate at:
          <div>{this.state.date}</div>
          <div style={{paddingTop:10}}>
            is 
            <TextField
              style={{marginLeft:10,width:100}}
              id="spinner"
              inputProps={{
                style: { textAlign: "right" }
              }}
              value={this.state.spinner}
              onChange={this.handleChange('spinner')}
              type="number"/>{this.state.from} = {this.state.result.toFixed(2)}{this.state.to}
          </div>
          <div>
              <Radio
              checked={this.state.selectedValue === '$'}
              onChange={this.handleRadio}
              value="$"
              name="radio-button-demo"
              aria-label="$"
            />£ to $
            <Radio
              checked={this.state.selectedValue === '£'}
              onChange={this.handleRadio}
              value="£"
              name="radio-button-demo"
              aria-label="£"
              />$ to £
          </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default App;
