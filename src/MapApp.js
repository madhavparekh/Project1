import React, { Component } from 'react';
import './App.css';
// import Map from './Components/Map'
import GoogleMap from './Components/GoogleMap'
import MeetUpAPI, {parseMeetup} from './api/MeetUpAPI';


class App extends Component {
  constructor(){
    super()
    this.state = {
      currentSelection:  {
        name: '',
        id: '',
        description: ''
      },
      markers: [],
      center: {
        lat: 38.580110,
        lng: -121.487503
      }
    };
    this.getMarkerClick = this.getMarkerClick.bind(this);
    this.createServices = this.createServices.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setPlace = this.setPlace.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    MeetUpAPI.setCallBack(data=>{
      var meetupArray = parseMeetup(data);
      this.setState({
        markers: meetupArray
      })
    })
    MeetUpAPI.fetchP();
  }
  getMarkerClick(selection) {
    this.setState({
      currentSelection: {
        name: selection.name,
        id: selection.id,
        description: selection.description
      }
    })
  }
  onSubmit(event){
    event.preventDefault();
    this.geocoder.geocode({address: this.state.search}, (results, status) => {
    if(status === 'OK'){
        this.setState({
          center:
            {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            }
        })
        console.log(this.state.center);
        MeetUpAPI.setParam({
          sig_id: 249701286,
          lat: this.state.center.lat,
          lon: this.state.center.lng,
          sig: 'ed6789b7b5d37f66964eeae887655760ab3b30dd'
      })
      MeetUpAPI.fetchP();
      this.map.setCenter(new this.google.maps.LatLng(this.state.center.lat, this.state.center.lng));
    }
    else{
        alert(status);
    }
  })
  }
  setPlace(){
    if(this.autoComplete.getPlace().formatted_address){
      this.setState({
        search: this.autoComplete.getPlace().formatted_address
      })
    }
  }
  onChange(event){
    this.setState({
      search: event.target.value
    })
  }
  createServices(mapProps, map){
    const {google} = mapProps;
    this.google = google;
    this.map = map;
    this.autoComplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    this.autoComplete.addListener('place_changed', this.setPlace)
    this.geocoder = new google.maps.Geocoder();
  }
  render() {
    const style = {
      width: '500px',
      height: '500px',
      zIndex: -1
    }
    return (
      <div className="App">
        <div id="container" style={style}>
        <GoogleMap 
          getMarkerClick={this.getMarkerClick} 
          markers={this.state.markers} 
          currentSelection={this.state.currentSelection}
          createServices={this.createServices}
          center={this.state.center}
        />
        </div>
        <form onSubmit={this.onSubmit}>
        <input id="autocomplete"  
        type="text" 
        placeholder="Enter a location" 
        onChange={this.onChange}
        value={this.state.value}
         />
      </form>
      <div>Search lat = {this.state.center.lat} lon = {this.state.center.lng} </div>
      </div>
    );
  }
}

export default App;
