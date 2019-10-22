import React, { Component } from 'react'
import './App.css'
import { Paper,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText,TextField,Button } from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

class App extends Component {
  
  constructor(){
    super();
    this.state={
      dialog:false,
      name:"Set1",
      color:"",
      index:0,
      newname:"",
      newcolor:"",
      colours: ["blue", "red", "green"],
      names: ["Set1", "Set2", "Set3"],  
  }
}

  componentDidMount(){
    this.createVenn(this.state.colours)
  }

  handleClickOpen = () => {
    this.setState({ dialog: true })
  }

  handleClose = () => {
    this.setState({ dialog: false })
  }

  save=()=>{
    this.setState({color:this.state.newcolor,name:this.state.newname},()=>{
      this.handleClose()
      var s = this.state.names
      s[this.state.index] = this.state.name
      var c = this.state.colours
      c[this.state.index] = this.state.color

      this.setState({names:s,colours:c},()=>{
        console.log(this.state.sets)
        console.log(this.state.colours)
        this.createVenn(this.state.colours)
      })
    }) 
  }

  createVenn=(colours)=>{
      var sets = [
      {sets : [0], label : this.state.names[0], size : 20,}, 
      {sets : [1], label : this.state.names[1], size: 20},
      {sets : [2], label : this.state.names[2], size : 20}, 
      {sets : [0,1], size:4},
      {sets : [0,2], size:4},
      {sets : [1,2], size:4},
      {sets : [0,1,2], size:4},
      ];

    var venn = require('venn.js')
    var d3 = require('d3/d3')
    var chart = venn.VennDiagram()
    chart.wrap(false).width(640).height(640)

    d3.select("#venn").datum(sets).call(chart).selectAll("#venn .venn-circle path")
      .style("fill-opacity", .5)
      .style("fill", function(d,i) { return colours[i]; })
      .style("stroke", function(d,i) { return colours[i]; })

    d3.selectAll("#venn .venn-circle").on("mousedown", (d,i)=>{
      this.setState({dialog: true,index:i })
    })
    var div = d3
    div.select(1)
    div.selectAll("text").style("fill", "black")
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider>
        <Paper class="App" style={{width:1000}}>
          <div style={{ maxWidth:1000,maxHeight:400}}>
          <div id='venn'></div>

          <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change name and color</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField value={this.state.newname} onChange={e => this.setState({ newname: e.target.value })}
              autoFocus
              margin="dense"
              id="number1"
              label="Name"
              type="text"
              fullWidth
            />
            <TextField value={this.state.newcolor} onChange={e => this.setState({ newcolor: e.target.value })}
              autoFocus
              margin="dense"
              id="number2"
              label="Color"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button  onClick={this.save}>
              Save
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
