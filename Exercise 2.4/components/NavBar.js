import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Population from './Population'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {

  state = {
    open: false,
    dialog:false,
    population:null,
    person:null,
    limit:null,
    index:1,
    fname:"",
    lname:"",
    bp:"",
    by:null,
    ms:"",
    data:null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true })
  };

  handleDrawerClose = () => {
    this.setState({ open: false })
  };

  handleClickOpen = () => {
    this.setState({ dialog: true })
  };

  handleClose = () => {
    this.setState({ dialog: false })
  }

  generate=()=>{
    let pp = new Population("USA")
    let p = pp.getPerson()
    this.setState({population:pp})
    this.setState({person:p}, ()=> {this.info()})
    this.handleClose()
  }

  info=()=>{
    this.setState({
      fname: this.state.person.firstName,
      lname: this.state.person.lastName,
      bp: this.state.person.birthTown,
      by: this.state.person.birthYear,
      ms: this.state.person.maritalStatus
    })
    
  }

  nextPerson=()=>{
    if(this.state.limit > this.state.index){
      let num = this.state.index + 1
      this.setState({index:num})
      this.setState({person:this.state.population.nextPerson()},()=>{this.info()})
    }
  }
  previousPerson=()=>{
    if(0 < this.state.index-1){
      let num = this.state.index - 1
      this.setState({index:num})
      this.setState({person:this.state.population.previousPerson()},()=>{this.info()})
    }
  }

  mean=(numbers)=> {
    var total = 0, i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
  }
  median(numbers) {
    var median = 0, numsLen = numbers.length;
    numbers.sort();

    if (
        numsLen % 2 === 0
    ) {
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else {
        median = numbers[(numsLen - 1) / 2];
    }
  return median;
  }
  mode=(arr)=> {
    var numMapping = {};
    var greatestFreq = 0;
    var mode;
    arr.forEach(function findMode(number) {
        numMapping[number] = (numMapping[number] || 0) + 1;

        if (greatestFreq < numMapping[number]) {
            greatestFreq = numMapping[number];
            mode = number;
        }
    });
    return +mode;
  }

  analysis=()=>{
    this.setState({data:null})
    let years = []
    for(let i = 0; i < this.state.limit;i++){
      let p = this.state.population.nextPerson()
      years.push(p.birthYear)
    }

    let min = "Min : "+Math.min.apply(Math,years)
    let max = "Max : "+Math.max.apply(Math,years)
    let sum = 0
    for(let i=0;i< years.length;i++){
      sum=sum+years[i]
    }
    let average = "Average : "+Math.round(sum/years.length)
    let mean = "Mean : "+Math.round(this.mean(years))
    let median = "Median : "+Math.round(this.median(years))
    let mode = "Mode : "+this.mode(years)
    let dataArray = [min,max,average,mean,median,mode]
    this.setState({data:dataArray.map((numbers)=><li>{numbers}</li>)})
    console.log(years[2])
  }

  

  render() {
    const { classes, theme } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
         <MenuItem onClick={this.handleClickOpen}>Generate</MenuItem>
         <MenuItem onClick={this.previousPerson}>Previus</MenuItem>
         <MenuItem onClick={this.nextPerson}>Next</MenuItem>
         <MenuItem onClick={this.analysis}>Analysis</MenuItem>
        </Drawer>
        <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Type how many people you want to generate?</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField value={this.state.limit} onChange={e => this.setState({ limit: e.target.value })}
              autoFocus
              margin="dense"
              id="number1"
              label=""
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button  onClick={this.generate}>
              Generate
            </Button>
          </DialogActions>
        </Dialog>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <div onClick={this.handleDrawerClose}>
        <List>
                  <ListItem>
                    <ListItemText 
                      id="firstName"
                      primary={this.state.fname}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      id="lastName"
                      primary={this.state.lname}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      id="birthPlace"
                      primary={this.state.bp}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      id="birthYear"
                      primary={this.state.by}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      id="maritalStatus"
                      primary={this.state.ms}
                    />
                  </ListItem>
        </List>
        <br></br>
        <List>
          <ListItem>
          <ListItemText
          id="analysis"
          primary={this.state.data}
        />
      </ListItem>
        </List>
        </div>
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
