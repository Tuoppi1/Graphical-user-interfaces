import React, { Component } from 'react'
import './App.css'
import { Paper,NoSsr,AppBar,Tab,Tabs,Typography,Stepper,Step,StepLabel,Button,TextField,Chip} from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class App extends Component {
  
  constructor(){
    super();
    this.state={
      value:0,
      activeStep:0,
      description:"",
      participant:"",
      time:"",
      participants:[],
      events:[],
      activeEvent:0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleTextField = name => event => {
    this.setState({ [name]: event.target.value });
  }

  getSteps=()=>{
    return ['Event', 'Time', 'Participants'];
  }

  // Pushes new participant string into participants array and then resets the participant TextField for new input
  addParticipant=()=>{
    let tmp = this.state.participants
    tmp.push(this.state.participant)
    this.setState({participants:tmp,participant:""})
  }

  getStepContent=(stepIndex)=>{
    switch (stepIndex) {

      // Step 1
      case 0:
        return (
        <div style={{marginTop:50}}>Add description for the event
          <div>
            <TextField
              label="Description"
              value={this.state.description}
              onChange={this.handleTextField('description')} // Participants can be added as much as needed
            />
          </div>
        </div>
        )


        // Step 2
      case 1:
        return (
          <form  noValidate>
            <TextField
              id="datetime-local"
              label="Event date"
              type="datetime-local"
              InputLabelProps={{shrink: true,}}
              value={this.state.time}
              onChange={this.handleTextField('time')}
            />
          </form>
        );


        // Step 3
      case 2:
        return (
          <div style={{marginTop:50}}>Add participants
          <div>
          <TextField
                    label="Participant"
                    value={this.state.participant}
                    onChange={this.handleTextField('participant')}/>
          <Button 
              style={{marginTop:10}}
              variant="contained" 
              color="secondary"
              onClick={this.addParticipant}>Add
          </Button>
          </div> 
        </div>
        )


      default:
        return 'Unknown stepIndex';
    }
  }

    handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }))
        
      if(this.state.activeStep === 2){
          this.save()
      }
      console.log(this.state.activeStep)
    }
  
    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };
  
    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    }

    // Save events and reset states for new event
    save=()=>{
      let tmp = this.state.events
      tmp.push({
        description:this.state.description,
        time:this.state.time,
        participants:this.state.participants,
        })
        this.setState({
          events:tmp,
          description:"",
          time:"",
          participants:[],
          participant:""
        })
        console.log("Saved")
    }

    handleDelete = (index) => {
    }

    chips=()=>{
      let events = this.state.events.map((event, index) => (
        <div>
				<Chip 
					key={index}
					onDelete={this.handleDelete(index)}
          onClick={() => {this.setState({activeEvent:index})}} // Selecting which event details to display in the info tab
          label={this.state.events[index].description}
				>
				</Chip>
        </div>
      ))
      
      return events
    }

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <MuiThemeProvider>
        <div style={{display:'flex',justifyContent:'center'}}>
        <Paper class="App" style={{}}>
          <div>
          <NoSsr>
            <div>
              <AppBar position="static">
                <Tabs variant="fullWidth" value={this.state.value} onChange={this.handleChange}>
                  <LinkTab label="Create an event" href="page1" />
                  <LinkTab label="Chips" href="page2" />
                  <LinkTab label="Info" href="page3" />
                </Tabs>
              </AppBar>
              {this.state.value === 0 && <TabContainer>
                <div>
                  <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {steps.map(label => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
                  </Stepper>
                  <div>

                    {this.state.activeStep === steps.length ? ( // Save
                      <div>
                        <Typography>All steps completed</Typography>
                        {this.chips}
                        <Button onClick={this.handleReset}>Reset</Button>
                      </div>
                    ) : (


                      <div>
                        <Typography>{this.getStepContent(activeStep)}</Typography>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                          >
                            Back
                          </Button>
                          <Button variant="contained" color="primary" style={{marginTop:20}} onClick={this.handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                </TabContainer>}


              {this.state.value === 1 && <TabContainer>
                {this.chips()}
                {console.log(this.state.events)}
                </TabContainer>
              }
              {this.state.value === 2 && <TabContainer>
                <div>{this.state.events[this.state.activeEvent].description}</div>
                <div>{this.state.events[this.state.activeEvent].time}</div>
                <div>{this.state.events[this.state.activeEvent].participants.join()}</div>
                
                </TabContainer>}



            </div>
          </NoSsr>
          </div>  
        </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
