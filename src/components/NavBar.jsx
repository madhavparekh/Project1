import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class Logged extends React.Component {
	onClick = ()=>{
		this.props.onClick();
	}
	handleLogIn= ()=>{
		window.location.replace('https://secure.meetup.com/oauth2/authorize?client_id=ae019qqgm2059qiao2v8kg76nf&response_type=token&redirect_uri=https://jaseat.github.io/project1/login')
	};
	render(){
		return (
		<IconMenu
		  iconButtonElement={
			<IconButton><MoreVertIcon /></IconButton>
		  }
		  targetOrigin={{horizontal: 'right', vertical: 'top'}}
		  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		>
		  <MenuItem primaryText="Login" onClick={this.handleLogIn}/>
		  <MenuItem primaryText="About Us" onClick={this.onClick} />
		</IconMenu>	
		)
	}
}

export default class Nav extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: false,
		}
	}
	handleOpenDialog = ()=>this.setState({open: true});
	handleClose=()=>this.setState({open: false});
	render(){
		return(
			<AppBar
			// title={<div><img src = {require('../img/Logo.png')} style = {{width:64,height:64}}/><span>Event Beast</span></div>}
			title = 'Event Beast'
			showMenuIconButton={false}
			iconElementRight={<Logged onClick={this.handleOpenDialog}/>}
			// iconElementRight={<FlatButton label="Log In" onClick={this.handleLogIn} />}
			// iconElementRight={<FlatButton label="About Us" onClick={this.handleOpenDialog} />}>
			>
				<Dialog
					title="About Us"
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					actions = {<FlatButton label = "Close" primary={true} onClick = {this.handleClose}/>}>
						Making meet ups easier!
						<div>
						<h3>Built using:</h3>
						<img src = {require('../img/BuiltLogo/ReactLogo.png')} alt='react' style={{width: 100}}/>
						<img src = {require('../img/BuiltLogo/materialLogo.svg')} alt = 'material-ui' style={{width:150}}/>
						<img src = {require('../img/BuiltLogo/googlemapLogo.png')} alt = 'googleMaps' style={{width: 175}}/>
						<img src = {require('../img/BuiltLogo/darkskyLogo.png')} alt = 'darkSky' style={{width:125}}/>
						<img src = {require('../img/BuiltLogo/meetupLogo.svg')} alt = 'meetUp' style={{width:100}}/>
						<img src = {require('../img/BuiltLogo/firebaseLogo.png')} alt ='firebase' style={{width:115}}/>
						</div>
				</Dialog>
			</AppBar>
		)
	}
}