import React, { Component } from 'react'
import './App.css'
import { Paper, TextField, Button, Dialog,DialogTitle,DialogActions,
  DialogContentText,DialogContent,Radio,RadioGroup,FormControlLabel } from '@material-ui/core'
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

    const BUNDLE = {
      default: {
        name: "Name",
        born:"Born",
        edit:"Edit",
        previous:"Previous",
        next:"Next",
        dialog:"Edit person info",
        fn:"First name",
        ln:"Last name",
        bt:"Birth town",
        bc:"Birth country",
        by:"Birth year",
        cancel:"Cancel"
      },	
      en: {
        name: "Name",
        born:"Born",
        edit:"Edit",
        previous:"Previous",
        next:"Next",
        dialog:"Edit person info",
        fn:"First name",
        ln:"Last name",
        bt:"Birth town",
        bc:"Birth country",
        by:"Birth year",
        cancel:"Cancel"
      },	
      fi: {
        name: "Nimi",
        born:"Syntynyt",
        edit:"Muokkaa",
        previous:"Edellinen",
        next:"Seuraava",
        dialog:"Muokkaa henkilötietoja",
        fn:"Etunimi",
        ln:"Sukunimi",
        bt:"Syntymäkaupunki",
        bc:"Syntymämaa",
        by:"Syntymävuosi",
        cancel:"Peruuta"
      }
    }

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
      buddle:BUNDLE,
      en:BUNDLE.en,
      fi:BUNDLE.fi,
      lang:BUNDLE.default,
      currentLang:"en"
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

  handleRadio = event => {
    this.setState({currentLang:event.target.value})

    let newLang = this.state.lang
    if(event.target.value==="fi"){
      newLang.name = this.state.fi.name
      newLang.born = this.state.fi.born
      newLang.edit = this.state.fi.edit
      newLang.previous = this.state.fi.previous
      newLang.next = this.state.fi.next
      newLang.dialog = this.state.fi.dialog
      newLang.fn = this.state.fi.fn
      newLang.ln = this.state.fi.ln
      newLang.bt = this.state.fi.bt
      newLang.bc = this.state.fi.bc
      newLang.by = this.state.fi.by
      newLang.cancel = this.state.fi.cancel
      this.setState({ lang:newLang})
    }else{
      newLang.name = this.state.en.name
      newLang.born = this.state.en.born
      newLang.edit = this.state.en.edit
      newLang.previous = this.state.en.previous
      newLang.next = this.state.en.next
      newLang.dialog = this.state.en.dialog
      newLang.fn = this.state.en.fn
      newLang.ln = this.state.en.ln
      newLang.bt = this.state.en.bt
      newLang.bc = this.state.en.bc
      newLang.by = this.state.en.by
      newLang.cancel = this.state.en.cancel
      this.setState({ lang:newLang})
    }
  }


  changeLanguage=(v)=>{
    this.setState({lang:this.state.buddle.v})
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

            <div>{this.state.lang.name}:<TextField 
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
                        {this.state.lang.edit}</Button></div>

            <div>{this.state.lang.born}:<TextField 
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
                  {this.state.lang.previous}</Button>

                 <Button
                    variant="contained" 
                    color="primary" 
                    style={{marginLeft:5}}
                    onClick={this.next}>
                   {this.state.lang.next}</Button>

                    <RadioGroup
                      name="Language"
                      value={this.state.currentLang}
                      onChange={this.handleRadio}
                    >
                      <FormControlLabel
                        value="en"
                        control={<Radio color="primary" />}
                        label="English"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="fi"
                        control={<Radio color="primary" />}
                        label="Suomi"
                        labelPlacement="start"
                      />
                      </RadioGroup>
            </div>

            <Dialog
              open={this.state.dialog}
              onClose={this.handleDialog}
              aria-labelledby="form-dialog-title"
            >
          <DialogTitle id="form-dialog-title">{this.state.lang.dialog}</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField 
              id="fn"
              label={this.state.lang.fn}
              value={this.state.fname} 
              onChange={this.handleChange('fname')} 
              style={{marginTop:5}}/>

            <TextField 
              id="ln"
              label={this.state.lang.ln}
              value={this.state.lname}
              onChange={this.handleChange('lname')}
              style={{marginLeft:5,marginTop:5}}/>
             <div>
             <TextField 
              id="bt"
              label={this.state.lang.bt}
              value={this.state.bt}
              onChange={this.handleChange('bt')}
              style={{marginTop:5}}/>

             <TextField 
              id="bc"
              label={this.state.lang.bc}
              value={this.state.bc}
              onChange={this.handleChange('bc')}
              style={{marginTop:5}}/>

             <TextField
              id="by"
              label={this.state.lang.by}
              type="number"
              value={this.state.by}
              onChange={this.handleChange('by')}
              style={{marginTop:5}}/></div>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel} color="primary">
            {this.state.lang.cancel}
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
