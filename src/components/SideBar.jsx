import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import EventCard from './EventCard'




export default class SideBar extends React.Component {
  onClick = num =>{
    this.props.sideBarClick(num);
  }
  render() {
    return (
      <Drawer width = {'25%'} open = {this.props.open}>
        <AppBar title="Available Events:"/>
        {this.props.events.map((event, index)=>
          <EventCard 
            onClick={this.onClick} 
            key={event.id} 
            event={event} 
            num={index}
            active={index === this.props.activeEvent}
            />)}
      </Drawer>
    );
  }
}
