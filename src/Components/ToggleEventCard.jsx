import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import logo1 from '../static/images/eventBeast1_200.png';


export default class ToggleEventCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.setState(function(prevState){
      return {expanded: !prevState.expanded};
      return {isToggleOn: !prevState.isToggleOn};
    });
  };

  handleExpandChange = (expanded) => {
    this.setState({
      expanded: expanded,
      isToggleOn: false
    });

  };

  render() {
    return (
      <Card  expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="Event Name"
          subtitle="March 10 2018 6:45PM"
          avatar={<img src={logo1}/>}
          actAsExpander={true}
        >
          <FlatButton onClick={this.handleClick}>
            {this.state.isToggleOn ? 'More Info' : 'Less Info'}
          </FlatButton>
        </CardHeader>
        
        <CardText expandable={true}>
          DESCRIPTION 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}