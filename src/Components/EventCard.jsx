import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';




export default class EventCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.active,
    };
  };
  handleClick = ()=> {
    this.setState({expanded: !this.state.expanded});
    if(!this.state.expanded)
      this.props.onClick(this.props.num)
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.expanded !== this.props.active)
    this.setState({
      expanded: this.props.active
    })
  }

  render(){
    const date = new Date(this.props.event.start);//cuz in miliseconds
    return(
    <Card expanded={this.state.expanded} style={this.state.expanded ? {backgroundColor: '#424242'} : {}}>
      <CardHeader
        title={this.props.event.name}
        subtitle={date.toLocaleString()}
        onClick ={this.props.clickCardHeader}
        style={{ textAlign: 'center' }}
        textStyle={{paddingRight: 0}}
      />
      <CardActions>
        <FlatButton icon={<ContentAdd color='#FBC02D'/>} onClick={this.handleClick} fullWidth={true}/>
      </CardActions>
      <CardText expandable={true} dangerouslySetInnerHTML = {{__html:this.props.event.description}}/>
    </Card>
    )
  }
}