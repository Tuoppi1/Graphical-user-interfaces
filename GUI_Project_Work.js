/* The application displays images and videos from local directory or web. 
   Images are displayed inside cards with name and description which are editable. 
   User can add new images to the carousel by selecting images from local files, giving URL address or drag and drop the image. 
   If the image is from the web it has an option to download the image in the card. The application has an app bar with settings menu. 
   In the menu user can alter the display of images, how many images are displayed at once, size of the images and change the color of the menu. 
   App bar also has undo and redo for the changes in the card heading and description. 
   Keyboard navigation is also supported in the carousel.
*/

import React, { Component } from 'react'
import './App.css'
import { Paper,Dialog,AppBar,Tab,Tabs,Typography,Button,Drawer,TextField,DialogActions,
  DialogContent,DialogContentText,DialogTitle,Divider,Toolbar,Card,CardActions,CardActionArea,CardMedia,
  CardContent,Radio,FormControlLabel,FormControl,IconButton} from '@material-ui/core'
import {DropzoneDialog} from 'material-ui-dropzone'
import { withStyles } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { SketchPicker } from 'react-color';
import MenuIcon from '@material-ui/icons/Menu'
import Slider from "react-slick"
import { saveAs } from 'file-saver'


function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

class App extends Component {

  constructor(){
    super()
    this.state={
      drawer:false,
      atctiveTab:0,
      card_edit_dialog:false,
      images:[],

      cardTypography:[{heading:"",description:""}],
      cardTypographyPast:[],
      cardTypographyFuture:[],

      DropzoneDialog:false,
      TypographyDialog:false,
      WebDialog:false,
      currentSlide:0,
      currentTypography:{currentHeading:"",currentDescription:""},
      WebTextField:"",

      // Slider settings
      slidesToShow:1,
      backgroundColor:'#3f50b5',
      sliderImageSize:1100,
      youtubeVideoSize:{height:640,width:1100},
     
    }
  }

  // Opens and closes the Card typography dialog
  handle_Card_Edit_Dialog=()=>{
    if(this.state.card_edit_dialog===false){
      this.setState({card_edit_dialog:true})
    }else{
      this.setState({card_edit_dialog:false})
    }
  }

  // Opens WEB dialog
  handleWebDialog=()=>{
    this.setState({WebDialog:true})
  }

  // Closes WEB dialog
  handleWebDialogClose=()=>{
    this.setState({WebDialog:false})
  }

  // Toggle drawer on and off
  handleDrawer=()=>{
    if(this.state.drawer===false){
      this.setState({drawer:true})
    }else{
      this.setState({drawer:false})
    }
  }

  // Opens local drop zone dialog
  handleDropDialog=()=>{
    this.setState({
      DropzoneDialog: true
    })
  }
  
  // Closes local drop zone dialog
  handleDropDialogClose() {
    this.setState({
      DropzoneDialog: false
    })
}

  // Drawer closes if anything else is clicked
  closeDrawer=()=>{
    if(this.state.drawer===true){
      this.setState({drawer:false})
    }
  }

  // Changes the active tab
  handleTab=(event, newValue)=> {
    this.setState({activeTab:newValue});
  }

  // Drag and Drop handler
  handleSave=(files)=>{
    for(let i in files){
      this.state.images.push(files[i])
      this.state.cardTypography.push({heading:"",description:""}) /* Placeholder for heading and description */
    }
    this.handleDropDialogClose()
  }

  // Change the current slide index and open typography edit dialog
  currentSlide=(e)=>{
    this.setState({currentSlide:e,TypographyDialog:true},()=>{
    })
  }

  // Download current slide
  downloadSlide=(index)=>{
    var name = ""
    // Checking if the image has a name
    if(this.state.cardTypography[index].heading !== ""){
      name = this.state.cardTypography[index].heading+".jpg"
    }else{
      name = "Slider_Image_#"+index+".jpg"
    }
    
    var FileSaver=require('file-saver')
    FileSaver.saveAs(this.state.images[index],name)
  }

  // Open typography dialog
  handleTypographyDialog=()=>{
    this.setState({TypographyDialog:true})
  }

  // Close typography dialog
  handleTypographyDialogClose=()=>{
    this.setState({TypographyDialog:false})
  }

  // Change card heading and description
  handleTypographySave=()=>{
    const tmp = [...this.state.cardTypography]
    this.state.cardTypographyPast.push([...tmp]) // Updating the past list

    const typo = {heading:this.state.currentTypography.currentHeading, description:this.state.currentTypography.currentDescription}
    const tmpSlide = this.state.currentSlide
    tmp[tmpSlide] = typo
    this.setState({cardTypography:tmp},()=>{
      this.handleTypographyDialogClose()
    })

    // refresh currentTypography
    this.setState({currentTypography: {currentDescription:"",currentHeading:""}})
  }

  // Updates the current typography for saving
  handleTextfield=(e)=>{
    e.persist();
    this.setState((state)=> state.currentTypography[e.target.name]=e.target.value)
  }

