import React, { Component } from 'react'
import './App.css'
import { Paper, Button } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

class App extends Component {
  
  constructor(){
    super();
    this.state={
      n:0,
      current:"",
      history:[],
      future:[]
    }
  }

  sliderChange=(e,v)=>{
    this.setState({n:v})
  }

  commit=()=>{
    this.state.history.push(this.state.n)
    this.setState({
      current:this.state.n
    })
  }

  undo=()=>{
    if(this.state.history.length>0){
      this.state.future.push(this.state.current)
      this.setState({
        current:this.state.history.pop()
      })
    }
  }

  redo=()=>{
    if(this.state.future.length>0){
      this.state.history.push(this.state.current)
      this.setState({
        current:this.state.future.pop()
      })
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper class="App" style={{width:1000}}>
          <div style={{ maxWidth:1000,maxHeight:400}}>
          
           <div style={{paddingTop:5}}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{marginLeft:5}}
                  onClick={this.undo}
                  disabled={this.state.history.length<1}>
                  Undo</Button>

                 <Button 
                    variant="contained" 
                    color="primary" 
                    style={{marginLeft:5}}
                    onClick={this.redo}
                    disabled={this.state.future.length<1}>
                    Redo</Button></div>

            <div>
            <Slider 
              axis="y" 
              style={{width:300,paddingTop:20,paddingLeft:10}} 
              step={1} min={0} 
              max={255} 
              value={this.state.n}
              onChange={this.sliderChange}/>

              <p style={{display:"inline",paddingLeft:300}}>{this.state.n}</p>

                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={{marginLeft:10,}}
                    onClick={this.commit}>
                    Commit</Button>

                    <p style={{display:"inline",paddingLeft:30}}>{this.state.current}</p>
                    <p style={{display:"inline",paddingLeft:40}}>255</p>

            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default App;
