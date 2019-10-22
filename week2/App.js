import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar';

class App extends Component {
  constructor(){
    super();
    this.state={
    }
  }

  info=()=>{
    this.setState({fname:this.state.person.toString()})
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div class="App" style={{widht:2000}} >
        </div>
        </div>
    )
  }
}

export default App;
