import React, { Component } from 'react'
import './App.css'
import { Paper } from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

class App extends Component {
  constructor(){
    super();
    this.state={
      File:null,
      images:[],
      a:["",null],
      b:["",null],
      c:["",null],
      d:["",null],
      order:"0"

    }
  }

  handleRadioButton=(e)=>{
    this.setState({
      order:e.target.value
    },()=>{
      if(this.state.order==="0"){
        this.setState({
          a:["Kuva A",this.state.images[0]],
          b:["Kuva B",this.state.images[1]],
          c:["Kuva C",this.state.images[2]],
          d:["Kuva D",this.state.images[3]],})
      }else if(this.state.order==="1"){
        this.setState({
          a:["Kuva A",this.state.images[3]],
          b:["Kuva B",this.state.images[2]],
          c:["Kuva C",this.state.images[1]],
          d:["Kuva D",this.state.images[0]]
        })
      }else if(this.state.order==="2"){
        this.setState({
          a:["Kuva A",this.state.images[3]],
          b:["Kuva B",this.state.images[2]],
          c:["Kuva C",this.state.images[1]],
          d:["Kuva D",this.state.images[0]]
        })
      }
    })
  }

  selectFiles = (e) => {
    let A = Array.from(e.target.files)
    let newImages = []
    for(let i=0;i<A.length;i++){
      newImages.push(URL.createObjectURL(A[i]))
    }
    this.setState({images: newImages},()=>{
      this.setState({
        a:["Kuva A",this.state.images[0]],
        b:["Kuva B",this.state.images[1]],
        c:["Kuva C",this.state.images[2]],
        d:["Kuva D",this.state.images[3]],})
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper class="App">
          <Paper style={{marginTop: 20}}>
          <div className="App">
          <input type="file" multiple onChange={this.selectFiles} className="filetype" id="group_image"/>
          </div>
          <div>
          <form>
          <div>
            <div className="radio">
            <label>Name ascending
              <input 
              type="radio" 
              value="0"
              checked={this.state.order==="0"}
              onChange={this.handleRadioButton}/>
            </label>
            </div>
          </div>

          <div>
            <div className="radio">
            <label>Name descending
              <input 
              type="radio" 
              value="1"
              checked={this.state.order==="1"}
              onChange={this.handleRadioButton}/>
            </label>
            </div>
          </div>

          <div>
            <div className="radio">
            <label>Size ascending
              <input 
              type="radio" 
              value="2"
              checked={this.state.order==="2"}
              onChange={this.handleRadioButton}/>
            </label>
            </div>

            <div>
            <div className="radio">
            <label>Size descending
              <input 
              type="radio" 
              value="3"
              checked={this.state.order==="3"}
              onChange={this.handleRadioButton}/>
            </label>
            </div>
          </div>
          </div>
          </form>
          <div>
          <img src={this.state.a[1]} style={{width:1000}}/>
          <img src={this.state.b[1]} style={{width:1000}}/>
          <img src={this.state.c[1]} style={{width:1000}}/>
          <img src={this.state.d[1]} style={{width:1000}}/>
          </div>
          </div>
          </Paper>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default App;
