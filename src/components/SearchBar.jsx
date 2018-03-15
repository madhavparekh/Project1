import React, {Component} from "react"
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
//for inline styles
import {white} from 'material-ui/styles/colors'


  export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoryValue: 1,
            radiusValue: 1,
            city: ''
        }
    };

    chooseCategory = (event, index, value) => this.setState({categoryValue: value});
    chooseRadius = (event,index,value)=> this.setState({radiusValue: value});
    changeCity = (event)=> this.setState({city: event.trigger.key});

    render(){
        return(
            <Toolbar style={{zIndex:1100, width: '75%'}}>
                <ToolbarGroup>
                <ToolbarTitle 
                text="Search in" 
                style={{color: white, paddingRight: 0}}
                />
                <TextField
                    id='citySearchField'
                    onChange={this.props.onSearchChange}
                    value={this.props.search.city}
                    errorText={this.props.searchError}
                    style = {{width: '25%', margin: 24, fontSize: 20}}
                />

                <ToolbarTitle 
                    text="within" 
                    style={{color: white, paddingRight: 10}} 
                />

                <DropDownMenu 
                    labelStyle = {{lineHeight: '50px', fontSize: 20}}
                    listStyle = {{paddingTop: 10, paddingBottom: 10}}
                    value={this.props.search.radius} 
                    onChange={this.props.onRadiusChange}
                >
                    <MenuItem style = {{fontSize: 20}} value={1} primaryText="10 miles"/>
                    <MenuItem style = {{fontSize: 20}} value={2} primaryText="25 miles"/>
                    <MenuItem style = {{fontSize: 20}} value={3} primaryText="50 miles"/>

                </DropDownMenu>

                <ToolbarTitle 
                    text="in" 
                    style={{color: white, paddingRight: 10}}
                />

                <DropDownMenu 
                value={this.props.search.category} 
                onChange={this.props.onCategoryChange}
                labelStyle={{lineHeight: '50px', fontSize: 20}}
                listStyle = {{paddingTop: 10, paddingBottom:10}}
                animated={true}
                >
                    <MenuItem style = {{fontSize: 20}} value={0} primaryText="All Categories"/>
                    {this.props.categories.map((category, index)=>
                        <MenuItem
                        key={category.id}
                        value={index + 1} 
                        primaryText={category.name}
                        style={{fontSize: 20}}/>)}

                </DropDownMenu>

                </ToolbarGroup>

                <ToolbarGroup lastChild = {true}>
                    <RaisedButton  
                    primary={true} 
                    label="Search" 
                    onClick = {this.props.callback}
                    />
                </ToolbarGroup>

                </Toolbar>
        );
    };
}