  // Catches the URL from web textfield
  handleWebTextField=(e)=>{
    this.setState({WebTextField:e.target.value})
  }

  // Saves the URL to image array
  handleWebSave=()=>{
    this.state.images.push(this.state.WebTextField)
    this.state.cardTypography.push({heading:"",description:""})
    this.setState({WebTextField:""})
  }

  // Slide radio button handler
  handleRadioChange=(e)=>{
    this.setState({slidesToShow:e.target.value},()=>{
      // Changing the size of the media according to number of slides shown
      if(this.state.slidesToShow === "1"){
        this.setState({sliderImageSize:1100,youtubeVideoSize:{height:640,width:1100}})
      }else if(this.state.slidesToShow === "2"){
        this.setState({sliderImageSize:900,youtubeVideoSize:{height:525,width:900}})
      }else{
        this.setState({sliderImageSize:700,youtubeVideoSize:{height:350,width:600}})
      }
    }) 
  }

  // Color picker
  handleColorChange = (color) => {
    this.setState({ backgroundColor: color.hex })
  }

  // Undo cardTypography
  undo=()=>{
    console.log(this.state.cardTypographyPast)
    if(this.state.cardTypographyPast.length > 0){
      const future = [...this.state.cardTypography]
      this.state.cardTypographyFuture.push(future)
      this.setState({cardTypography:this.state.cardTypographyPast.pop()},()=>{
        console.log(this.state.cardTypography+" undo test")
      })
    }
  }

  // Redo cardTypography
  redo=()=>{
    if(this.state.cardTypographyFuture.length > 0){
      const past = [...this.state.cardTypography]
      this.state.cardTypographyPast.push(past)
      this.setState({cardTypography:this.state.cardTypographyFuture.pop()})
    }
  }

  

  render() {

    // Settings for the card slider
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: this.state.slidesToShow,
      slidesToScroll: 1,
      adaptiveHeight:true
    }

    // custom styles for cards
    const CardMediaStyles = withStyles({
      card: {
        maxWidth: 300,
      },
      media: {
        height: 140,
      },
    })
    const classes = CardMediaStyles

