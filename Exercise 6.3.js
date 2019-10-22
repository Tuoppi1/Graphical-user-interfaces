import React, { Component } from 'react'
import './App.css'
import { Paper, TextField, Button,} from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'


class App extends Component {
  constructor(){
    super();
    this.state={
      MagicSquire:[[4,9,2],[3,5,7],[8,1,6]],
      verdict:"The Square is a magic square",
      colour:'green'
    }
  }

  check=()=>{
    let ms=this.state.MagicSquire
    if(
      //Horizontal
      parseInt(ms[0][0])+parseInt(ms[1][0])+parseInt(ms[2][0])=== 15 &&
      parseInt(ms[0][1])+parseInt(ms[1][1])+parseInt(ms[2][1])=== 15 &&
      parseInt(ms[0][2])+parseInt(ms[1][2])+parseInt(ms[2][2])=== 15 &&

      //Vertical
      parseInt(ms[0][0])+parseInt(ms[0][1])+parseInt(ms[0][2])=== 15 &&
      parseInt(ms[1][0])+parseInt(ms[1][1])+parseInt(ms[1][2])=== 15 &&
      parseInt(ms[2][0])+parseInt(ms[2][1])+parseInt(ms[2][2])=== 15 &&

      //Diagonal
      parseInt(ms[0][0])+parseInt(ms[1][1])+parseInt(ms[2][2])=== 15 &&
      parseInt(ms[0][2])+parseInt(ms[1][1])+parseInt(ms[2][0])=== 15){
        this.setState({verdict:"The Square is a magic square",colour:'green'})
      }else{
        this.setState({
          verdict:"The Square is not a magic square", colour:'red'})
      }
  }

  handleChange=(c,r)=> event =>{
    let tmp = this.state.MagicSquire
    tmp[c][r] = event.target.value
    this.setState({MagicSquire:tmp})
  }


  render() {
    return (
      <MuiThemeProvider>
        <Paper class="App" style={{width:1000}}>
          <div style={{ maxWidth: 1000,maxHeight: 40 }}>

          <div>
          <Button variant="contained" 
                  color="primary"
                  style={{marginTop:50,marginLeft:420}}
                  onClick={this.check}>Is it Magic?</Button>
          </div>

          <div 
            style={{color:this.state.colour,
            fontWeight: 'bold',
            marginLeft:375,
            marginTop:5}}>{this.state.verdict}</div>

          <div id="showgrid" style={{marginTop:10}}>
          <div class="row">
            <div class="column"><TextField type="number" value={this.state.MagicSquire[0][0]} onChange={this.handleChange(0,0)}></TextField></div>
            <div class="column"><TextField type="number" value={this.state.MagicSquire[1][0]} onChange={this.handleChange(1,0)}></TextField></div>
            <div class="column"><TextField type="number" value={this.state.MagicSquire[2][0]} onChange={this.handleChange(2,0)}></TextField></div>
          </div>

          <div class="row">
            <div class="column"><TextField type="number" value={this.state.MagicSquire[0][1]} onChange={this.handleChange(0,1)}></TextField></div>
            <div class="column"><TextField type="number" value={this.state.MagicSquire[1][1]} onChange={this.handleChange(1,1)}></TextField></div>
            <div class="column"><TextField type="number" value={this.state.MagicSquire[2][1]} onChange={this.handleChange(2,1)}></TextField></div>
          </div>
          
          <div class="row">
            <div class="column"><TextField type="number" value={this.state.MagicSquire[0][2]} onChange={this.handleChange(0,2)}></TextField></div>
            <div class="column"><TextField type="number" value={this.state.MagicSquire[1][2]} onChange={this.handleChange(1,2)}></TextField></div>
            <div class="column"><TextField type="number" value={this.state.MagicSquire[2][2]} onChange={this.handleChange(2,2)}></TextField></div>
          </div>
        </div>
        
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default App;
