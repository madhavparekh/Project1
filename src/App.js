import React, { Component } from 'react';
import {render} from 'react-dom';
import queryString from 'query-string'
//Theme and styling
import BeastTheme from './style/BeastTheme'
import NewZIndex from './style/NewZIndex'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style/App.css';
import {CSSTransitionGroup} from 'react-transition-group'; // ES6//entering animation
//Components
import Nav from './Components/NavBar'
import SearchBar from "./Components/SearchBar"
import SideBar from './Components/SideBar'
import GoogleMap from './Components/GoogleMap'

//API
import MeetUpApi, {parseMeetup, categories, MeetUpCategories} from './api/MeetUpAPI'
//Firebase
import firebase, {eventRef, uid} from './utils/Firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventCategories: [],
      events: [],
      loading: true,
      activeEvent: null,
      sidebar: false,
      center: {
        lat: 38.580110,
        lng: -121.487503
      },
      search: {
        city: '',
        radius: 1,
        category: 0
      },
      searchError: '',
      showingInfoWindow: false,
      update: false
    }
    this.fetchData = this.fetchData.bind(this);
    this.callBack = this.callBack.bind(this);
    this.createServices = this.createServices.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onRadiusChange = this.onRadiusChange.bind(this);
    this.setPlace = this.setPlace.bind(this);
    this.getMarkerClick = this.getMarkerClick.bind(this);
    this.getMapClick = this.getMapClick.bind(this);
  }
  getRadius(rad){
    switch(rad){
      case 1:
        return 10;
      case 2:
        return 25;
      case 3:
        return 50;
    }
  }
  milesToMeters(miles){
    return miles * 1609;
  }
  fetchData(searchQuery){
    searchQuery.cat = parseInt(searchQuery.cat)
    searchQuery.rad = parseInt(searchQuery.rad)
    this.geocoder.geocode({address: searchQuery.loc}, (results, status) => {
      if(status === 'OK'){
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var radius = this.milesToMeters(this.getRadius(searchQuery.rad))
        var newLatLng = new this.google.maps.LatLng(lat, lng);
        var circleOptions = {
          center: newLatLng,
          radius: radius
        };
        var circle = new this.google.maps.Circle(circleOptions);
        this.map.fitBounds(circle.getBounds());
        MeetUpCategories[searchQuery.cat].updateParam({
          lat: lat,
          lon: lng,
          radius: this.getRadius(searchQuery.rad)
        });
        MeetUpCategories[searchQuery.cat].fetchP(data=>{
          var meetupArray = parseMeetup(data.data);
          this.setState({
            searchError: '',
            events: meetupArray,
            showingInfoWindow: false,
            activeEvent: null
          })
        });
      }
      else{
        this.setState({searchError: status})
      }
    })
  }

  callBack(){
    // this.setState({sidebar: !this.state.sidebar});
    var searchQuery = {
      loc: this.state.search.city,
      rad: this.state.search.radius,
      cat: this.state.search.category
    }
    
    this.fetchData(searchQuery);
    var qstr = queryString.stringify({
      loc: this.state.search.city,
      rad: this.state.search.radius,
      cat: this.state.search.category
    });
    this.props.history.push('#'+qstr)
  }
  setPlace(){
    if(this.autoComplete.getPlace().formatted_address){
      this.setState({
        search: {
          city: this.autoComplete.getPlace().formatted_address,
          radius: this.state.search.radius,
          category: this.state.search.category
        }
      })
    }
  }
  createServices(mapProps, map){
    const {google} = mapProps;
    this.google = google;
    this.map = map;
    this.autoComplete = new google.maps.places.Autocomplete(document.getElementById('citySearchField'));
    this.autoComplete.bindTo('bounds', this.map);
    this.autoComplete.addListener('place_changed', this.setPlace);
    this.geocoder = new google.maps.Geocoder();
    if(this.state.update === true){
      this.state.update = false;
      var searchQuery = {
        loc: this.state.search.city,
        rad: this.state.search.radius,
        cat: this.state.search.category
      }
      this.fetchData(searchQuery);
    }
    this.setState({ loading: false });
  }
  onSearchChange(event){
    this.setState({
      search: {
        city: event.target.value,
        radius: this.state.search.radius,
        category: this.state.search.category
      }
    })
  }
  onCategoryChange(event, index, value){
    this.setState({
      search: {
        city: this.state.search.city,
        radius: this.state.search.radius,
        category: value
      }
    })
  }
  onRadiusChange(event, index, value){
    this.setState({
      search: {
        city: this.state.search.city,
        radius: value,
        category: this.state.search.category
      }
    })
  }
  getMarkerClick(marker){
    this.setState({
      activeEvent: marker.activeMarker,
      showingInfoWindow: true
    })
  }
  getMapClick(){
    this.setState({
      showingInfoWindow: false
    })
  }
  componentDidMount(){
    if(this.props.history.action === "POP" && this.props.location.hash){
      var searchQuery = queryString.parse(this.props.location.hash)
      this.setState({
        update: true,
          search: {
            city: searchQuery.loc,
            radius: parseInt(searchQuery.rad),
            category: parseInt(searchQuery.cat)
          }
      })
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.history.action === "POP" && this.props.location.hash && this.props.location.hash !== prevProps.location.hash && this.geocoder){
      var searchQuery = queryString.parse(this.props.location.hash)
      this.setState({
          search: {
            city: searchQuery.loc,
            radius: parseInt(searchQuery.rad),
            category: parseInt(searchQuery.cat)
          }
      })
      this.fetchData(searchQuery);
    }
    else if(this.props.history.action === "POP" && this.props.location.hash && this.props.location.hash !== prevProps.location.hash){
      var searchQuery = queryString.parse(this.props.location.hash)
      this.setState({
        update: true,
          search: {
            city: searchQuery.loc,
            radius: parseInt(searchQuery.rad),
            category: parseInt(searchQuery.cat)
          }
      })
    }
  }

  render() {
    if(this.state.loading){
      return <GoogleMap
      center={this.state.center}
      markers={this.state.events}
      createServices={this.createServices}
      getMarkerClick={this.getMarkerClick}
      getMapClick={this.getMapClick}
      showingInfoWindow={this.state.showingInfoWindow}
      activeMarker={this.state.activeEvent}
      visible={false}
    />;
    }else{
    return (
      <CSSTransitionGroup
      transitionName = "tunnelIn"
      transitionAppear={true}
      transitionAppearTimeout={2000}
      transitionEnter={false}
      transitionLeave={false}>

      <div className = 'wrapper'>
        <MuiThemeProvider muiTheme = {getMuiTheme(BeastTheme)}>
          <Nav className = 'navBar'/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme = {getMuiTheme(BeastTheme, NewZIndex)}>
          <SideBar 
            openClose={this.state.sidebar}
            events={this.state.events}
          />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme = {getMuiTheme(BeastTheme, NewZIndex)}>
          <SearchBar
            callback={this.callBack}
            onSearchChange={this.onSearchChange}
            onCategoryChange={this.onCategoryChange}
            onRadiusChange={this.onRadiusChange}
            search={this.state.search}
            searchError={this.state.searchError}
            categories={categories}
          />
          </MuiThemeProvider>
            <GoogleMap
              center={this.state.center}
              markers={this.state.events}
              createServices={this.createServices}
              getMarkerClick={this.getMarkerClick}
              getMapClick={this.getMapClick}
              showingInfoWindow={this.state.showingInfoWindow}
              activeMarker={this.state.activeEvent}
              visible={true}
            />
       </div>
       </CSSTransitionGroup>
      
    );
  }
  }
}

export default App;