    // Appbar theme color
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#757ce8',
          main: this.state.backgroundColor,
          dark: '#002884',
          contrastText: '#fff',
        },
      },
    })
    
    

    return (
      
      <MuiThemeProvider theme={theme}>
        <div>
        <Paper class="App" style={{}}>

          <AppBar classes={{}} color="primary" style={{root:{backgroundColor:'#C100FF'}}} onClick={this.closeDrawer} position="static">
            <Toolbar>
              <IconButton edge="start"  color="inherit" aria-label="Menu" onClick={this.handleDrawer}>
                <MenuIcon />
              </IconButton>
              <Button color="inherit" style={{marginLeft:50}} onClick={this.undo}>Undo</Button>
              <Button color="inherit" onClick={this.redo}>Redo</Button>
            </Toolbar>

            <Tabs  variant="fullWidth" value={this.state.activeTab} onClick={this.closeDrawer} onChange={this.handleTab}>
                  <LinkTab label="Browse" href="page1" />
                  <LinkTab label="Add Media" href="page2" />
            </Tabs>
          </AppBar>
          


          <Drawer
            variant="persistent"
            anchor="left"
            open={this.state.drawer}
            style={{marginLeft:200}}
          >
              <IconButton style={{margin:20}} onClick={this.handleDrawer}> Hide
              </IconButton>
            <Divider />
            <Divider />

            <FormControl component="fieldset">
                <FormControlLabel style={{margin:2}} value={1} control={<Radio onChange={this.handleRadioChange} checked={this.state.slidesToShow==='1'}/>} label="1 Slide" />
                <FormControlLabel style={{margin:2}} value={2} control={<Radio onChange={this.handleRadioChange} checked={this.state.slidesToShow==='2'}/>} label='2 Slides' />
                <FormControlLabel style={{margin:2}} value={3} control={<Radio onChange={this.handleRadioChange} checked={this.state.slidesToShow==='3'}/>} label='3 Slides' />
            </FormControl>

              <Divider />
              <h3 style={{margin:10}}>Menu Color</h3>

              <SketchPicker color={this.state.backgroundColor} onChange={this.handleColorChange}/>
          </Drawer>
          
    
          {/* Browse tab*/}
          {this.state.activeTab === 0 && <TabContainer>
          <div onClick={this.closeDrawer}>


        {/* Card typography dialog */}
        <div>
          <Dialog open={this.state.TypographyDialog} onClose={this.handleTypographyDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can edit heading and description of a card here.
              </DialogContentText>
              <TextField
                autoFocus
                name="currentHeading"
                margin="dense"
                id="Heading"
                ref="heading"
                label="Heading"
                type="text"
                fullWidth
                onChange={this.handleTextfield}
              />

              <TextField
                autoFocus
                name="currentDescription"
                margin="dense"
                id="Description"
                ref="description"
                label="Description"
                type="text"
                multiline = {true}
                fullWidth
                onChange={this.handleTextfield}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleTypographyDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleTypographySave} color="primary">
                Save
              </Button>
            </DialogActions>
      </Dialog>
    </div>

        {/* Expandable Slider*/}
        <Slider onClick={this.closeDrawer} {...settings}>
          {this.state.images.map((slide,index) => { /* Mapping the image array*/
            if(typeof slide !== 'string'){ // If the slide is an object from local

            return (
              <div>
                <h3>
                <Card className={classes.card} style={{alignItems:'center',justifyItems:'center', height:this.state.sliderImageSize+100}}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      style={{height:"auto", width:"auto", maxHeight:this.state.sliderImageSize, maxWidth:this.state.sliderImageSize, display:'block',
                      marginLeft:'auto',marginRight:'auto'}}
                      src={URL.createObjectURL(slide)} // Creating URL object
                      title="Media Image"
                      root={{height:500}}
                    />
                    <CardContent style={{}}>
                      <Typography gutterBottom variant="h5" component="h2" ref="index">
                        {this.state.cardTypography[index].heading}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      {this.state.cardTypography[index].description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={e => this.currentSlide(index)}>
                      Edit
                    </Button>
                  </CardActions>
              </Card>
                  </h3>
                </div>

            )}else if(typeof slide == 'string' && slide.includes("youtube.com")){ // If the slide is a youtube URL
              return (
                <div>
                  <h3>
                  <Card className={classes.card} style={{alignItems:'center',justifyItems:'center', height:this.state.sliderImageSize+100}}>
                    <CardActionArea>
                      <CardMedia
                        component='iframe'
                        style={{height:this.state.youtubeVideoSize.height, width:this.state.youtubeVideoSize.width, maxHeight:1100,maxWidth:1100,
                        display:'block',marginLeft:'auto',marginRight:'auto'}}
                        src={slide.replace("watch?v=","embed/")} // Changing regular URL to embed URL
                        title="Media Image"
                        root={{height:500}}
                      />
                      {console.log(slide)}
                      <CardContent style={{}}>
                        <Typography gutterBottom variant="h5" component="h2" ref="index">
                          {this.state.cardTypography[index].heading}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {this.state.cardTypography[index].description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary" onClick={e => this.currentSlide(index)}>
                        Edit
                      </Button>
                    </CardActions>
                </Card>
                    </h3>
                  </div>
  
              )}else{ // If the slide is an URL from web
              return (
                <div>
                  <h3>
                  <Card className={classes.card} style={{alignItems:'center',justifyItems:'center', height:this.state.sliderImageSize+100}}>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        style={{height:"auto", width:"auto", maxHeight:this.state.sliderImageSize,maxWidth:this.state.sliderImageSize,display:'block',
                        marginLeft:'auto',marginRight:'auto'}}
                        src={slide} // Just regular URL
                        title="Media Image"
                        root={{height:500}}
                      />
                      <CardContent style={{}}>
                        <Typography gutterBottom variant="h5" component="h2" ref="index">
                          {this.state.cardTypography[index].heading}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {this.state.cardTypography[index].description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary" onClick={e => this.currentSlide(index)}>
                        Edit
                      </Button>
                      <Button size="small" color="primary" onClick={e => this.downloadSlide(index)}>
                        Download
                      </Button>

                    </CardActions>
                </Card>
                    </h3>
                  </div>
              )}
          })}
        </Slider>

        

      </div>
      </TabContainer>}

      {/* Add media tab */}
      {this.state.activeTab === 1 && <TabContainer>
        <div onClick={this.closeDrawer}>
        <Button onClick={this.handleDropDialog.bind(this)} variant="contained" color="primary">Local</Button>
        <Button style={{marginLeft:5}} onClick={this.handleWebDialog.bind(this)} variant="contained" color="primary">Web</Button>
        <DropzoneDialog
          open={this.state.DropzoneDialog}
          onSave={this.handleSave.bind(this)}
          showPreviews={true}
          maxFileSize={5000000}
          filesLimit={99}
          onClose={this.handleDropDialogClose.bind(this)}
        />

          <div>  {/* Web image dialog */}
                    <Dialog open={this.state.WebDialog} onClose={this.handleWebDialogClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="">Web Image</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Copy Web image URL or just drag it here.
                          Make sure the image is opened in a new tab.
                          You can also copy Youtube url to add youtube video.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="web"
                          ref="web"
                          label="web"
                          type="text"
                          fullWidth
                          value={this.state.WebTextField}
                          onChange={this.handleWebTextField}
                          multiline = {true}
                        />

                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleWebDialogClose} color="primary">
                          Close
                        </Button>
                        <Button onClick={this.handleWebSave} color="primary">
                          Add
                        </Button>
                      </DialogActions>
                </Dialog>
              </div>
        </div>
        <div>
        </div>
      </TabContainer>}
        </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
