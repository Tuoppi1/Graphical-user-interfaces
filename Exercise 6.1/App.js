import React, { Component } from 'react'
import './App.css'
import { Paper, TextField, Button, Dialog,DialogTitle,DialogActions,DialogContentText,DialogContent } from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import myPopulation from './myPopulation'

class App extends Component {
  
  constructor(){
    let myP = new myPopulation()
    let fname = myP.getInfo()[0]
    let lname = myP.getInfo()[1]
    let bt = myP.getInfo()[2]
    let bc = myP.getInfo()[3]
    let by = myP.getInfo()[4]
    let ms = myP.getInfo()[5]

    super();
    this.state={
      n:1,
      myP:myP,
      dialog:false,
      fname:fname,
      lname:lname,
      bt:bt,
      bc:bc,
      by:by,
      
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleDialog=()=>{
    if(this.state.dialog===false){
      this.setState({dialog:true})
    }else{
      this.setState({dialog:false})
    }
  }

  save=()=>{
    this.state.myP.save([
      this.state.fname,
      this.state.lname,
      this.state.bt,
      this.state.bc,
      this.state.by,
      this.state.ms
    ])
    this.handleDialog()
  }
  cancel=()=>{
    this.setState({
      fname:this.state.myP.getInfo()[0],
      lname:this.state.myP.getInfo()[1],
      bt:this.state.myP.getInfo()[2],
      bc:this.state.myP.getInfo()[3],
      by:this.state.myP.getInfo()[4],
      ms:this.state.myP.getInfo()[5]
    })
    this.handleDialog()
  }

  next=()=>{
    this.state.myP.next() 
    this.setState({
      fname:this.state.myP.getInfo()[0],
      lname:this.state.myP.getInfo()[1],
      bt:this.state.myP.getInfo()[2],
      bc:this.state.myP.getInfo()[3],
      by:this.state.myP.getInfo()[4],
      ms:this.state.myP.getInfo()[5]
    })
  }

  previous=()=>{
    this.state.myP.previous()
    this.setState({
      fname:this.state.myP.getInfo()[0],
      lname:this.state.myP.getInfo()[1],
      bt:this.state.myP.getInfo()[2],
      bc:this.state.myP.getInfo()[3],
      by:this.state.myP.getInfo()[4],
      ms:this.state.myP.getInfo()[5]
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper class="App" style={{width:1000}}>
          <div style={{ maxWidth: 1000,maxHeight: 400 }}>

            <div>Name:<TextField 
                        id="fn" 
                        value={this.state.fname} 
                        onChange={this.handleChange('fname')} 
                        style={{paddingLeft:82}}/>

                      <TextField 
                        id="ln"
                        value={this.state.lname}
                        onChange={this.handleChange('lname')}
                        style={{paddingLeft:5}}/>
                        
                        
                      <Button
                        variant="contained"
                        onClick={this.handleDialog} 
                        color="primary"
                        style={{marginLeft:15}}>
                        Edit</Button></div>

            <div>Born:<TextField 
                        id="bt"
                        value={this.state.bt}
                        onChange={this.handleChange('bt')}
                        style={{paddingLeft:90}}/>

                      <TextField 
                        id="bc"
                        value={this.state.bc}
                        onChange={this.handleChange('bc')}
                        style={{paddingLeft:5}}/>

                      <TextField 
                        id="by" 
                        type="number"
                        value={this.state.by}
                        onChange={this.handleChange('by')}
                        style={{paddingLeft:5}}/></div>

            <div style={{paddingTop:30}}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{marginLeft:5}}
                  onClick={this.previous}>
                  Previous</Button>

                 <Button 
                    variant="contained" 
                    color="primary" 
                    style={{marginLeft:5}}
                    onClick={this.next}>
                    Next</Button>
            </div>




            <Dialog
              open={this.state.dialog}
              onClose={this.handleDialog}
              aria-labelledby="form-dialog-title"
            >
          <DialogTitle id="form-dialog-title">Edit person info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField 
              id="fn"
              label="First name"
              value={this.state.fname} 
              onChange={this.handleChange('fname')} 
              style={{marginTop:5}}/>

            <TextField 
              id="ln"
              label="Last name"
              value={this.state.lname}
              onChange={this.handleChange('lname')}
              style={{marginLeft:5,marginTop:5}}/>
             <div>
             <TextField 
              id="bt"
              label="Birth town"
              value={this.state.bt}
              onChange={this.handleChange('bt')}
              style={{marginTop:5}}/>

             <TextField 
              id="bc"
              label="Birth country"
              value={this.state.bc}
              onChange={this.handleChange('bc')}
              style={{marginTop:5}}/>

             <TextField
              id="by"
              label="Birth year"
              type="number"
              value={this.state.by}
              onChange={this.handleChange('by')}
              style={{marginTop:5}}/></div>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.save} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
          </div>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default App;
